import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PositionsComponent } from './positions/positions.component';
import { PositionManageComponent } from './position-manage/position-manage.component';
import { UpdateProfileManageComponent } from 'src/app/shared/update-profile-manage/update-profile-manage.component';




const routes: Routes = [
  { path: "", redirectTo: 'dashboard', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "positions", component: PositionsComponent },
  { path: "positions/:positionID", component: PositionManageComponent },
  { path: "update-profile", component: UpdateProfileManageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
