import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,) { }

  userlogin(paylod: any) {
    const url = `${environment.API}/user/login`;
    return this.http.post(url, JSON.stringify(paylod));
  }
}
