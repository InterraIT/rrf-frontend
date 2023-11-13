import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InterviewService } from 'src/app/services/interview.service';

@Component({
  selector: 'app-view-interview-feedback-popup',
  templateUrl: './view-interview-feedback-popup.component.html',
  styleUrls: ['./view-interview-feedback-popup.component.css']
})
export class ViewInterviewFeedbackPopupComponent implements OnInit {
  @Input() positionProfileMapID: string;
  @Input() positionID: string;
  @Input() profileID: string;
  @Input() interviewID: string;
  
  feedBackData: any;
  constructor(public activeModal: NgbActiveModal,
    private interviewService: InterviewService) {

  }
  ngOnInit(): void {
    this.fetchInterviewFeedback();
  }
  fetchInterviewFeedback(){
    this.interviewService.fetchInterviewFeedback(this.positionProfileMapID,this.interviewID).subscribe((resp:any)=>{
      this.feedBackData = resp.data;
    },(error:any)=>{
    })
  }

}
