import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SingleFileUploaderComponent } from './single-file-uploader/single-file-uploader.component';
import { FileUploadProgressComponent } from './file-upload-progress/file-upload-progress.component';
import { CustomToastrComponent } from './custom-toastr/custom-toastr.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { PipesModule } from '../pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ScheduleMeetingPopupComponent } from './schedule-meeting-popup/schedule-meeting-popup.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { PositionProfileTabComponent } from './position-profile-tab/position-profile-tab.component';
import { PositionProfileChildComponent } from './position-profile-child/position-profile-child.component';
import { PositionInterviewerTabComponent } from './position-interviewer-tab/position-interviewer-tab.component';
import { CreateProfilePopupComponent } from './create-profile-popup/create-profile-popup.component';
import { ViewInterviewFeedbackPopupComponent } from './view-interview-feedback-popup/view-interview-feedback-popup.component';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';
import { UpdateProfileDetailsComponent } from './update-profile-details/update-profile-details.component';
import { UpdateProfilePasswordComponent } from './update-profile-password/update-profile-password.component';
import { UpdateProfileManageComponent } from './update-profile-manage/update-profile-manage.component';
import { ProfileListPopupComponent } from './profile-list-popup/profile-list-popup.component';
import { ProfileListChildComponent } from './profile-list-child/profile-list-child.component';
import { ShowHidePasswordDirective } from '../directives/show-hide-password.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AdminHeaderComponent,
    CustomPaginationComponent,
    BreadcrumbComponent,
    SingleFileUploaderComponent,
    FileUploadProgressComponent,
    CustomToastrComponent,
    ConfirmPopupComponent,
    ScheduleMeetingPopupComponent,
    PositionProfileTabComponent,
    PositionProfileChildComponent,
    PositionInterviewerTabComponent,
    CreateProfilePopupComponent,
    ViewInterviewFeedbackPopupComponent,
    CustomLoaderComponent,
    UpdateProfileDetailsComponent,
    UpdateProfilePasswordComponent,
    UpdateProfileManageComponent,
    ProfileListPopupComponent,
    ProfileListChildComponent,
    ShowHidePasswordDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    PipesModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false,
      extend: true
    }),
    ReactiveFormsModule,
  ],
  exports:[TranslateModule,
    AdminHeaderComponent,
    CustomPaginationComponent,
    BreadcrumbComponent,
    SingleFileUploaderComponent,
    CustomToastrComponent,
    ConfirmPopupComponent,
    ScheduleMeetingPopupComponent,
    PositionProfileTabComponent,
    PositionProfileChildComponent,
    PositionInterviewerTabComponent,
    CustomLoaderComponent,
    UpdateProfileManageComponent,
    ProfileListPopupComponent,
    ProfileListChildComponent,
    ShowHidePasswordDirective,
  ]
})
export class SharedModule {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

 }
