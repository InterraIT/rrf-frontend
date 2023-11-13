import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RegistractionValidators } from 'src/app/helpers/registaction.validator';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { TokenManagerService } from 'src/app/services/token-manager.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-profile-password',
  templateUrl: './update-profile-password.component.html',
  styleUrls: ['./update-profile-password.component.css']
})
export class UpdateProfilePasswordComponent implements OnInit {
  @ViewChild('focusElement') focusElement: ElementRef;
  @Output() dirtyCheckFlow = new EventEmitter<FormGroup>();
  @Output() refreshParent = new EventEmitter<any>();

  public changePswdForm: FormGroup;
  public username: any = '';
  constructor(private fb: FormBuilder,
    private translate: TranslateService,
    private user: UsersService,
    public tokenService: TokenManagerService,
    private toastr: CustomToastrService,) {

    this.changePswdForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    }, {
      validator: RegistractionValidators.confirmedValidator('newPassword', 'confirmpassword')
    });
    this.username = this.tokenService.currentUser.userName;
  }

  get oldPassword() { return this.changePswdForm.get("oldPassword"); }
  get newPassword() { return this.changePswdForm.get("newPassword"); }
  get confirmpassword() { return this.changePswdForm.get("confirmpassword"); }

  ngOnInit(): void {
    this.getuserDetails()
  }

  dirtyCheckInit() {
    this.dirtyCheckFlow.emit(this.changePswdForm);
  }

  getuserDetails() {
    this.dirtyCheckInit();

  }
  onSave() {
    if (this.changePswdForm.invalid) {
      this.translate.get('HOME.FORM_NAME_VALID', { form_name: 'Change Password' }).subscribe((res: string) => {
        this.toastr.error(res);
      });
    } else { 
      this.callUpdateProfile(); 
    }

  }

  callUpdateProfile() {
    let payload = {
      oldPassword: this.changePswdForm.value.oldPassword,
      newPassword: this.changePswdForm.value.newPassword
    }

    this.user.changePassword(this.username, payload).subscribe((res: any) => {
      if (res.responseCode == "ER0000") {
        this.translate.get('UPDATE_PROFILE.PASSWORD_SUCCESS_MSG').subscribe((res: string) => {
          this.toastr.success(res);
        });
        this.dirtyCheckInit();
        this.refreshParent.emit(null);
      }
    }, (error: any) => {
      this.translate.get('UPDATE_PROFILE.CHANGE_PASSWORD_ERROR').subscribe((res: string) => {
        this.toastr.error(res);
      });
    });
  }

}
