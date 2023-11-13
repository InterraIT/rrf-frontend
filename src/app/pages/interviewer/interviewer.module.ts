import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewerRoutingModule } from './interviewer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { InterviewChildComponent } from './interview-child/interview-child.component';
import { InterviewFeedbackPopupComponent } from './interview-feedback-popup/interview-feedback-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyInterviewsManageComponent } from './my-interviews-manage/my-interviews-manage.component';
import { MyInterviewListComponent } from './my-interview-list/my-interview-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InterviewChildComponent,
    InterviewFeedbackPopupComponent,
    MyInterviewsManageComponent,
    MyInterviewListComponent
  ],
  imports: [
    CommonModule,
    InterviewerRoutingModule,
    PipesModule,
    ReactiveFormsModule,
  ]
})
export class InterviewerModule { }
