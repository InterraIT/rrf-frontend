import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostionStatePipe } from './postion-state.pipe';
import { PostionStateSelectedPipe } from './postion-state-selected.pipe';
import { RandomRecruiterLogoPipe } from './random-recruiter-logo.pipe';
import { ProfileStatePipe } from './profile-state.pipe';
import { TimestampConverterPipe } from './timestamp-converter.pipe';
import { InterviewStatePipe } from './interview-state.pipe';
import { RandomProfilesLogoPipe } from './random-profiles-logo.pipe';



@NgModule({
  declarations: [
    PostionStatePipe,
    PostionStateSelectedPipe,
    RandomRecruiterLogoPipe,
    ProfileStatePipe,
    TimestampConverterPipe,
    InterviewStatePipe,
    RandomProfilesLogoPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PostionStatePipe,
    PostionStateSelectedPipe,
    RandomRecruiterLogoPipe,
    ProfileStatePipe,
    TimestampConverterPipe,
    InterviewStatePipe,
    RandomProfilesLogoPipe
  ]
})
export class PipesModule { }
