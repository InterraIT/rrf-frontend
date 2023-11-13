import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userId='';
  myBehaviorUpdate = new BehaviorSubject<boolean>(false);
  myBehaviorSave=new BehaviorSubject<boolean>(false);
  fullName = new Subject<string>()

  constructor(private http: HttpClient) { }

  getUserList(userId:any,page: number, pageSize: number, sortobj: any,globalSearchPattern: string) {
    const url = `${environment.API}/user/getUserList/${userId}?page=${page}&pageSize=${pageSize}&sortField=${JSON.stringify(sortobj)}&search=${globalSearchPattern}`;
    return this.http.get(url);
  }

  getRecruiterList() {
    const url = `${environment.API}/user/getRecruiterList`;
    return this.http.get(url);
  }

  getInterviewerList() {
    const url = `${environment.API}/user/getInterviewerList`;
    return this.http.get(url);
  }

  addUser(data: any){
    const url = `${environment.API}/user/registerUser`;
    return this.http.post(url, JSON.stringify(data));
  }

  editUser(userId:any,payload:any){
    const url =`${environment.API}/user/editUserField/${userId}`;
    return this.http.patch(url,payload);
  }

  deleteUser(userID:any, payload:any){
    const url = `${environment.API}/user/removeUsers/${userID}`;
    return this.http.patch(url,payload);
  }

  loggedInUserDetails(userID:any){
    const url = `${environment.API}/user/me/${userID}`;
    return this.http.get(url);
  }

  userMeUpdate(userName:any, payload:any){
    const url = `${environment.API}/user/updateMe/${userName}`;
    return this.http.patch(url,payload);
  }

  changePassword(userName:any, payload:any) {
    const url =`${environment.API}/user/changePassword/${userName}`;
    return this.http.patch(url,payload);
  }
}
