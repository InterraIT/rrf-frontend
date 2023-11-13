import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyInterviewsManageComponent } from './my-interviews-manage/my-interviews-manage.component';
import { UpdateProfileManageComponent } from 'src/app/shared/update-profile-manage/update-profile-manage.component';


const routes: Routes = [
  { path: "", redirectTo: 'dashboard', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent},
  { path: "my-interviews", component: MyInterviewsManageComponent},
  { path: "update-profile", component: UpdateProfileManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewerRoutingModule { }
