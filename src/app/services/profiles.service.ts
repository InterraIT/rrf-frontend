import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http: HttpClient) { }

  addProfile(positionID:string,data: any) {
    const url = `${environment.API}/profile/createProfile/${positionID}`;
    return this.http.post(url, JSON.stringify(data));
  }

  getProfiles(){
    const url = `${environment.API}/profile/getProfiles`;
    return this.http.get(url);
  }
  
  getProfilesByPosition(positionID:string){
    const url = `${environment.API}/profile/getProfiles/${positionID}`;
    return this.http.get(url);
  }

  changeProfileStateInPosition(positionID:string,profileID:string,payload:any){
    const url = `${environment.API}/profile/changeState/${positionID}/${profileID}`;
    return this.http.post(url, JSON.stringify(payload));
  }

  getProfileDetailsInPosition(positionID:string,profileID:string){
    const url = `${environment.API}/profile/profileDetails/${profileID}/position/${positionID}`;
    return this.http.get(url);
  }
  assignMultipleProfiles(positionID:string,data: any){
    const url = `${environment.API}/profile/assignProfile/${positionID}`;
    return this.http.post(url, JSON.stringify(data));
  }

}
