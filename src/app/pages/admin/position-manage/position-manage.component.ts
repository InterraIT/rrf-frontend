import { Component, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBreadCrumb } from 'src/app/models/breadcrumb.interface';
import { PositionDetailsComponent } from '../position-details/position-details.component';
import { PositionsService } from 'src/app/services/positions.service';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InterviewerListPopupComponent } from '../../recruiter/interviewer-list-popup/interviewer-list-popup.component';
import { CreateProfilePopupComponent } from 'src/app/shared/create-profile-popup/create-profile-popup.component';
import { PositionInterviewerTabComponent } from 'src/app/shared/position-interviewer-tab/position-interviewer-tab.component';
import { PositionProfileTabComponent } from 'src/app/shared/position-profile-tab/position-profile-tab.component';
import { ProfileListPopupComponent } from 'src/app/shared/profile-list-popup/profile-list-popup.component';

@Component({
  selector: 'app-position-manage',
  templateUrl: './position-manage.component.html',
  styleUrls: ['./position-manage.component.css']
})
export class PositionManageComponent implements OnInit {
  @ViewChild('Details') Details: ElementRef;
  @ViewChild('Interviewer') Interviewer: ElementRef;
  @ViewChild('Profiles') Profiles: ElementRef;
  @ViewChild('ros', { read: ViewContainerRef }) ros: ViewContainerRef;

