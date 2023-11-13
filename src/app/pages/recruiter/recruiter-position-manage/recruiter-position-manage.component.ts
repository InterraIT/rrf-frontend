import { Component, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { IBreadCrumb } from 'src/app/models/breadcrumb.interface';
import { PositionsService } from 'src/app/services/positions.service';
import { RecruiterPositionDetailsComponent } from '../recruiter-position-details/recruiter-position-details.component';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InterviewerListPopupComponent } from '../interviewer-list-popup/interviewer-list-popup.component';
import { PositionProfileTabComponent } from 'src/app/shared/position-profile-tab/position-profile-tab.component';
import { PositionInterviewerTabComponent } from 'src/app/shared/position-interviewer-tab/position-interviewer-tab.component';
import { CreateProfilePopupComponent } from 'src/app/shared/create-profile-popup/create-profile-popup.component';
import { ProfileListPopupComponent } from 'src/app/shared/profile-list-popup/profile-list-popup.component';

@Component({
  selector: 'app-recruiter-position-manage',
  templateUrl: './recruiter-position-manage.component.html',
  styleUrls: ['./recruiter-position-manage.component.css']
})
export class RecruiterPositionManageComponent implements OnInit {
  @ViewChild('Details') Details: ElementRef;
  @ViewChild('Interviewer') Interviewer: ElementRef;
  @ViewChild('Profiles') Profiles: ElementRef;
  @ViewChild('ros', { read: ViewContainerRef }) ros: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public breadcrumbs: Array<IBreadCrumb> = [];
  public positionID = '';
  public canViewInterviwer: boolean = false;
  public canViewProfile: boolean = false;
  public canSelectProfilebutton: boolean = false;

  public canViewAddInterviewerBtn: boolean = false;
  public canViewAddProfileBtn: boolean = false;

  public currentTab: string = 'Details'
  public postion: any;

  public postionStateID: string;

  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    windowClass: 'md-class'
  };

  constructor(private position: PositionsService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.breadcrumbs.push(new IBreadCrumb('Postions', '', false, false, []));
    this.breadcrumbs.push(new IBreadCrumb('Recruiter Position', '', false, false, []));
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

        this.canViewAddInterviewerBtn = false;
        this.canViewAddProfileBtn = false;
        this.canSelectProfilebutton = false;
        this.postionStateID = this.postion.currentState.stateID;
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
    if (this.currentTab == 'Details') {
      this.canViewAddInterviewerBtn = false
      this.canViewAddProfileBtn = false
      this.canSelectProfilebutton = false;

      setTimeout(() => {
        this.Interviewer.nativeElement.blur();
        this.Profiles.nativeElement.blur();
      }, 50)
    } else if (this.currentTab == 'Interviewer') {
      if (this.postionStateID == AppConstants.STATES.POSITION.OPEN.ID) {
        this.canViewAddInterviewerBtn = true;
        this.canViewAddProfileBtn = false
        this.canSelectProfilebutton = false;
      }
      setTimeout(() => {
        this.Details.nativeElement.blur();
        this.Profiles.nativeElement.blur();
      }, 50)
    } else if (this.currentTab == 'Profiles') {
      if (this.postionStateID == AppConstants.STATES.POSITION.OPEN.ID) {
        this.canViewAddInterviewerBtn = false;
        this.canViewAddProfileBtn = true
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
      this.componentRef = this.ros.createComponent(RecruiterPositionDetailsComponent);
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
    modalRef.componentInstance.inputObjectID = this.positionID;
    modalRef.componentInstance.inputObjectType = "PROFILE";
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
