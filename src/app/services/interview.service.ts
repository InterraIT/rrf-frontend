import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private http: HttpClient) { }
  
  scheduleMeeting(positionID:string,profileID:string,payload:any){
    const url = `${environment.API}/interview/scheduleInterview/${positionID}/${profileID}`;
    return this.http.post(url, JSON.stringify(payload));
  }

  cancelInterview(positionProfileMapID:string,interviewID:string){
    const url = `${environment.API}/interview/cancelInterview/${positionProfileMapID}/${interviewID}`;
    return this.http.post(url, JSON.stringify({}));
  }
  
  getMyInterviews(type:string){
    const url = `${environment.API}/interview/getMyInterviews/${type}`;
    return this.http.get(url);
  }

  saveInterviewFeedback(positionProfileMapID:string,interviewID:string,payload:any){
    const url = `${environment.API}/interview/saveInterviewFeedback/${positionProfileMapID}/${interviewID}`;
    return this.http.post(url, JSON.stringify(payload));
  }

  fetchInterviewFeedback(positionProfileMapID:string,interviewID:string){
    const url = `${environment.API}/interview/getInterviewFeedback/${positionProfileMapID}/${interviewID}`;
    return this.http.get(url);
  }

  
}
