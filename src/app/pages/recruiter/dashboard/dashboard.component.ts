import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { PositionsService } from 'src/app/services/positions.service';
import { TokenManagerService } from 'src/app/services/token-manager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public pageSize = 9999;
  sortJson = {};
  sortDirection = 1;
  searchByFields = [];
  public searchForm: FormGroup;
  public userID = '';
  public dataListObs: any = [];
  public openStateCount:any=0;
  public hiredStateCount:any=0;
  public offeredStateCount:any=0;
  public draftStateCount:any=0;
  public stateList = [];

  constructor(
    private positions: PositionsService,
    private router: Router,
    private tokenManager: TokenManagerService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {

    this.searchForm = this.fb.group({
      searchTxt: [''],
    });
  }
  ngOnInit(): void {
    this.subjectInit();
  }

  subjectInit() {
    let globalSearchPattern = this.searchForm.value.searchTxt;
    this.userID = this.tokenManager.currentUser.userID;
    this.positions.getMyAssignedPositions(this.userID,1,this.pageSize,this.searchByFields,this.sortJson,globalSearchPattern).subscribe((res: any) => {
      this.dataListObs=res.data.dataList.map((res:any)=>res.currentState.stateName);
      this.draftStateCount=this.dataListObs.filter((x:any)=>x=="Draft").length;
      this.openStateCount=this.dataListObs.filter((x:any)=>x=="Open").length;
      this.offeredStateCount=this.dataListObs.filter((x:any)=>x=="Offered").length;
      this.hiredStateCount=this.dataListObs.filter((x:any)=>x=="Hired").length;
    })

    this.positions.getPositionStateList().subscribe((res:any) => {
      let regex = /Open|Draft|Offered|Hired/
      this.stateList = res.data.map((res)=>res.stateName).filter(x => regex.test(x))
     })
  }

  sentJobOfferCallback(state: any): void {
    this.router.navigate([`../positions`], {
      relativeTo: this.activeRoute,
      queryParams: { jobStatus: state }
    });
  }
}
