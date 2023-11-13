import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScheduleMeetingPopupComponent } from '../schedule-meeting-popup/schedule-meeting-popup.component';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { ProfilesService } from 'src/app/services/profiles.service';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { ConfirmPopupService } from 'src/app/services/confirm-popup.service';
import { ViewInterviewFeedbackPopupComponent } from '../view-interview-feedback-popup/view-interview-feedback-popup.component';
import { InterviewService } from 'src/app/services/interview.service';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-position-profile-child',
  templateUrl: './position-profile-child.component.html',
  styleUrls: ['./position-profile-child.component.css']
})
export class PositionProfileChildComponent {
  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    windowClass: 'md-class'
  };

  @Output() refreshParent = new EventEmitter<any>();
  @Input() positionStateID: string;
  @Input() positionProfileMapID: string;
  @Input() positionID: string;
  @Input() profileID: any;

  childData: any;
  public canViewButtonPanel: boolean = true;
  public canSeeShortListCvBtn: boolean = false;
  public canSeeRejectListCvBtn: boolean = false;
  public canSeeScheduleMeetingBtn: boolean = false;
  public canSeeShortListBtn: boolean = false;
  public canSeeBackedupBtn: boolean = false;
  public canSeeRejectedBtn: boolean = false;
  public canSeeOfferBtn: boolean = false;
  public canSeeAcceptBtn: boolean = false;
  public canSeeDeclineBtn: boolean = false;
  public canSeeWithdrawBtn: boolean = false;
  public canSeeJoinedBtn: boolean = false;

  constructor(private profileService: ProfilesService,
    private toastr: CustomToastrService,
    private modalService: NgbModal,
    private confirmPopup: ConfirmPopupService,
    private interviewService: InterviewService,
    private lookup: LookupService) {

  }
  ngOnInit(): void {
    this.fetchProfileDetails();
  }

  fetchProfileDetails() {
    this.profileService.getProfileDetailsInPosition(this.positionID, this.profileID).subscribe((res: any) => {
      this.childData = res.data;
      console.log("Profile Details::", this.childData);
      
      this.canViewButtonPanel = true;

      this.canSeeShortListCvBtn = false;
      this.canSeeRejectListCvBtn = false;
      this.canSeeScheduleMeetingBtn = false;
      this.canSeeShortListBtn = false;
      this.canSeeBackedupBtn = false;
      this.canSeeRejectedBtn = false;
      this.canSeeOfferBtn = false;
      this.canSeeAcceptBtn = false;
      this.canSeeDeclineBtn = false;
      this.canSeeWithdrawBtn = false;
      this.canSeeJoinedBtn = false;

      if (this.childData.currentState.stateID == AppConstants.STATES.PROFILE.UPLOADED.ID) {
        this.canSeeShortListCvBtn = true;
        this.canSeeRejectListCvBtn = true;
      }

      if (this.childData.currentState.stateID == AppConstants.STATES.PROFILE.IN_PROGRESS.ID) {
        this.canSeeScheduleMeetingBtn = true;
        this.canSeeShortListBtn = true;
        this.canSeeRejectedBtn = true;
        this.canSeeBackedupBtn = true;
      }

      if (this.childData.currentState.stateID == AppConstants.STATES.PROFILE.SHORT_LISTED.ID) {
        this.canSeeOfferBtn = true;
      }

      if (this.childData.currentState.stateID == AppConstants.STATES.PROFILE.BACKUP.ID) {
        this.canSeeShortListBtn = true;
      }

      if (this.childData.currentState.stateID == AppConstants.STATES.PROFILE.OFFERED.ID) {
        this.canSeeAcceptBtn = true;
        this.canSeeDeclineBtn = true;
      }

      if (this.childData.currentState.stateID == AppConstants.STATES.PROFILE.OFFERED.ID
        || this.childData.currentState.stateID == AppConstants.STATES.PROFILE.ACCEPTED.ID
        || this.childData.currentState.stateID == AppConstants.STATES.PROFILE.DECLINED.ID) {
        this.canSeeWithdrawBtn = true;
      }

      if (this.childData.currentState.stateID == AppConstants.STATES.PROFILE.ACCEPTED.ID) {
        this.canSeeJoinedBtn = true;
      }

      if (this.positionStateID == AppConstants.STATES.POSITION.OFFERED.ID) {

        if (!(this.childData.currentState.stateID == AppConstants.STATES.PROFILE.OFFERED.ID
          || this.childData.currentState.stateID == AppConstants.STATES.PROFILE.ACCEPTED.ID)) {
          this.canViewButtonPanel = false;
        }
      }

      if (this.positionStateID == AppConstants.STATES.POSITION.HIRED.ID) {
        this.canViewButtonPanel = false;
      }

    });
  }

  onProgress() {
    let payLoad = {
      nextStateID: AppConstants.STATES.PROFILE.IN_PROGRESS.ID,
      metadata: {
        comment: "This profile is short-listed"
      }
    }
    this.profileService.changeProfileStateInPosition(this.positionID, this.profileID, payLoad).subscribe((res: any) => {
      this.toastr.success("Profile short listed successfully");
      this.refreshParent.emit(true);
    }, (error: any) => {
      this.toastr.error(error.error.resposeMessage);
    });
  }

  onRejectProfile() {
    let payLoad = {
      nextStateID: AppConstants.STATES.PROFILE.PROFILE_REJECTED.ID,
      metadata: {
        comment: "This profile is rejected"
      }
    }

    this.callStateChange(payLoad, "Profile short listed successfully");
  }

  onShotList() {
    let payload = {
      nextStateID: AppConstants.STATES.PROFILE.SHORT_LISTED.ID,
      metadata: {
        comment: "This profile is short listed"
      }
    }

    let options = {
      title: `Are you sure, you want to short list the profile?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callStateChange(payload, 'Successfully short listed');
      }
    });
  }

  onBackup() {
    let payload = {
      nextStateID: AppConstants.STATES.PROFILE.BACKUP.ID,
      metadata: {
        comment: "This profile is backed up"
      }
    }

    let options = {
      title: `Are you sure, you want to backup the profile?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callStateChange(payload, 'Successfully backed up');
      }
    });
  }

  onReject() {
    let payload = {
      nextStateID: AppConstants.STATES.PROFILE.REJECTED.ID,
      metadata: {
        comment: "This profile is rejected"
      }
    }

    let options = {
      title: `Are you sure, you want to reject the profile?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callStateChange(payload, 'Successfully short listed');
      }
    });
  }

  onOffer() {
    let payload = {
      nextStateID: AppConstants.STATES.PROFILE.OFFERED.ID,
      metadata: {
        comment: "This profile is has been offered"
      }
    }

    let options = {
      title: `Are you sure, you want to offer the job to the candidate?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callStateChange(payload, 'Successfully offered');
      }
    });
  }

  onOfferAccepted() {
    let payload = {
      nextStateID: AppConstants.STATES.PROFILE.ACCEPTED.ID,
      metadata: {
        comment: "Offer accepted successfully"
      }
    }

    let options = {
      title: `Are you sure, candidate accepted the offer?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callStateChange(payload, 'Offer accepted successfully');
      }
    });
  }

  onOfferDeclined() {
    let payload = {
      nextStateID: AppConstants.STATES.PROFILE.DECLINED.ID,
      metadata: {
        comment: "Offer declined successfully"
      }
    }

    let options = {
      title: `Are you sure, candidate declined the offer?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callStateChange(payload, 'Offer declined successfully');
      }
    });
  }

  onOfferWithdrawn() {
    let payload = {
      nextStateID: AppConstants.STATES.PROFILE.WITHDRAWN.ID,
      metadata: {
        comment: "Offer withdrawn successfully"
      }
    }

    let options = {
      title: `Are you sure, you want to withdraw offer?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callStateChange(payload, 'Offer withdrawn successfully');
      }
    });
  }

  onCandidateJoined() {
    let payload = {
      nextStateID: AppConstants.STATES.PROFILE.JOINED.ID,
      metadata: {
        comment: "Candidate Joined"
      }
    }

    let options = {
      title: `Are you sure, candidate joined?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callStateChange(payload, 'Successfully saved');
      }
    });
  }

  onSchduleMeeting() {
    this.ngbModalOptions.windowClass = 'app-create-profile-popup';
    const modalRef: NgbModalRef = this.modalService.open(ScheduleMeetingPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.positionID = this.positionID;
    modalRef.componentInstance.profileID = this.profileID;
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.fetchProfileDetails();
    });
  }

  callStateChange(payload: any, successMessage: string) {
    this.profileService.changeProfileStateInPosition(this.positionID, this.profileID, payload).subscribe((res: any) => {
      this.toastr.success(successMessage);
      this.refreshParent.emit({
        stateID: payload.nextStateID,
        completedSuccessfully: true
      });

    }, (error: any) => {
      this.toastr.error(error.error.resposeMessage);
    });
  }

  _canViewInterviewFeedback(interview: any): boolean {
    if (!(interview.currentState.stateID == AppConstants.STATES.INTERVIEW.SCHEDULED.ID
      || interview.currentState.stateID == AppConstants.STATES.INTERVIEW.CANCELLED.ID)) {
      return true;
    }
    return false;
  }

  _canCanCancelInterview(interview: any): boolean {
    if (interview.currentState.stateID == AppConstants.STATES.INTERVIEW.SCHEDULED.ID) {
      return true;
    }
    return false;
  }

  onOpenFeedbackPopup(interview: any) {
    this.ngbModalOptions.windowClass = 'app-interview-feedback-popup';
    const modalRef = this.modalService.open(ViewInterviewFeedbackPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.positionProfileMapID = this.childData.positionProfileMapID;
    modalRef.componentInstance.positionID = this.positionID;
    modalRef.componentInstance.profileID = this.profileID;
    modalRef.componentInstance.interviewID = interview.interviewID;
  }

  onCancelInterview(interview: any) {
    let options = {
      title: `Are you sure, you want to cancel the meeting?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };
    let mapID = this.childData.positionProfileMapID;
    let interviewID = interview.interviewID;

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callCancellInterview(mapID, interviewID);
      }
    });
  }

  callCancellInterview(mapID: string, interviewID: string) {
    this.interviewService.cancelInterview(mapID, interviewID).subscribe((res: any) => {
      this.toastr.success("Interview cancelled successfully");
      this.fetchProfileDetails();
    }, (error: any) => {
      this.toastr.error(error.error.resposeMessage);
    });
  }

  onDownloadResume(currentResume:any):void{
    this.lookup.downloadFile(currentResume.docURL,currentResume.originalFileName);
  }
}
