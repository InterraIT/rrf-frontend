import { Component, Input, OnInit } from '@angular/core';
import { LookupService } from 'src/app/services/lookup.service';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-profile-list-child',
  templateUrl: './profile-list-child.component.html',
  styleUrls: ['./profile-list-child.component.css']
})
export class ProfileListChildComponent implements OnInit{
  @Input() participantBusinessChildData: any;
  constructor(private lookup: LookupService,){

  }

  ngOnInit(): void {
  }

  onDownloadResume(currentResume:any):void{
    this.lookup.downloadFile(currentResume.docURL,currentResume.originalFileName);
  }

}
