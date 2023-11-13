import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user-popup',
  templateUrl: './create-user-popup.component.html',
  styleUrls: ['./create-user-popup.component.css']
})



export class CreateUserPopupComponent implements OnInit {
  @Output() refreshParent = new EventEmitter<any>();
  @Input() title:string;
  public userRoleList = [];
  public createuserForm: FormGroup;
  public userid: any = '';
  public canviewUpdateButton;
  public canviewSaveButton;

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private user: UsersService,) {

    this.createuserForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      password: [''],
      userName: [''],
      userType: [AppConstants.USER_TYPE.RECRUITER_ADMIN.ID],
      title:'',
    })

    this.userRoleList.push({ roleID: AppConstants.USER_TYPE.RECRUITER_ADMIN.ID, roleName: AppConstants.USER_TYPE.RECRUITER_ADMIN.NAME });
    this.userRoleList.push({ roleID: AppConstants.USER_TYPE.INTERNAL_RECRUITER.ID, roleName: AppConstants.USER_TYPE.INTERNAL_RECRUITER.NAME });
    this.userRoleList.push({ roleID: AppConstants.USER_TYPE.EXTERNAL_RECRUITER.ID, roleName: AppConstants.USER_TYPE.EXTERNAL_RECRUITER.NAME });
    this.userRoleList.push({ roleID: AppConstants.USER_TYPE.INTERVIEWER.ID, roleName: AppConstants.USER_TYPE.INTERVIEWER.NAME });
  }

  get firstName() { return this.createuserForm.get("firstName"); }
  get lastName() { return this.createuserForm.get("lastName"); }
  get password() { return this.createuserForm.get("password"); }
  get userName() { return this.createuserForm.get("userName"); }
  get userType() { return this.createuserForm.get("userType"); }



  ngOnInit(): void {
    this.userid = this.user.userId;
    this.user.myBehaviorUpdate.subscribe((res: boolean) => {
      this.canviewUpdateButton = res
    })
    this.user.myBehaviorSave.subscribe((res: boolean) => {
      this.canviewSaveButton = res;
    })


  }


  onSubmit() {


    let payload = {
      firstName: this.createuserForm.value.firstName,
      lastName: this.createuserForm.value.lastName,
      password: this.createuserForm.value.password,
      userName: this.createuserForm.value.userName,
      userType: this.createuserForm.value.userType,
    }


    this.user.addUser(payload).subscribe((res: any) => {
      this.user.myBehaviorUpdate.next(false)
      this.activeModal.close('Override click');
      this.refreshParent.emit(true);
    })
   

  }

  onUpdate() {
    let payload = {
      firstName: this.createuserForm.value.firstName,
      lastName: this.createuserForm.value.lastName,
      userType: this.createuserForm.value.userType,
    }

    this.user.editUser(this.userid, payload).subscribe((res: any) => {
      this.user.myBehaviorUpdate.next(false)
      this.activeModal.close('Override click');
      this.refreshParent.emit(true);
    });

  }

}
