import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {
  private _toastrBS = new BehaviorSubject<any>({});
  showToastr = this._toastrBS.asObservable();
  private toastrData: any = {};

  constructor() { }

  success(message: string, timeout?: number): void {
    this.toastrData = {
      text: message,
      toastrClass: 'toastr-success',
      iconClass: 'fa-check',
      timeout: timeout ?? 5000
    };
    this._toastrBS.next(this.toastrData);
  }

  warning(message: string, timeout?: number): void {
    this.toastrData = {
      text: message,
      toastrClass: 'toastr-warning',
      iconClass: 'fa-triangle-exclamation',
      timeout: timeout ?? 5000
    };
    this._toastrBS.next(this.toastrData);
  }

  error(message: string, timeout?: number): void {
    this.toastrData = {
      text: message,
      toastrClass: 'toastr-error',
      iconClass: 'fa-circle-xmark',
      timeout: timeout ?? 5000
    };
    this._toastrBS.next(this.toastrData);
  }

}
