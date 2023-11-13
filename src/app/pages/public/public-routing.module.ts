import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { noLoginGuard } from '../../guards/no-login.guard';

const routes: Routes = [
  { path: '', component: LoginComponent,canActivate: [noLoginGuard] },
  { path: 'login', component: LoginComponent,canActivate: [noLoginGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
