import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PositionsComponent } from './positions/positions.component';
import { RecruiterPositionManageComponent } from './recruiter-position-manage/recruiter-position-manage.component';
import { UpdateProfileManageComponent } from 'src/app/shared/update-profile-manage/update-profile-manage.component';



const routes: Routes = [
  { path: "", redirectTo: 'dashboard', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent },
  { path: "positions", component: PositionsComponent },
  { path: "positions/:positionID", component: RecruiterPositionManageComponent},
  { path: "update-profile", component: UpdateProfileManageComponent },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
