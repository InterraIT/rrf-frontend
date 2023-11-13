import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecruiterRoutingModule } from './recruiter-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PositionsComponent } from './positions/positions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RecruiterPositionManageComponent } from './recruiter-position-manage/recruiter-position-manage.component';
import { RecruiterPositionDetailsComponent } from './recruiter-position-details/recruiter-position-details.component';
import { InterviewerListPopupComponent } from './interviewer-list-popup/interviewer-list-popup.component';
import { InterviewerListChildComponent } from './interviewer-list-child/interviewer-list-child.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        DashboardComponent,
        PositionsComponent,
        RecruiterPositionManageComponent,
        RecruiterPositionDetailsComponent,
        InterviewerListPopupComponent,
        InterviewerListChildComponent
    ],
    imports: [
        CommonModule,
        RecruiterRoutingModule,
        SharedModule,
        PipesModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        TranslateModule,
        FormsModule,
        HttpClientModule,
    ],
    exports: [ TranslateModule],
})
export class RecruiterModule { }
