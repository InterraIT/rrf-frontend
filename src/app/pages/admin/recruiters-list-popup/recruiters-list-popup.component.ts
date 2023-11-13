import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { RecruitersListChildComponent } from '../recruiters-list-child/recruiters-list-child.component';
import { PositionsService } from 'src/app/services/positions.service';
import { TranslateService } from '@ngx-translate/core';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recruiters-list-popup',
  templateUrl: './recruiters-list-popup.component.html',
  styleUrls: ['./recruiters-list-popup.component.css']
})
export class RecruitersListPopupComponent implements OnInit {
  @Output() refreshParent = new EventEmitter<any>();
  @Input() positionID: string;

  public tempAssociatedBusinessList = [];
  public slectedParticipantList = [];
  public totalNumberOfrecords: number = -1;
  public tempTotalNumberOfrecords: number = -1;
  public participantsSearchForm: FormGroup;
  public RecruiterList: any = []
  private childRow: ComponentRef<RecruitersListChildComponent>;
  public componentRef:ComponentRef<any>;
  constructor(public activeModal: NgbActiveModal,
    private router: Router, private user: UsersService,
    private compFactory: ComponentFactoryResolver,
    private viewRef: ViewContainerRef,
    private _renderer: Renderer2,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private position: PositionsService,
    private translate: TranslateService,
    private toastr: CustomToastrService,
    private fb: FormBuilder,
  ) { 
    this.participantsSearchForm = this.fb.group({
      searchTxt: [''],
    });
  }

  ngOnInit(): void {
    this.recruiterList();
  }

  recruiterList() {
    this.user.getRecruiterList().subscribe((res: any) => {
      this.RecruiterList = res.data.dataList
      this.tempAssociatedBusinessList = [...this.RecruiterList]
      this.tempTotalNumberOfrecords = this.tempAssociatedBusinessList?.length;

    }, (error: any) => {
      this.RecruiterList = [];
      this.tempAssociatedBusinessList = [];
      this.totalNumberOfrecords = this.RecruiterList.length;
    });


  }

  performFilter() {
    let filterJson = this.participantsSearchForm.value;
    let filteredList = [];
    
    if (filterJson.searchTxt) {
      filteredList = this.tempAssociatedBusinessList.filter(x => {
        if (x.firstName?.toLowerCase().indexOf(filterJson.searchTxt?.toLowerCase()) > -1) {
          return x;
        }
      });
    } else {
      filteredList = [...this.tempAssociatedBusinessList]
    }

    this.RecruiterList = [...filteredList];
    this.totalNumberOfrecords = this.RecruiterList.length;
  }

  expandRow(divRef: any, rowData: any) {
    var divRow = document.getElementById(divRef);

    if ((divRow.children.length == 3)) {
      let factory = this.compFactory.resolveComponentFactory(RecruitersListChildComponent);
      this.childRow = this.viewRef.createComponent(factory);
      this.childRow.instance.participantBusinessChildData = rowData;

      const childDiv = this._renderer.createElement('div');
      childDiv.appendChild(this.childRow.location.nativeElement)
      this._renderer.addClass(childDiv, 'hs-participant-data');

      divRow.appendChild(childDiv)
      this._renderer.addClass(divRow, 'shown');
    } else {
      divRow.removeChild(divRow.lastChild);
      this._renderer.removeClass(divRow, 'shown');
    }
  }

  onSelectBusiness(event: any, userlist: any) {
    const index = this.slectedParticipantList.findIndex((obj) => obj.displayID === userlist.displayID);
    if (event.target.checked) {
      userlist.selected = true;
      this.slectedParticipantList.push(userlist);
    } else {
      userlist.selected = false;
      this.slectedParticipantList.splice(index, 1);
    }
  }

  onSearch(event: any) {
    //this.slectedParticipantList = [];
    if (!(this.participantsSearchForm.value.searchTxt.trim().length == 0 || this.participantsSearchForm.value.searchTxt.trim().length > 1)) {
      return;
    }
    this.performFilter();
  }

  onSubmit() {
    if (this.slectedParticipantList.length == 0 && this.tempAssociatedBusinessList.length != 0) {
      this.translate.get('JOB_OFFER.PARTICIPANT_NOT_SELECT_MSG').subscribe((res: string) => {
        this.toastr.error(res);
      });

      return;
    }
    let participantuser = this.slectedParticipantList
    let data = {
      "recruiters": participantuser
    }
    
    this.position.addRecruiter(this.positionID, data).subscribe((res: any) => {
      this.activeModal.close('Override click');
      this.refreshParent.emit(this.slectedParticipantList);
    })

  }




}
