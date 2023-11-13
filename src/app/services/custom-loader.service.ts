import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomLoaderService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  loadingAction = this._isLoading$.asObservable();
  constructor() {}


  show(): void {
    if(!this._isLoading$.value) {
      this._isLoading$.next(true);
    }  
  }

  hide(): void {
    if(this._isLoading$.value) {
      this._isLoading$.next(false);
    }
  }
}
