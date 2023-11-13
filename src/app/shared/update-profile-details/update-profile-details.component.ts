import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ConfirmPopupService } from 'src/app/services/confirm-popup.service';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { TokenManagerService } from 'src/app/services/token-manager.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-profile-details',
  templateUrl: './update-profile-details.component.html',
  styleUrls: ['./update-profile-details.component.css'],
})
export class UpdateProfileDetailsComponent implements OnInit {
  @Output() refreshParent = new EventEmitter<any>();
  @Input() public editMode: boolean;

  public detailsForm: FormGroup;
  public isFormLoaded: boolean = false;
  public userId: any = '';
  public userName: any = '';
  public dataListObs: any = [];
  private confirmOptions = {
    title: '',
  };

  private userOldMail: String;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    public tokenService: TokenManagerService,
    public user: UsersService,
    private toastr: CustomToastrService,
    private confirmPopup: ConfirmPopupService
  ) {
    this.detailsForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.maxLength(100)],
      ],
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.userId = this.tokenService.currentUser.userID;
    this.userName = this.tokenService.currentUser.userName;
  }

  get username() {
    return this.detailsForm.get('username');
  }
  get firstName() {
    return this.detailsForm.get('firstName');
  }
  get lastName() {
    return this.detailsForm.get('lastName');
  }

  ngOnInit(): void {
    this.populateProfileDetails();
  }

  populateProfileDetails() {
    this.user.loggedInUserDetails(this.userId).subscribe((res: any) => {
      let data = res.data[0];
      this.username?.setValue(data.username);
      this.firstName?.setValue(data?.firstName);
      this.lastName?.setValue(data?.lastName);
      this.userOldMail = data.username;
    });

    if (this.editMode) {
      this.detailsForm.enable();
      this.detailsForm.markAsUntouched();
    } else {
      this.detailsForm.disable();
      this.detailsForm.markAsUntouched();
    }
  }

  onEdit() {
    this.editMode = true;
    this.detailsForm.enable();
    this.detailsForm.markAsUntouched();
  }

  onCancel() {
    this.editMode = false;
    this.populateProfileDetails();
  }

  onSave() {
    if (this.detailsForm.invalid) {
      this.detailsForm.markAllAsTouched();
      this.translate.get('HOME.FORM_NAME_VALID').subscribe((res: string) => {
        this.toastr.error(res);
      });
    } else {
      let payload = {
        firstName: this.detailsForm.value.firstName,
        lastName: this.detailsForm.value.lastName,
      };
      this.user.userMeUpdate(this.userName, payload).subscribe((res: any) => {

        let name = res.data.firstName +" "+res.data.lastName;
      
        this.user.fullName.next(name)
        if(res.resposeCode == "ER0000") {
          
          this.translate.get('UPDATE_PROFILE.UPDATE_SUCCESS_MSG').subscribe((res: string) => {
            this.toastr.success(res);
          });
          setTimeout(() => {
            this.tokenService.clearCache();
            let user = this.tokenService.currentUser
            this.tokenService.getLoggedInfo.emit(user);
            this.editMode = false;
            this.refreshParent.emit(null);
          }, 50);
        }
      });      
    }
  }
}
