import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProfileListChildComponent } from '../profile-list-child/profile-list-child.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-list-popup',
  templateUrl: './profile-list-popup.component.html',
  styleUrls: ['./profile-list-popup.component.css']
})
export class ProfileListPopupComponent implements OnInit {
  @Output() refreshParent = new EventEmitter<any>();
  @Input() positionID: string;
  
  public ProfileList: any = [];
  public tempAssociatedBusinessList = [];
  public slectedParticipantList = [];
  public totalNumberOfrecords: number = -1;
  public tempTotalNumberOfrecords: number = -1;
  public participantsSearchForm: FormGroup;
  private childRow: ComponentRef<ProfileListChildComponent>;

  

  constructor(public activeModal: NgbActiveModal,
    private profileService: ProfilesService,
    private _renderer: Renderer2,
    private compFactory: ComponentFactoryResolver,
    private viewRef: ViewContainerRef,
    private fb: FormBuilder){

      this.participantsSearchForm = this.fb.group({
        searchTxt: [''],
      });
  

  }

  ngOnInit(): void {
    this.getProfileList();
  }

  getProfileList(){
    this.profileService.getProfiles().subscribe((res:any)=>{
       this.ProfileList=res.data.dataList
       this.tempAssociatedBusinessList=[...this.ProfileList]
       this.tempTotalNumberOfrecords=this.tempAssociatedBusinessList.length;
    }, (error: any) => {
      this.ProfileList = [];
      this.tempAssociatedBusinessList = [];
      this.totalNumberOfrecords = this.ProfileList.length;
    });
  }

  performFilter() {
    let filterJson = this.participantsSearchForm.value;
    let filteredList = [];
    
    if (filterJson.searchTxt) {
      filteredList = this.tempAssociatedBusinessList.filter(x => {
        if (x.candidateFirstName?.toLowerCase().indexOf(filterJson.searchTxt?.toLowerCase()) > -1 ||
         x.keySkills?.toLowerCase().indexOf(filterJson.searchTxt?.toLowerCase()) > -1) {
          return x;
        }
      });
    } else {
      filteredList = [...this.tempAssociatedBusinessList]
    }

    this.ProfileList = [...filteredList];
    this.totalNumberOfrecords = this.ProfileList.length;
  }



  expandRow(devRefProfile: any, rowData: any) {
    var divRow = document.getElementById(devRefProfile);

    if ((divRow.children.length == 3)) {
      let factory = this.compFactory.resolveComponentFactory(ProfileListChildComponent);
      this.childRow = this.viewRef.createComponent(factory);
      this.childRow.instance.participantBusinessChildData = rowData;

      const childDiv = this._renderer.createElement('div');
      childDiv.appendChild(this.childRow.location.nativeElement)
      this._renderer.addClass(childDiv, 'hs-participant-data');

      divRow.appendChild(childDiv)
      this._renderer.addClass(divRow, 'shown');
    } else {
      divRow.removeChild(divRow.lastChild);
      this._renderer.removeClass(divRow, 'shown');
    }
  }


  onSelectBusiness(event: any, userlist: any) {
    const index = this.slectedParticipantList.findIndex((obj) => obj.displayID === userlist.displayID);
    if (event.target.checked) {
      userlist.selected = true;
      this.slectedParticipantList.push(userlist);
    } else {
      userlist.selected = false;
      this.slectedParticipantList.splice(index, 1);
    }
  }

  onSearch(event: any) {
    //this.slectedParticipantList = [];
    if (!(this.participantsSearchForm.value.searchTxt.trim().length == 0 || this.participantsSearchForm.value.searchTxt.trim().length > 1)) {
      return;
    }
    this.performFilter();
  }

  onSubmit() {
    let participantuser = this.slectedParticipantList
    let data={
      "profiles":participantuser
    }
    this.profileService.assignMultipleProfiles(this.positionID,data).subscribe((res:any)=>{
      this.activeModal.close('Override click');
      this.refreshParent.emit(this.slectedParticipantList);
    });
  }

}
