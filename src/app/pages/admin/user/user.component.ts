import { Component, ComponentRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, debounce, map, switchMap, tap, timer } from 'rxjs';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { IBreadCrumb } from 'src/app/models/breadcrumb.interface';
import { DataGridField } from 'src/app/models/data-grid-field.model';
import { UsersService } from 'src/app/services/users.service';
import { CreateUserPopupComponent } from '../create-user-popup/create-user-popup.component';
import { TokenManagerService } from 'src/app/services/token-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public breadcrumbs: Array<IBreadCrumb> = [];
  subjectMain = new Subject<any>();
  searchFieldValueOutputDelay: number;
  public dataListObs: Observable<any[]>;
  public userId = '';
  public pageSize = 10;
  public totalNumberOfrecords: number;
  public numberOfrecords = -1;
  public highlightID: string = '';
  public currentPageNumber = 1;
  public searchForm: FormGroup;
  public fieldList: Array<DataGridField> = [];
  sortJson = {};
  sortDirection = 1;
  searchByFields = [];

  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    windowClass: 'md-class',
  };
  userType: number;

  constructor(private user: UsersService, private modalService: NgbModal, private tokenService: TokenManagerService,private fb: FormBuilder,) {
    this.breadcrumbs.push(new IBreadCrumb('User', '', false, false, []));

    this.fieldList.push(new DataGridField('displayID', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('username', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('Name', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('userType', 'arrow-down-disabled'));

    this.searchForm = this.fb.group({
      searchTxt: [''],
    });
  }

  ngOnInit(): void {
    this.subjectInit();
  }

  subjectInit() {
    this.userId = this.tokenService.currentUser.userID;
    let globalSearchPattern = this.searchForm.value.searchTxt;
    this.dataListObs = this.subjectMain.pipe(
      debounce(() => timer(this.searchFieldValueOutputDelay)),
      switchMap((dataFilter: any) =>
        this.user
          .getUserList(this.userId,
            dataFilter.pageNumber,
            dataFilter.pageSize,
            dataFilter.sort,
            globalSearchPattern,
          )
          .pipe(
            tap((res: any) => {
              this.totalNumberOfrecords = res.data.hitCount;
              this.numberOfrecords = res.data.dataList.length;
              this.currentPageNumber = dataFilter.pageNumber;
            }),
            map((res) => res.data.dataList)
          )
      )
    );

    setTimeout(() => {
      this.getUserDataList(1, false);
    }, 100);

  }

  getUserDataList(pageNumber: number, debounceNeeded: boolean = false) {
    let dataFilter = {
      pageNumber: pageNumber,
      pageSize: this.pageSize,
      sort: this.sortJson,
      searchByFields: this.searchByFields,
    };
    if (debounceNeeded) {
      this.searchFieldValueOutputDelay = AppConstants.DEBOUNCE_TIME.SEARCH;
    } else {
      this.searchFieldValueOutputDelay = AppConstants.DEBOUNCE_TIME.OTHE;
    }
    this.subjectMain.next(dataFilter);
  }

  doSorting(field: DataGridField) {
    if (this.sortJson[field.fieldName] === undefined) {
      this.sortDirection = 1;
    }

    if (this.sortDirection == 1) {
      field.sortingClass = 'arrow-down';
    } else {
      field.sortingClass = 'arrow-up';
    }

    this.fieldList.map((element) => {
      if (element.fieldName != field.fieldName) {
        element.sortingClass = 'arrow-down-disabled';
      }
    });

    this.sortJson = {};
    this.sortJson[field.fieldName] = this.sortDirection;
    this.getUserDataList(this.currentPageNumber);
    this.sortDirection = this.sortDirection * -1;
  }

  createUser() {
    this.ngbModalOptions.windowClass = 'app-create-user-popup';
    const modalRef = this.modalService.open(CreateUserPopupComponent, this.ngbModalOptions);
    this.user.myBehaviorUpdate.next(false);
    this.user.myBehaviorSave.next(true);
    modalRef.componentInstance.title="Create User"
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.getUserDataList(this.currentPageNumber, false);
    });

  }

  onSearch(event: any) {
    if ( !(this.searchForm.value.searchTxt.trim().length == 0 ||this.searchForm.value.searchTxt.trim().length > 2)) {
      return;
    }
    this.subjectInit();
  }

  get searchTxt() {
    return this.searchForm.get('searchTxt');
  }

  clearSearch(): void {
    this.searchForm.reset({
      searchTxt: '',
    });
    this.subjectInit();
  }

  getUserType(id: number) {
    const userType = {
      RecruiterAdmin: 0,
      InternalRecruiter: 1,
      ExternalRecruiter: 2,
      Interviewer: 3
    };
    return Object.keys(userType).find((key: any) => userType[key] === id)
  }

  onEdit(userdata: any) {
    this.user.myBehaviorUpdate.next(true);
    this.user.myBehaviorSave.next(false)
    this.ngbModalOptions.windowClass = 'app-create-user-popup';
    const modalRef = this.modalService.open(CreateUserPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.createuserForm.controls.firstName.value = userdata.firstName;
    modalRef.componentInstance.createuserForm.controls.lastName.value = userdata.lastName;
    modalRef.componentInstance.createuserForm.controls.userName.value = userdata.username;
    modalRef.componentInstance.createuserForm.controls.userType.value = userdata.userType;
    modalRef.componentInstance.createuserForm.controls.userType.disable();
    modalRef.componentInstance.createuserForm.controls.userName.disable();
    modalRef.componentInstance.title="Edit User"
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.getUserDataList(this.currentPageNumber, false);
    });
    this.user.userId = userdata.userID;
  }

  onRemove(userdata:any){
    let payload = {
      isDeleted: true
    }
    this.user.deleteUser(userdata.userID,payload).subscribe((res:any) =>{
       this.getUserDataList(this.currentPageNumber, false)
    })

  }

}


