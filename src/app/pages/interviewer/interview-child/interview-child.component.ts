import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPopupService } from 'src/app/services/confirm-popup.service';
import { InterviewFeedbackPopupComponent } from '../interview-feedback-popup/interview-feedback-popup.component';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { ViewInterviewFeedbackPopupComponent } from 'src/app/shared/view-interview-feedback-popup/view-interview-feedback-popup.component';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-interview-child',
  templateUrl: './interview-child.component.html',
  styleUrls: ['./interview-child.component.css']
})
export class InterviewChildComponent implements OnInit {
  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    windowClass: 'md-class'
  };

  @Output() refreshParent = new EventEmitter<any>();
  @Input() positionProfileMapID: string;
  @Input() positionID: string;
  @Input() profileID: string;
  @Input() interviewID: string;
  @Input() childData: any;
  canSeeCompleteBtn:boolean = false;
  constructor( private modalService: NgbModal,
    private lookup: LookupService){

  }
  ngOnInit(): void {
    this.canSeeCompleteBtn=false;
    if(this.childData.interviewDetails.currentState.stateID==AppConstants.STATES.INTERVIEW.SCHEDULED.ID){
      this.canSeeCompleteBtn=true;
    }
  }
  
  onCompleteInterviewPopup(){
    this.ngbModalOptions.windowClass = 'app-interview-feedback-popup';
    const modalRef = this.modalService.open(InterviewFeedbackPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.positionProfileMapID=this.positionProfileMapID;
    modalRef.componentInstance.positionID=this.positionID;
    modalRef.componentInstance.profileID=this.profileID;
    modalRef.componentInstance.interviewID=this.interviewID;
    modalRef.componentInstance.refreshParent.subscribe((resp:any)=>{
      this.refreshParent.emit(true);
    });
  }

  onOpenFeedbackPopup(){
    this.ngbModalOptions.windowClass = 'app-interview-feedback-popup';
    const modalRef = this.modalService.open(ViewInterviewFeedbackPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.positionProfileMapID=this.positionProfileMapID;
    modalRef.componentInstance.positionID=this.positionID;
    modalRef.componentInstance.profileID=this.profileID;
    modalRef.componentInstance.interviewID=this.interviewID;
  }

  onDownloadResume(currentResume:any):void{
    this.lookup.downloadFile(currentResume.docURL,currentResume.originalFileName);
  }
  
}
