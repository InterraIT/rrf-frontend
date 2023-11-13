import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { authenticationGuard } from './guards/authentication.guard';
import { RecruiterLayoutComponent } from './layout/recruiter-layout/recruiter-layout.component';
import { InterviewerLayoutComponent } from './layout/interviewer-layout/interviewer-layout.component';


const Public_Routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule)

  }
]

const Admin_Routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  }
]

const Recruiter_Routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./pages/recruiter/recruiter.module').then(m => m.RecruiterModule)
  }
]

const Interviewer_Routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./pages/interviewer/interviewer.module').then(m => m.InterviewerModule)
  }
]


const routes: Routes = [
  { 
    path: "", 
    component: PublicLayoutComponent, 
    children: Public_Routes,

  },
  { 
    path: "admin", 
    component: AdminLayoutComponent, 
    children: Admin_Routes,
    canActivate: [authenticationGuard] 
  },
  { 
    path: "recruiter", 
    component: RecruiterLayoutComponent, 
    children: Recruiter_Routes,
    canActivate: [authenticationGuard] 
  },

  { 
    path: "interviewer", 
    component: InterviewerLayoutComponent, 
    children: Interviewer_Routes,
    canActivate: [authenticationGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
