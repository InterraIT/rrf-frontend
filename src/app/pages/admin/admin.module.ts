import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './user/user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PositionsComponent } from './positions/positions.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PositionManageComponent } from './position-manage/position-manage.component';
import { PositionDetailsComponent } from './position-details/position-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecruitersListPopupComponent } from './recruiters-list-popup/recruiters-list-popup.component';
import { RecruitersListChildComponent } from './recruiters-list-child/recruiters-list-child.component';
import { CreateUserPopupComponent } from './create-user-popup/create-user-popup.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    PositionsComponent,
    PositionManageComponent,
    PositionDetailsComponent,
    RecruitersListPopupComponent,
    RecruitersListChildComponent,
    CreateUserPopupComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgxPaginationModule,
    HttpClientModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [ TranslateModule],
})
export class AdminModule { }