  public breadcrumbs: Array<IBreadCrumb> = [];
  public positionID = '';
  public canViewInterviwer: boolean = false;
  public canViewProfile: boolean = false;
  public canViewOpenButton: boolean = false;
  public canViewCloseButton: boolean = false;
  public canViewDraftButton: boolean = false;
  public currentTab: string = 'Details'
  public postion: any;
  public canViewInterviwerbutton: boolean = false;
  public canViewProfilebutton: boolean = false;
  public canSelectProfilebutton: boolean = false;
  public postionStateID: any;
  private componentRef: ComponentRef<any>;

  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    windowClass: 'md-class'
  };
  constructor(
    private position: PositionsService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
  ) {
    this.breadcrumbs.push(new IBreadCrumb('Postions', '', false, false, []));
    this.breadcrumbs.push(new IBreadCrumb('Manage Position', '', false, false, []));
    this.positionID = this.activeRoute.snapshot.paramMap.get("positionID") as string;
  }
  ngOnInit(): void {
    this.getPositionDeails(this.positionID);
  }

  getPositionDeails(positionId: string) {
    this.position.getPositionDetailsById(positionId)
      .subscribe((res: any) => {
        this.postion = res.data;
        this.loadComponentDynamically(this.currentTab);
        this.canViewOpenButton = false;
        this.canViewCloseButton = false;
        this.canViewDraftButton = false;

        this.postionStateID = this.postion.currentState.stateID
        if (this.postion.currentState.stateID == AppConstants.STATES.POSITION.DRAFT.ID) {
          this.canViewOpenButton = true;
          this.canViewCloseButton = true;
        }

        if (this.postion.currentState.stateID == AppConstants.STATES.POSITION.OPEN.ID
          || this.postion.currentState.stateID == AppConstants.STATES.POSITION.OFFERED.ID) {
          this.canViewCloseButton = true;
        }

      });
  }

  refreshMe() {
    this.getPositionDeails(this.positionID);
    this.componentRef.instance.positionStateID = this.postionStateID;
  }

  onChangeTab(tabName: string) {
    if (this.currentTab == tabName) {
      return;
    }
    this.loadComponentDynamically(tabName)
    this.canViewCloseButton = false;
    this.canViewInterviwerbutton = false;
    this.canViewProfilebutton = false;
    this.canViewOpenButton = false;
    this.canSelectProfilebutton = false;
    if (this.postion.currentState.stateID == AppConstants.STATES.POSITION.DRAFT.ID) {
      this.canViewOpenButton = true;
    }

    if (this.postion.currentState.stateID == AppConstants.STATES.POSITION.DRAFT.ID
      || this.postionStateID == AppConstants.STATES.POSITION.OPEN.ID) {
      this.canViewCloseButton = true;
    }

    if (this.currentTab == 'Details') {
      setTimeout(() => {
        this.Interviewer.nativeElement.blur();
        this.Profiles.nativeElement.blur();
      }, 50);
    } else if (this.currentTab == 'Interviewer') {
      if (this.postionStateID == AppConstants.STATES.POSITION.DRAFT.ID
        || this.postionStateID == AppConstants.STATES.POSITION.OPEN.ID) {
        this.canViewInterviwerbutton = true;
      }

      setTimeout(() => {
        this.Details.nativeElement.blur();
        this.Profiles.nativeElement.blur();
      }, 50)
    } else if (this.currentTab == 'Profiles') {
      if (this.postionStateID == AppConstants.STATES.POSITION.DRAFT.ID
        || this.postionStateID == AppConstants.STATES.POSITION.OPEN.ID) {
        this.canViewProfilebutton = true;
        this.canSelectProfilebutton = true;
      }

      setTimeout(() => {
        this.Details.nativeElement.blur();
        this.Interviewer.nativeElement.blur();
      }, 50)
    }
  }

  loadComponentDynamically(tabName: string) {
    this.ros.clear();
    if (tabName == 'Details') {
      this.currentTab = 'Details'
      this.componentRef = this.ros.createComponent(PositionDetailsComponent);
      this.componentRef.instance.positionStateID = this.postionStateID;
      this.componentRef.instance.positionID= this.positionID;
    }
    else if (tabName == 'Interviewer') {
      this.currentTab = 'Interviewer'
      this.componentRef = this.ros.createComponent(PositionInterviewerTabComponent);
      this.componentRef.instance.positionStateID = this.postionStateID;
      this.componentRef.instance.positionID= this.positionID;
    }
    else if (tabName == 'Profiles') {
      this.currentTab = 'Profiles'
      this.componentRef = this.ros.createComponent(PositionProfileTabComponent);
      this.componentRef.instance.positionStateID = this.postionStateID;
      this.componentRef.instance.positionID= this.positionID;
    }

    this.componentRef.instance.refreshParent.subscribe((resp: any) => {
      this.refreshMe();
    });

  }

  fnOpenPositon() {
    let payLoad = {
      nextStateID: AppConstants.STATES.POSITION.OPEN.ID
    }

    this.position.changePositionState(this.positionID, payLoad).subscribe((res) => {
      this.getPositionDeails(this.positionID);
    });
  }

  fnClosePositon() {
    let payLoad = {
      nextStateID: AppConstants.STATES.POSITION.CLOSED.ID
    }
    this.position.changePositionState(this.positionID, payLoad).subscribe((res) => {
      this.getPositionDeails(this.positionID);
    });
  }
  fnDraftPositon() {
    let payLoad = {
      nextStateID: AppConstants.STATES.POSITION.DRAFT.ID
    }

    this.position.changePositionState(this.positionID, payLoad).subscribe((res) => {
      this.getPositionDeails(this.positionID);
    });
  }

  onOpenInterviewerList() {
    this.ngbModalOptions.windowClass = 'app-interviewer-list-popup';
    const modalRef = this.modalService.open(InterviewerListPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.positionID = this.positionID;
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.componentRef.instance.fetchAssignedInterviewers();
    });
  }

  onAddProfiles() {
    this.ngbModalOptions.windowClass = 'app-create-profile-popup';
    const modalRef: NgbModalRef = this.modalService.open(CreateProfilePopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.positionID = this.positionID;
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.componentRef.instance.getProfileslist();
    });
  }

  selectProfiles() {
    this.ngbModalOptions.windowClass = 'app-profile-list-popup';
    const modalRef: NgbModalRef = this.modalService.open(ProfileListPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.positionID = this.positionID;
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.componentRef.instance.getProfileslist();
    });
  }

}