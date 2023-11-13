import { ChangeDetectorRef, Component,  ComponentRef,  EventEmitter,  Input,  OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PositionsService } from 'src/app/services/positions.service';
import { RecruitersListPopupComponent } from '../recruiters-list-popup/recruiters-list-popup.component';

@Component({
  selector: 'app-position-details',
  templateUrl: './position-details.component.html',
  styleUrls: ['./position-details.component.css']
})
export class PositionDetailsComponent implements OnInit {
  @Output() refreshParent = new EventEmitter<any>();
  @Input() positionStateID: string;
  @Input() positionID:string;

  public dataListObs: any = [];
  public recruiterList: any = [];
  public componentRef: ComponentRef<any>;
  public getpositionDetail = this.fb.group({
    jobTitle:  [''],
    departmentName:[''],
    projectName: [''],
    clientName: [''],
    startDate:  [''],
    endDate: [''],
    salaryRange: [''],
    rrfYear: [''],
    createdTimeStamp: [''],
    rrfNumber: [''],
  });

  public selectedRecruiter: any = [];
  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    windowClass: 'md-class'
  };

  constructor(private position: PositionsService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder) {
  }
  get jobTitle() { return this.getpositionDetail.get("jobTitle"); }
  get departmentName() { return this.getpositionDetail.get("departmentName"); }
  get projectName() { return this.getpositionDetail.get("projectName"); }
  get clientName() { return this.getpositionDetail.get("clientName"); }
  get startDate() { return this.getpositionDetail.get("startDate"); }
  get endDate() { return this.getpositionDetail.get("endDate"); }
  get salaryRange() { return this.getpositionDetail.get("salaryRange"); }
  get rrfYear() { return this.getpositionDetail.get("rrfYear"); }
  get createdTimeStamp() { return this.getpositionDetail.get("createdTimeStamp"); }
  get rrfNumber() { return this.getpositionDetail.get("rrfNumber"); }

  ngOnInit(): void {
    this.getPositionDetailsById(this.positionID);
  }

  getPositionDetailsById(positionId) {
    this.dataListObs = this.position.getPositionDetailsById(positionId)
      .subscribe((res: any) => {
        let data = res.data;
        data.recruiters.map((res: any) => {
          this.recruiterList.push(res);
        });

        this.jobTitle?.setValue(data.jobTitle);
        this.departmentName?.setValue(data.departmentName);
        this.projectName?.setValue(data.projectName);
        this.clientName?.setValue(data.clientName);
        this.startDate?.setValue(data.startDate);
        this.endDate?.setValue(data.endDate);
        this.salaryRange?.setValue(data.salaryRange);
        this.rrfYear?.setValue(data.rrfYear);
        this.createdTimeStamp?.setValue(data.createdTimeStamp);
        this.rrfNumber?.setValue(data.rrfNumber);
        
      });

  }

  onOpenRecruiterList() {
    this.ngbModalOptions.windowClass = 'app-recruiters-list-popup';
    const modalRef = this.modalService.open(RecruitersListPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.positionID = this.positionID;
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.getPositionDetailsById(this.positionID);
      this.refreshParent.emit(true);
    });
  }

  deleteRecruiter(userid: any) {
    this.position.removeRecruiter(this.positionID, userid).subscribe((res: any) => {
      let index = this.recruiterList.indexOf(userid)
      this.recruiterList.splice(index, 1)
      this.getPositionDetailsById(this.positionID);
      this.refreshParent.emit(true);
    })
  }
}
