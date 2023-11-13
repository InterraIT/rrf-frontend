import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenManagerService } from '../services/token-manager.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenManager: TokenManagerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = request.url.startsWith(`${environment.API}`);
    const currentUser = this.tokenManager.currentUser;
    if (isApiUrl && currentUser!=null) {
      const token = this.tokenManager.getAccesToken();
      request = request.clone({
        setHeaders: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
      });
    }else if(isApiUrl){
      request = request.clone({
        setHeaders: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
      });
    }
    return next.handle(request);
  }
}
