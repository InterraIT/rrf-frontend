import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { DataGridField } from 'src/app/models/data-grid-field.model';
import { PositionsService } from 'src/app/services/positions.service';

@Component({
  selector: 'app-position-interviewer-tab',
  templateUrl: './position-interviewer-tab.component.html',
  styleUrls: ['./position-interviewer-tab.component.css']
})
export class PositionInterviewerTabComponent {
  @Output() refreshParent = new EventEmitter<any>();
  @Input() positionStateID: string;
  @Input() positionID:string;

  searchFieldValueOutputDelay: number;
  subjectMain = new Subject<any>();
  public dataListObs: Observable<any[]>;
  public pageSize = 10;
  public totalNumberOfrecords: number;
  public numberOfrecords = -1;
  public highlightID: string = '';
  public currentPageNumber = 1;
  public selectInterviewerList: any = [];
  public data: any = [];
  public stateSelected = '';
  public fieldList: Array<DataGridField> = [];
  sortJson = {};
  sortDirection = 1;
  searchByFields = [];
  canRemoveInterviewer: boolean = false;
  constructor(private positions: PositionsService,
  ) {

    this.fieldList.push(new DataGridField('displayID', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('jobTitle', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('projectName', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('clientName', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('currentState.stateDisplayName', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('rrfYear', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('rrfNumber', 'arrow-down-disabled'));
  }

  ngOnInit(): void {
    this.fetchAssignedInterviewers();
    this.canRemoveInterviewer = false;
    if (this.positionStateID == AppConstants.STATES.POSITION.DRAFT.ID
      || this.positionStateID == AppConstants.STATES.POSITION.OPEN.ID) {
      this.canRemoveInterviewer = true;
    }
  }

  fetchAssignedInterviewers() {
    this.selectInterviewerList = [];
    this.positions.getAssignedInterviewer(this.positionID).subscribe((res: any) => {
      res.data.dataList.map((res: any) => {
        this.selectInterviewerList.push(res)
      })
    })
  }

  removeClass(displayPanel: any, event: any, inputClassName: string) {
    if (displayPanel.classList.contains('show') &&
      event.target?.childNodes[0]?.className === inputClassName) {
      displayPanel.classList.remove('show');
    }
  }


  getDatalist(pageNumber: number, debounceNeeded: boolean = false) {
    let dataFilter = {
      pageNumber: pageNumber,
      pageSize: this.pageSize,
      sort: this.sortJson,
      searchByFields: this.searchByFields
    }
    if (debounceNeeded) {
      this.searchFieldValueOutputDelay = AppConstants.DEBOUNCE_TIME.SEARCH;
    } else {

      this.searchFieldValueOutputDelay = AppConstants.DEBOUNCE_TIME.OTHE;
    }
    this.subjectMain.next(dataFilter);
  }

  fetchPositionList(state: any) {

    if (state != null && state != "All") {
      this.stateSelected = state.stateID;
    } else {
      this.stateSelected = '';
    }

    this.searchByFields = [];
    if (state != null && state != "All") {
      this.searchByFields.push({ "currentState.stateID": encodeURIComponent(state.stateID) });
    }

    this.getDatalist(1, false);

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

  deleteInterviewer(userid: any) {
    this.positions.removeInterviewer(this.positionID, userid).subscribe((res: any) => {
      let index = this.selectInterviewerList.indexOf(userid)
      this.selectInterviewerList.splice(index, 1)
      this.fetchAssignedInterviewers();
    })
  }
}
