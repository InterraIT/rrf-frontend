import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/helpers/app-contants.helper';

@Component({
  selector: 'app-my-interviews-manage',
  templateUrl: './my-interviews-manage.component.html',
  styleUrls: ['./my-interviews-manage.component.css']
})
export class MyInterviewsManageComponent implements OnInit {
  dataType: string=AppConstants.STATES.INTERVIEW.ALL.ID;
  constructor(){

  }
  ngOnInit(): void {
   
  }
}
