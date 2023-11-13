import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { ConfirmPopupService } from 'src/app/services/confirm-popup.service';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { InterviewService } from 'src/app/services/interview.service';
import { LookupService } from 'src/app/services/lookup.service';
import { TokenManagerService } from 'src/app/services/token-manager.service';

@Component({
  selector: 'app-interview-feedback-popup',
  templateUrl: './interview-feedback-popup.component.html',
  styleUrls: ['./interview-feedback-popup.component.css']
})
export class InterviewFeedbackPopupComponent implements OnInit {
  @Output() refreshParent = new EventEmitter<any>();
  @Input() positionProfileMapID: string;
  @Input() positionID: string;
  @Input() profileID: string;
  @Input() interviewID: string;
  hiringRequirmentList: Array<any> = [];
  form = this.fb.group({
    hiringRequirements: this.fb.array([])
  });

  constructor(public activeModal: NgbActiveModal,
    public interviewService: InterviewService,
    private confirmPopup: ConfirmPopupService,
    private toastr: CustomToastrService,
    private lookupService: LookupService,
    private fb: FormBuilder) {


  }
  ngOnInit(): void {
    this.fetchHiringRequirments();
  }

  get hiringRequirements() {
    return this.form.controls["hiringRequirements"] as FormArray;
  }

  fetchHiringRequirments() {
    this.lookupService.getHiringRequirments().subscribe((resp: any) => {
      this.hiringRequirmentList = resp.data;
      for (let hiringRequirement of this.hiringRequirmentList) {
        this.addHiringRequirement(hiringRequirement);
      }
    });
  }

  addHiringRequirement(hiringRequirement: any) {
    const requirementForm = this.fb.group({
      requirementID: [hiringRequirement.requirementID],
      hiringElements: this.fb.array([])
    });
    this.hiringRequirements.push(requirementForm);

    for (let childRequirement of hiringRequirement.childElements) {
      this.addInitialChildRequirement(childRequirement, requirementForm);
    }
  }

  addInitialChildRequirement(requirementChild: any, requirementForm: any) {
    const childForm = this.fb.group({
      title: [requirementChild.title],
      rating: [''],
      distinguishingAspect: ['']
    });
    (requirementForm.controls.hiringElements as FormArray).push(childForm);
  }

  onAddNewChild(index: number) {
    let hiringRequirement = this.hiringRequirmentList[index];
    let childRequirement = {
      title: '',
      displaySeq: 1,
      mandatory: false
    };
    hiringRequirement.childElements.push(childRequirement);

    let requirementForm = this.hiringRequirements.at(index);
    this.addInitialChildRequirement(childRequirement, requirementForm);
  }
  removeElement(index: number, childIndex: number) {
    let requirementForm: any = this.hiringRequirements.at(index);
    (requirementForm.controls.hiringElements as FormArray).removeAt(childIndex);

    let hiringRequirement = this.hiringRequirmentList[index];
    hiringRequirement.childElements.splice(childIndex, 1);
  }

  onSelect() {
    const payload = {
      nextStateID: AppConstants.STATES.INTERVIEW.SELECTED.ID,
      feedback: this.form.value
    }
    let options = {
      title: `Are you sure, you want to <b>select</b> the candidate?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callSaveInterviewFeedback(payload);
      }
    });

  }
  onReject() {
    const payload = {
      nextStateID: AppConstants.STATES.INTERVIEW.REJECTED.ID,
      feedback: this.form.value
    }

    let options = {
      title: `Are you sure, you want to <b>reject</b> the candidate?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callSaveInterviewFeedback(payload);
      }
    });
  }

  onPutOnHold() {
    const payload = {
      nextStateID: AppConstants.STATES.INTERVIEW.ON_HOLD.ID,
      feedback: this.form.value
    }

    let options = {
      title: `Are you sure, you want to put the cadidate <b>on-hold</b>?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.callSaveInterviewFeedback(payload);
      }
    });
    
  }

  callSaveInterviewFeedback(payload:any){
    this.interviewService.saveInterviewFeedback(this.positionProfileMapID, this.interviewID, payload).subscribe((resp: any) => {
      this.toastr.success("Feedback sumitted successfully");
      this.refreshParent.emit(true);
      this.activeModal.close('Override click');
    }, (error: any) => {
      this.toastr.error(error.error.resposeMessage);
    });
  }


}
