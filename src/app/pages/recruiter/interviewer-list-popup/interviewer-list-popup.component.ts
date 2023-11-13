import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PositionsService } from 'src/app/services/positions.service';
import { UsersService } from 'src/app/services/users.service';
import { InterviewerListChildComponent } from '../interviewer-list-child/interviewer-list-child.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-interviewer-list-popup',
  templateUrl: './interviewer-list-popup.component.html',
  styleUrls: ['./interviewer-list-popup.component.css']
})
export class InterviewerListPopupComponent implements OnInit{
  @Output() refreshParent = new EventEmitter<any>();
  @Input() positionID: string;
  
  public tempAssociatedBusinessList = [];
  public slectedParticipantList = [];
  public totalNumberOfrecords: number = -1;
  public tempTotalNumberOfrecords: number = -1;
  public InterviewerList: any = [];
  public participantsSearchForm: FormGroup;
  private childRow: ComponentRef<InterviewerListChildComponent>;

  constructor(public activeModal: NgbActiveModal,
    private user: UsersService,
    private compFactory: ComponentFactoryResolver,
    private viewRef: ViewContainerRef,
    private _renderer: Renderer2,
    private position: PositionsService,
    private fb: FormBuilder){

      this.participantsSearchForm = this.fb.group({
        searchTxt: [''],
      });
  }

  ngOnInit(): void {
    this.getInterviewer();
  }

  getInterviewer() {
    this.user.getInterviewerList().subscribe((res: any) => {
      this.InterviewerList = res.data.dataList
      this.tempAssociatedBusinessList = [...this.InterviewerList]
      this.tempTotalNumberOfrecords = this.tempAssociatedBusinessList?.length;

    }, (error: any) => {
      this.InterviewerList = [];
      this.tempAssociatedBusinessList = [];
      this.totalNumberOfrecords = this.InterviewerList.length;
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

    this.InterviewerList = [...filteredList];
    this.totalNumberOfrecords = this.InterviewerList.length;
  }

  expandRow(divRef: any, rowData: any) {
    var divRow = document.getElementById(divRef);

    if ((divRow.children.length == 3)) {
      let factory = this.compFactory.resolveComponentFactory(InterviewerListChildComponent);
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
    let participantuser = this.slectedParticipantList
    let data={
      "interviewers":participantuser
    }
    this.position.addInterviewer(this.positionID,data).subscribe((res:any)=>{
      this.activeModal.close('Override click');
      this.refreshParent.emit(this.slectedParticipantList);
    });
  }

}
