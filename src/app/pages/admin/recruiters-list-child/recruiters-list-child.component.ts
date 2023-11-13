import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruiters-list-child',
  templateUrl: './recruiters-list-child.component.html',
  styleUrls: ['./recruiters-list-child.component.css']
})
export class RecruitersListChildComponent implements OnInit {
  @Input() participantBusinessChildData: any;
  constructor() {
  }
  ngOnInit(): void {


  }

  getUserType(id: number) {
    const userType = {
      RecruiterAdmin: 0,
      InternalRecruiter: 1,
      ExternalRecruiter: 2,
      Interviewer: 3
    };
    return Object.keys(userType).find((key:any)=> userType[key] === id)
  }

}
