import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateProfileDetailsComponent } from '../update-profile-details/update-profile-details.component';
import { UpdateProfilePasswordComponent } from '../update-profile-password/update-profile-password.component';
import { TokenManagerService } from 'src/app/services/token-manager.service';
import { UsersService } from 'src/app/services/users.service';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-profile-manage',
  templateUrl: './update-profile-manage.component.html',
  styleUrls: ['./update-profile-manage.component.css']
})
export class UpdateProfileManageComponent implements OnInit {
  @ViewChild('Details') Details: ElementRef;
  @ViewChild('Password') Password: ElementRef;
  @ViewChild('ros', { read: ViewContainerRef }) ros: ViewContainerRef;

  private cmpRef: any;
  public currentTab: string = 'Details';
  public inEditMode: boolean = false;
  public detailsEditMode: boolean = false;
  public onSelectedTab: any
  public userId: any = '';

  constructor(
    private resolver: ComponentFactoryResolver,
    private activeRoute: ActivatedRoute,
    public tokenService: TokenManagerService,
    private user: UsersService,
    private toastr: CustomToastrService,
  ) {
    this.userId = this.tokenService.currentUser.userID
  }
  ngOnInit(): void {
    this.getuserDetails(false);
  }

  getuserDetails(refreshParent: boolean) {
    if (this.currentTab == 'Details' || this.currentTab == 'Password') {
      this.inEditMode = false;
      if (!refreshParent) {
        setTimeout(() => {
          this.loadComponentDynamically(this.currentTab);
        }, 200);
      }
    } else {
      this.user.loggedInUserDetails(this.userId).subscribe((res: any) => {
        this.inEditMode = false;
        if (!refreshParent) {
          setTimeout(() => {
            this.loadComponentDynamically(this.currentTab);
          }, 200);
        }
      },
      )
    }

  }

  get isCancelButtonVisible(): boolean {
    if ((this.currentTab == 'Details' && (this.inEditMode == true || this.detailsEditMode == true))) {
      return true;
    }
    return false;
  }

  get isSaveButtonVisible(): boolean {
    if ((this.currentTab == 'Details' && (this.inEditMode == true || this.detailsEditMode == true))
      || (this.currentTab == 'Password')) {
      return true;
    }
    return false;
  }

  get isEditButtonVisible(): boolean {
    if ((this.currentTab == 'Details' && this.inEditMode == false && this.detailsEditMode == false)) {
      return true;
    } else {
      return false;
    }
  }

  onChangeTab(tabName: string) {
    if (this.currentTab == tabName) {
      return;
    }
    this.currentTab = tabName;
    this.loadComponentDynamically(tabName);
    if (this.currentTab !== 'Password') {
      this.inEditMode = false;
    } else {
      this.inEditMode = true;
    }
    if (this.currentTab == 'Details') {
      setTimeout(() => {
        this.Password.nativeElement.blur();
      }, 50);
    } else if (this.currentTab == 'Password') {
      setTimeout(() => {
        this.Details.nativeElement.blur();
      }, 50)
    }
  }

  loadComponentDynamically(tabName: string) {
    this.ros.clear();

    if (tabName == 'Details') {
      this.currentTab = 'Details'
      this.cmpRef = this.ros.createComponent(UpdateProfileDetailsComponent);
      this.cmpRef.instance.editMode = this.detailsEditMode;
      this.cmpRef.instance.refreshParent.subscribe((returnData: any) => {
        this.currentTab = 'Details';
        this.inEditMode = false;
        this.getuserDetails(true);
      });
    }
    else if (tabName == 'Password') {
      this.currentTab = 'Password'
      this.cmpRef = this.ros.createComponent(UpdateProfilePasswordComponent);
      this.cmpRef.instance.canEditWorkNotes = true;
      this.cmpRef.instance.refreshParent.subscribe((returnData: any) => {
        this.currentTab = 'Password';
        this.inEditMode = true;
        this.getuserDetails(true);
      });
    }
  }

  onCancel() {
    this.cmpRef.instance.onCancel();
    if (this.currentTab !== 'Password') {
      this.inEditMode = false;
    } else {
      this.inEditMode = true;
    }
  }

  onSave() {
    this.cmpRef.instance.onSave();
  }

  onEdit() {
    this.inEditMode = true;
    this.cmpRef.instance.onEdit();
  }


}
