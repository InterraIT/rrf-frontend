import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { PositionsService } from 'src/app/services/positions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public recruiters = 0;
  public interviewers = 0;
  public positions = 0;
   public stateSelected = '';
  public draftPositions = 0;
  searchFieldValueOutputDelay: number;
  public dataListObs:any=[];
  sortJson = {};
  searchByFields = [];
  public openStateCount:any=0;
  public searchForm: FormGroup;
  public draftStateCount:any=0;
  public closedStateCount:any=0;
  public offeredStateCount:any=0;
  public stateList = [];


  constructor(
    private userServices: UsersService,
    private position: PositionsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {

      this.searchForm = this.fb.group({
        searchTxt: [''],
      });
  }
  ngOnInit(): void {
    this.getRecrutiers();
    this.getInterViewers();
    this.subjectInit();
  }

  subjectInit() {
    let globalSearchPattern = this.searchForm.value.searchTxt;
   this.position.getPositionList(1,AppConstants.MAX_PAGE,this.searchByFields,this.sortJson,globalSearchPattern).subscribe((res:any)=>{
    this.dataListObs=res.data.dataList.map((res)=>res.currentState.stateName);
    this.openStateCount=this.dataListObs.filter(x=>x=="Open").length
    this.draftStateCount=this.dataListObs.filter(x=>x=="Draft").length
    this.closedStateCount=this.dataListObs.filter(x=>x=="Closed").length
    this.offeredStateCount=this.dataListObs.filter(x=>x=="Offered").length
   })
   this.position.getPositionStateList().subscribe((res:any) => {
    let regex = /Open|Draft|Offered|Closed/
    this.stateList = res.data.map((res)=>res.stateName).filter(x => regex.test(x))
   })
   
  
  }

  getRecrutiers() {
    this.userServices.getRecruiterList().subscribe((res: any) => {
      this.recruiters = res.data.hitCount;
    })
  }

  getInterViewers() {
    this.userServices.getInterviewerList().subscribe((res: any) => {
      this.interviewers = res.data.hitCount;
    })
  }

  sentJobOfferCallback(state: any): void {
    this.router.navigate([`../positions`], {
      relativeTo: this.activeRoute,
      queryParams: { jobStatus: state }
    });
  }
  navigateToUser() {
    this.router.navigate([`../user`], { relativeTo: this.activeRoute });
  }

}
