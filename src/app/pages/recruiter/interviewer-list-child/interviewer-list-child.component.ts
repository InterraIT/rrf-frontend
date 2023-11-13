import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-interviewer-list-child',
  templateUrl: './interviewer-list-child.component.html',
  styleUrls: ['./interviewer-list-child.component.css']
})
export class InterviewerListChildComponent implements OnInit{

  @Input() participantBusinessChildData: any;
  constructor() {
  }
  ngOnInit(): void {


  }


}
