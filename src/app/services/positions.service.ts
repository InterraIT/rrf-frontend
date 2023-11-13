import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
 
  constructor(private http: HttpClient) { }
  getPositionStateList() {
    const url = `${environment.API}/lookup/positionStates`;
    return this.http.get(url);
  }

  getPositionList(page: number, pageSize: number, searchByFields: Array<any>, sortobj: any,globalSearchPattern: string) {
    const url = `${environment.API}/position/getPositions?page=${page}&pageSize=${pageSize}&searchByFields=${JSON.stringify(searchByFields)}&sortField=${JSON.stringify(sortobj)}&search=${globalSearchPattern}`;
    return this.http.get(url);
  }

  getPositionDetailsById(positionId) {
    const url = `${environment.API}/position/getPositionDetails/${positionId}`;
    return this.http.get(url);
  }

  addRecruiter(positionid: any, data: any) {
    const url = `${environment.API}/position/${positionid}/recruiters/assign`;
    return this.http.post(url, JSON.stringify(data));
  }

  removeRecruiter(positionid: any, userid:any){
    const url = `${environment.API}/position/${positionid}/recruiters/${userid}/remove`;
    return this.http.delete(url);
  }

  removeInterviewer(positionid: any, userid:any){
    const url = `${environment.API}/position/${positionid}/interviewer/${userid}/remove`;
    return this.http.delete(url);
  }

  changePositionState(positionId:string,payload:any) {
    const url = `${environment.API}/position/${positionId}/changeState`;
    return this.http.post(url, JSON.stringify(payload));
  }

  getMyAssignedPositions(userID:string,page: number, pageSize: number, searchByFields: Array<any>, sortobj: any,globalSearchPattern: string) {
    const url = `${environment.API}/position/getMyAssignedPositions/${userID}?page=${page}&pageSize=${pageSize}&searchByFields=${JSON.stringify(searchByFields)}&sortField=${JSON.stringify(sortobj)}&search=${globalSearchPattern}`;
    return this.http.get(url);
  }

  addInterviewer(positionid: any, data: any) {
    const url = `${environment.API}/position/${positionid}/interviewer/assign`;
    return this.http.post(url, JSON.stringify(data));
  }

  getAssignedInterviewer(positionId) {
    const url = `${environment.API}/position/${positionId}/assingnedInterviewer`;
    return this.http.get(url);
  }

  

}
