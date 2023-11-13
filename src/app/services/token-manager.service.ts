import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, Injector, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LOCAL_STORAGE, SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AppConstants } from '../helpers/app-contants.helper';
import { UserModel } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { EMPTY, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {
  @Output() getLoggedInfo: EventEmitter<UserModel|null> = new EventEmitter();

  private helper: JwtHelperService;
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,
  @Inject(SESSION_STORAGE) private sessionStorage: StorageService,
  @Inject(Injector) private readonly injector: Injector,
  private cookieService: CookieService,
  private http: HttpClient) {
    this.helper = new JwtHelperService();
  }

  getAccesToken() {
    let accessToken = this.storage.get(AppConstants.TOKEN_KEY.ACCESS_TOKEN) as string;
    if (!(accessToken == null || accessToken == undefined)) {
      return accessToken;
    }
    return null;
  }

  get currentUser(): UserModel|null {
    let jwtToken = this.getAccesToken();
    if (jwtToken == null) {
      return null;
    }

    if (this.helper.isTokenExpired(jwtToken)) {
      return null;
    }

   
    let user: UserModel|null = this.getUserInfo();
    if (user == null) {
      return null;
    }
    return user;
  }

  private getRefreshToken() {
    let refreshaccessToken = this.storage.get(AppConstants.TOKEN_KEY.REFRESH_TOKEN) as string;
    if (!(refreshaccessToken == null || refreshaccessToken == undefined)) {
      return refreshaccessToken;
    }
    return null;
  }
  
  public getUserInfo():UserModel | null{
    let userData = this.sessionStorage.get(AppConstants.TOKEN_KEY.USER_INFO) as string;
    if(userData==null || userData == undefined ){
      userData = this.storage.get(AppConstants.TOKEN_KEY.USER_INFO) as string;
    }

    if (!(userData == null || userData == undefined)) {
      let user: UserModel = JSON.parse(userData);
      return user;
    }
    return null;
  }

  public cacheTokens(responseData: any, rememberMe: boolean) {
    let tokenPayload = this.helper.decodeToken(responseData.accessToken);
    let user: UserModel = {
      userID: tokenPayload.userID,
      userName: tokenPayload.userName,
      firstName: tokenPayload.firstName,
      lastName: tokenPayload.lastName,
      fullName: tokenPayload.firstName+" "+ tokenPayload.lastName,
      userType: tokenPayload.userTypeTxt,
      rememberMe: rememberMe
    }

    this.cookieService.set(AppConstants.TOKEN_KEY.LOGIN_COOKIE, "true");
    this.storage.set(AppConstants.TOKEN_KEY.ACCESS_TOKEN, responseData.accessToken);
    this.storage.set(AppConstants.TOKEN_KEY.REFRESH_TOKEN, responseData.refreshToken);
    this.storage.set(AppConstants.TOKEN_KEY.USER_INFO, JSON.stringify(user));
    this.sessionStorage.set(AppConstants.TOKEN_KEY.USER_INFO, JSON.stringify(user));
    this.getLoggedInfo.emit(user);
    this.startRefreshTokenTimer();
  }

  refreshCacheDataSuccess(clledFromAppInit: boolean, responseData: any): boolean{
    let accessToken = this.getAccesToken();
    if (accessToken == null) {
      accessToken = '';
    }

    let user: UserModel|null = this.getUserInfo();
    if (user == null) {
      return false;
    }

    const data = responseData.data;
    //let user: UserModel = this.getUserInfo();
    let tokenPayload = this.helper.decodeToken(data.accessToken);
    user.userID=tokenPayload.userID,
    user.userName= tokenPayload.userName,
    user.firstName=tokenPayload.firstName,
    user.lastName=tokenPayload.lastName,
    user.fullName=tokenPayload.firstName+" "+ tokenPayload.lastName,
    user.userType=tokenPayload.userTypeTxt

    this.cookieService.set(AppConstants.TOKEN_KEY.LOGIN_COOKIE, "true");
    this.storage.set(AppConstants.TOKEN_KEY.ACCESS_TOKEN, data.accessToken);
    this.storage.set(AppConstants.TOKEN_KEY.REFRESH_TOKEN, data.refreshToken);
    this.storage.set(AppConstants.TOKEN_KEY.USER_INFO, JSON.stringify(user));
    this.sessionStorage.set(AppConstants.TOKEN_KEY.USER_INFO, JSON.stringify(user));
    this.getLoggedInfo.emit(user);

    this.stopRefreshTokenTimeout();
    this.startRefreshTokenTimer();
    return true;
  }

  private startRefreshTokenCheckingTimeout:any = null;
  public startRefreshTokenChecking() {
    this.stopRefreshTokenCheckingTimer();
    let refreshToken = this.getRefreshToken();
    if (refreshToken == null) {
      this.getLoggedInfo.emit(null);
      return;
    }


    const timeout = 2 * 1000;
    this.startRefreshTokenCheckingTimeout = setTimeout(() => {
      this.startRefreshTokenChecking();
    }, timeout);
  }

  private stopRefreshTokenCheckingTimer() {
    if (this.startRefreshTokenCheckingTimeout != null) {
      clearTimeout(this.startRefreshTokenCheckingTimeout);
    }
  }

  clearCache() {
    let user: UserModel|null = this.getUserInfo();
    if (user != null && !user.rememberMe) {
      this.stopRefreshTokenTimeout();
      this.stopRefreshTokenCheckingTimer();
      this.storage.remove(AppConstants.TOKEN_KEY.ACCESS_TOKEN);
      this.storage.remove(AppConstants.TOKEN_KEY.REFRESH_TOKEN);
      this.storage.remove(AppConstants.TOKEN_KEY.USER_INFO);
      this.sessionStorage.remove(AppConstants.TOKEN_KEY.USER_INFO);
      this.getLoggedInfo.emit(null);
    }
  }


  refreshCacheDataError() {
    let user: UserModel|null = this.getUserInfo();
    if (user == null || !user.rememberMe) {
      this.clearCache();
    } 

  }

  private refreshTokenTimeout:any = null;
  private startRefreshTokenTimer() {
    let accesssToken = this.getAccesToken()||'';
    let tokenPayload = this.helper.decodeToken(accesssToken);
    const timeout = (parseInt(tokenPayload.expireMinutes, 10) - 2) * 60 * 1000;

    this.refreshTokenTimeout = setTimeout(() => {
      this.callRefreshTokenAPI(false).subscribe((response: any) => {
        
        console.log("Refresh Token successfully");
        this.refreshCacheDataSuccess(false, response);
      }, (error: any) => {
        console.log("Failed Token successfully");
        this.refreshCacheDataError();
      });
    }, timeout);

  }


  private stopRefreshTokenTimeout() {
    if (this.refreshTokenTimeout != null) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }


  callRefreshTokenAPI(pageLoad: boolean) {
    console.log("Refresh Calling::"+pageLoad);
    let refreshToken = this.getRefreshToken()
    if (refreshToken == null) {
      return EMPTY;
    }

    if (this.helper.isTokenExpired(refreshToken)) {
      return EMPTY;
    }

    let accessToken = this.getAccesToken();
    if (accessToken == null) {
      accessToken = '';
    }

    refreshToken = encodeURIComponent(refreshToken);
    accessToken = encodeURIComponent(accessToken);
    let refresshUrl = `${environment.API}/user/refreshToken?refreshToken=${refreshToken}&accessToken=${accessToken}`;
    if (!pageLoad) {
      return this.http.get<any>(refresshUrl);
    }

    let user: UserModel | null = this.getUserInfo();
    if (!user) {

      this.logout().subscribe((logoutRes) => {
        console.log("Auto Logout")
      });
      return EMPTY;
    }

    if (!user.rememberMe) {
      if (accessToken == '' || this.helper.isTokenExpired(accessToken)) {
        this.logout().subscribe((logoutRes) => {
          console.log("Auto Logout")
        });
        return EMPTY;
      }

      let loggedCookie = this.cookieService.get(AppConstants.TOKEN_KEY.LOGIN_COOKIE);
      if (loggedCookie != "true") {
        this.logout().subscribe((logoutRes) => {
          console.log("Auto Logout")
        });
        return EMPTY;
      }

    } else {
     this.cookieService.set(AppConstants.TOKEN_KEY.LOGIN_COOKIE, "true")
    }
    
    return this.http.get<any>(refresshUrl);
  }

  logout() {
    let url = `${environment.API}/user/logout`;
    return this.http.post<any>(url,JSON.stringify({})).pipe(
      map((responseData:any) => {
        this.stopRefreshTokenTimeout();
        this.stopRefreshTokenCheckingTimer();
    
        this.storage.remove(AppConstants.TOKEN_KEY.ACCESS_TOKEN);
        this.storage.remove(AppConstants.TOKEN_KEY.REFRESH_TOKEN);
        this.storage.remove(AppConstants.TOKEN_KEY.USER_INFO);
        this.sessionStorage.remove(AppConstants.TOKEN_KEY.USER_INFO);
        return true;
      }));
  }
  getMyLandingPage() {
    let landingPageUrl = "";
    let user:UserModel | null = this.currentUser;
    if (user == null) {
      return landingPageUrl;
    }

    if (user.userType == AppConstants.USER_TYPE.RECRUITER_ADMIN.NAME) {
      landingPageUrl = "/admin/dashboard";
    } else if ((user.userType == AppConstants.USER_TYPE.INTERNAL_RECRUITER.NAME || user.userType == AppConstants.USER_TYPE.EXTERNAL_RECRUITER.NAME)) {
      landingPageUrl = "/recruiter/dashboard";
    } else if(user.userType == AppConstants.USER_TYPE.INTERVIEWER.NAME) {
      landingPageUrl = "/interviewer/dashboard"
    }

    return landingPageUrl;
  }

  get isLoggedIn() {
    let jwtToken = this.getAccesToken();
    if (jwtToken == null) {
      return false;
    }

    if (this.helper.isTokenExpired(jwtToken)) {
      return false;
    }

    let user: UserModel|null = this.getUserInfo();
    if (user == null) {
      return false;
    }
    return true;
  }

}
