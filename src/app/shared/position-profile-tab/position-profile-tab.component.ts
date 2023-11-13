import { Component, ComponentRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { PositionProfileChildComponent } from '../position-profile-child/position-profile-child.component';
import { Observable, Subject } from 'rxjs';
import { DataGridField } from 'src/app/models/data-grid-field.model';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-position-profile-tab',
  templateUrl: './position-profile-tab.component.html',
  styleUrls: ['./position-profile-tab.component.css']
})
export class PositionProfileTabComponent implements OnInit{
  @Output() refreshParent = new EventEmitter<any>();
  @Input() positionStateID: string;
  @Input() positionID:string;

  private childRow: ComponentRef<PositionProfileChildComponent>;
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
  profilesList: any = [];


  constructor(public profiles: ProfilesService,
    private activeRoute: ActivatedRoute,
    private viewRef: ViewContainerRef,
    private _renderer: Renderer2) {
    this.fieldList.push(new DataGridField('displayID', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('jobTitle', 'arrow-down-disabled'));
    this.fieldList.push(new DataGridField('projectName', 'arrow-down-disabled'));
    this.positionID = this.activeRoute.snapshot.paramMap.get("positionID") as string;
  }

  ngOnInit(): void {
    this.getProfileslist()
  }

  getProfileslist() {
    this.profiles.getProfilesByPosition(this.positionID).subscribe((res: any) => {
      this.profilesList = res.data.dataList;
    });
  }

  removeClass(displayPanel: any, event: any, inputClassName: string) {
    if (displayPanel.classList.contains('show') &&
      event.target?.childNodes[0]?.className === inputClassName) {
      displayPanel.classList.remove('show');
    }
  }


  expandRow(divRef: any, rowData: any) {

    var divRow = document.getElementById(divRef);
    if (divRow.children.length > 2) {
      divRow.removeChild(divRow.lastChild);
      this._renderer.removeClass(divRow, 'shown');
      return;
    }

    this.childRow = this.viewRef.createComponent(PositionProfileChildComponent);
    this.childRow.instance.positionID = this.positionID;
    this.childRow.instance.positionProfileMapID = rowData.positionProfileMapID;
    this.childRow.instance.profileID = rowData.profileID;
    this.childRow.instance.positionStateID = this.positionStateID;
    this.childRow.instance.refreshParent?.subscribe((response: any) => {
      this.refreshParent.emit(response);
      this.getProfileslist();
    });

    const childDiv = this._renderer.createElement('div');
    childDiv.appendChild(this.childRow.location.nativeElement)
    this._renderer.addClass(childDiv, 'hs-award-job-offer-wrapper');
    divRow.appendChild(childDiv)
    this._renderer.addClass(divRow, 'shown');
  }
}
