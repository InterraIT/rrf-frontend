import { Component, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterviewService } from 'src/app/services/interview.service';
import { InterviewChildComponent } from '../interview-child/interview-child.component';
import { AppConstants } from 'src/app/helpers/app-contants.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataType: string=AppConstants.STATES.INTERVIEW.SCHEDULED.ID;
  constructor(){

  }
  ngOnInit(): void {
   
  }
  

}
