import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenManagerService } from '../../services/token-manager.service';
import { UserModel } from 'src/app/models/user.model';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  public userID = '';
  public fullName:string = '';
  public currentUser: UserModel;
  constructor(private router: Router,
    private users: UsersService,
    private tokenService: TokenManagerService) {
      this.currentUser = this.tokenService.currentUser;

  }
  

  ngOnInit(){
    this.userID = this.tokenService.currentUser.userID;  
    this.fullName = this.currentUser.fullName;
    this.users.fullName.subscribe(res => {
      this.fullName = res
    })
  }

  onOpenLogout(){
    this.tokenService.logout().subscribe((resp:any)=>{
      this.router.navigate([`../login`]);
    });
    
  }

  onOpenUpdateProfile(){
    if(this.tokenService.currentUser.userType===AppConstants.USER_TYPE.RECRUITER_ADMIN.NAME){
       this.router.navigate([`/admin/update-profile`]);
    }else if(this.tokenService.currentUser.userType===AppConstants.USER_TYPE.INTERNAL_RECRUITER.NAME){
      this.router.navigate([`/recruiter/update-profile`]);
    }else if(this.tokenService.currentUser.userType===AppConstants.USER_TYPE.INTERVIEWER.NAME){
      this.router.navigate([`/interviewer/update-profile`])
    }
}
}
