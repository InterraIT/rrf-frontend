import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { InterviewService } from 'src/app/services/interview.service';
import { PositionsService } from 'src/app/services/positions.service';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-schedule-meeting-popup',
  templateUrl: './schedule-meeting-popup.component.html',
  styleUrls: ['./schedule-meeting-popup.component.css']
})
export class ScheduleMeetingPopupComponent implements OnInit {
  @Output() refreshParent = new EventEmitter<any>();
  @Input() positionID: string;
  @Input() profileID: string;
  public roundList: Array<any> = [];
  public interviewerList: Array<any> = [];
  public scheduleForm: FormGroup;
  public bsConfigJobStartDate = {
    isAnimated: true,
    dateInputFormat: 'DD/MM/YYYY',
    showWeekNumbers: false,
    customTodayClass: 'custom-today-class'
  }

  constructor(public activeModal: NgbActiveModal,
    private toastr: CustomToastrService,
    private positionService: PositionsService,
    private interviewService: InterviewService,
    private fb: FormBuilder,
    private datePipe: DatePipe) {
    this.roundList.push({ name: "Round 1" });
    this.roundList.push({ name: "Round 2" });
    this.roundList.push({ name: "Round 3" });
    this.roundList.push({ name: "Round 4" });
    this.roundList.push({ name: "Round 5" });

    this.scheduleForm = this.fb.group({
      interviewers: new FormArray([]),
      interviewRound: [],
      interviewDate: [null],
      interviewStartHour: [],
      interviewStartMinute: [],
      interviewEndHour: [],
      interviewEndMinute: []
    });
  }

  setDateConfig() {
    let jobStartDate = new Date().getTime();
    if (jobStartDate == 0) {
      this.bsConfigJobStartDate.customTodayClass = 'custom-today-class';
    } else {
      this.bsConfigJobStartDate.customTodayClass = '';
    }
  }

  onShowPicker(event: any) {
    const dayHoverHandler = event.dayHoverHandler;
    const hoverWrapper = ($event) => {
      const cell = $event;
      cell.isHovered = false;
      return dayHoverHandler($event);
    };
    event.dayHoverHandler = hoverWrapper;
  }

  fetchAssignedInterviewers() {
    this.interviewerList = [];
    this.positionService.getAssignedInterviewer(this.positionID).subscribe((res: any) => {
      this.interviewerList = res.data.dataList;
      if (this.interviewerList.length > 0) {
        this.interviewRound.setValue(this.roundList[0].name);
      }
    })
  }


  get interviewRound() { return this.scheduleForm.get("interviewRound"); }
  get interviewDate() { return this.scheduleForm.get("interviewDate"); }
  get interviewStartHour() { return this.scheduleForm.get("interviewStartHour"); }
  get interviewStartMinute() { return this.scheduleForm.get("interviewStartMinute"); }
  get interviewEndHour() { return this.scheduleForm.get("interviewEndHour"); }
  get interviewEndMinute() { return this.scheduleForm.get("interviewEndMinute"); }

  ngOnInit(): void {
    this.fetchAssignedInterviewers();

  }

  onCheckChange(event: any) {
    const formArray: FormArray = this.scheduleForm.get('interviewers') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
        }
        i++;
      });
    }
  }

  onSchedule() {
    let payload = { ...this.scheduleForm.value };
    if(payload.interviewers.length<=0){
      this.toastr.error("Please select at least one interviewer");
      return;
    }

    payload.interviewDate = this.datePipe.transform(payload.interviewDate, "yyyy-MM-dd");
    let startHourStr = "";
    let startMinuteStr = "";

    let endHourStr = "";
    let endMinuteStr = "";

    if (parseInt(payload.interviewStartHour) > 9) {
      startHourStr = payload.interviewStartHour;
    } else {
      startHourStr = "0" + payload.interviewStartHour;
    }

    if (parseInt(payload.interviewStartMinute) > 9) {
      startMinuteStr = payload.interviewStartMinute;
    } else {
      startMinuteStr = "0" + payload.interviewStartMinute;
    }

    if (parseInt(payload.interviewEndHour) > 9) {
      endHourStr = payload.interviewEndHour;
    } else {
      endHourStr = "0" + payload.interviewEndHour;
    }

    if (parseInt(payload.interviewEndMinute) > 9) {
      endMinuteStr = payload.interviewEndMinute;
    } else {
      endMinuteStr = "0" + payload.interviewEndMinute;
    }

    payload.interviewStartTime = startHourStr + ":" + startMinuteStr;
    payload.interviewEndTime = endHourStr + ":" + endMinuteStr;

    delete payload.interviewStartHour;
    delete payload.interviewStartMinute;

    delete payload.interviewEndHour;
    delete payload.interviewEndMinute;
    
    console.log("ProfileID::",this.profileID);
    this.interviewService.scheduleMeeting(this.positionID,this.profileID, payload).subscribe({
      next: (res: any) => {
        this.toastr.success("Meeting scheduled successfully");
        this.refreshParent.emit(true);
        this.activeModal.close('Override click');
      },
      error:(error: any)=>{
        this.toastr.error(error.error.resposeMessage);
      }
    })

  }
}
