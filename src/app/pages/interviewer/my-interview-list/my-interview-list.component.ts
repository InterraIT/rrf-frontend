import { Component, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterviewService } from 'src/app/services/interview.service';
import { InterviewChildComponent } from '../interview-child/interview-child.component';
import { AppConstants } from 'src/app/helpers/app-contants.helper';

@Component({
  selector: 'app-my-interview-list',
  templateUrl: './my-interview-list.component.html',
  styleUrls: ['./my-interview-list.component.css']
})
export class MyInterviewListComponent implements OnInit{
  @Input() dataType: string;
  interviewList: Array<any> = [];
  constructor(private interviewService: InterviewService,
    private activeRoute: ActivatedRoute,
    private viewRef: ViewContainerRef,
    private _renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.fetchMyScheduledInterviews();
  }

  fetchMyScheduledInterviews() {
    this.interviewService.getMyInterviews(this.dataType)
      .subscribe((resp: any) => {
        this.interviewList = resp.data.interviews;
      }, (error: any) => {
        console.error(error);
      });
  }
  expandRow(divRef: any, rowData: any) {
    var divRow = document.getElementById(divRef);
    if (divRow.children.length > 2) {
      divRow.removeChild(divRow.lastChild);
      this._renderer.removeClass(divRow, 'shown');
      return;
    }

    let childRow = this.viewRef.createComponent(InterviewChildComponent);
    childRow.instance.positionProfileMapID = rowData.positionProfileMapID;
    childRow.instance.positionID = rowData.positionID;
    childRow.instance.profileID = rowData.profileID;
    childRow.instance.interviewID = rowData.interviewDetails.interviewID;
    childRow.instance.childData = rowData;
    childRow.instance.refreshParent?.subscribe((response: any) => {
      this.fetchMyScheduledInterviews();
    });

    const childDiv = this._renderer.createElement('div');
    childDiv.appendChild(childRow.location.nativeElement)
    this._renderer.addClass(childDiv, 'hs-interview-wrapper');
    divRow.appendChild(childDiv)
    this._renderer.addClass(divRow, 'shown');
  }
}
