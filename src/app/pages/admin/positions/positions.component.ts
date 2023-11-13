import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, debounce, map, switchMap, tap, timer } from 'rxjs';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { IBreadCrumb } from 'src/app/models/breadcrumb.interface';
import { DataGridField } from 'src/app/models/data-grid-field.model';
import { PositionsService } from 'src/app/services/positions.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  public breadcrumbs: Array<IBreadCrumb> = [];
  searchFieldValueOutputDelay: number;
  subjectMain = new Subject<any>();
  public dataListObs: Observable<any[]>;
  public pageSize = 10;
  public totalNumberOfrecords: number;
  public numberOfrecords = -1;
  public highlightID: string = '';
  public currentPageNumber = 1;
  public stateList = [];
  public searchForm: FormGroup;
  public stateSelected = '';
  public positionState;
  public fieldList: Array<DataGridField> = [];
  sortJson = {};
  sortDirection = 1;
  searchByFields = [];
  constructor(private positions:PositionsService, private router: Router,
    private activeRoute: ActivatedRoute,private fb: FormBuilder,) {
    this.breadcrumbs.push(new IBreadCrumb('Postions', '', false, false, []));
    
    this.fieldList.push(new DataGridField('displayID', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('jobTitle', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('projectName', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('clientName', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('currentState.stateDisplayName', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('rrfYear', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('rrfNumber', 'arrow-down-disabled'));

    this.searchForm = this.fb.group({
      searchTxt: [''],
    });
  }

  ngOnInit(): void {
    this.subjectInit();
    this.populateStates();
  }

  subjectInit() {
    this.dataListObs  = this.subjectMain.pipe(
      debounce(() => timer(this.searchFieldValueOutputDelay)),
      switchMap((dataFilter: any) => this.positions.getPositionList(dataFilter.pageNumber, dataFilter.pageSize, dataFilter.searchByFields, dataFilter.sort,dataFilter.globalSearchPattern).pipe(
        tap((res: any) => {
          this.totalNumberOfrecords = res.data.hitCount;
          this.numberOfrecords = res.data.dataList.length;
          this.currentPageNumber = dataFilter.pageNumber;
        }),
        map((res) => res.data.dataList)
      ))
    );
  }


  removeClass(displayPanel: any, event: any, inputClassName: string) {
    if (displayPanel.classList.contains('show') && 
      event.target?.childNodes[0]?.className === inputClassName) {
        displayPanel.classList.remove('show');
    }
  }

  populateStates() {
    this.positions.getPositionStateList().subscribe((resp:any)=>{
        this.stateList = resp.data;

        this.activeRoute.queryParams.subscribe(params => {
          if (params.jobStatus) {
            this.positionState = params.jobStatus;
            let initialState = this.stateList.find((element) => element.stateName == params.jobStatus)
            this.stateSelected = initialState.stateID;
            this.fetchPositionList(initialState);
          }
        });

        setTimeout(() => {
          this.getDatalist(1,false);
        }, 100);
    });
  }

  getDatalist(pageNumber: number, debounceNeeded: boolean = false) {
    let globalSearchPattern = encodeURIComponent(this.searchForm.value.searchTxt);
    let dataFilter = {
      pageNumber: pageNumber,
      pageSize: this.pageSize,
      sort: this.sortJson,
      searchByFields:this.searchByFields,
      globalSearchPattern: globalSearchPattern
    }
    if (debounceNeeded) {
      this.searchFieldValueOutputDelay = AppConstants.DEBOUNCE_TIME.SEARCH;
    } else {
      
      this.searchFieldValueOutputDelay = AppConstants.DEBOUNCE_TIME.OTHE;
    }
    this.subjectMain.next(dataFilter);
  }

  fetchPositionList(state:any){

    if (state != null && state != "All") {
      this.stateSelected = state.stateID;
    }else{
      this.stateSelected='';
    }

    this.searchByFields = [];
    if (state != null && state != "All") {
      this.searchByFields.push({ "currentState.stateID": encodeURIComponent(state.stateID) });
    }
    
    this.getDatalist(1,false);

  }

  doSorting(field: DataGridField) {
    if (this.sortJson[field.fieldName] === undefined) {
      this.sortDirection = 1;
    }

    if (this.sortDirection == 1) {
      field.sortingClass = "arrow-down";
    } else {
      field.sortingClass = "arrow-up";
    }

    this.fieldList.map(element => {
      if (element.fieldName != field.fieldName) {
        element.sortingClass = "arrow-down-disabled"
      }
    });

    this.sortJson = {};
    this.sortJson[field.fieldName] = this.sortDirection;
    this.getDatalist(this.currentPageNumber);
    this.sortDirection = this.sortDirection * -1;
  }

  onSearch(event: any) {
    if ( !(this.searchForm.value.searchTxt.trim().length == 0 ||this.searchForm.value.searchTxt.trim().length > 2)) {
      return;
    }
    this.getDatalist(1,true);
  }

  
  get searchTxt() {
    return this.searchForm.get('searchTxt');
  }

  clearSearch(): void {
    this.searchForm.reset({
      searchTxt: '',
    });
    this.getDatalist(1,true);
  }

  rowCallback(positionId: any): void {
    this.router.navigate([`../positions/${positionId.positionID}`],{ relativeTo: this.activeRoute });
  }
}
