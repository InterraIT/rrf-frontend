import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwUpdate, UnrecoverableStateEvent, VersionEvent } from '@angular/service-worker';
import { CustomToastrService } from './services/custom-toastr.service';
import { ConfirmPopupService } from './services/confirm-popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger(
      'toastrAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000)',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000)',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = '';
  private toastrSubscription: Subscription;
  toastrData: any = {};
  private timeoutID: any = undefined;
  constructor(private toastr: CustomToastrService, private _changeDetect: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.toastrSubscription = this.toastr.showToastr.subscribe(
      (toastrData: any) => {
        this.toastrData = toastrData;
        if (Object.entries(toastrData).length > 0) {
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
            this.timeoutID = undefined;
          };
          this.timeoutID = setTimeout(() => {
            this.toastrData = {};
          }, this.toastrData.timeout ?? 5000);
        } else {
          clearTimeout(this.timeoutID);
        };
        this._changeDetect.markForCheck();
      });
  }
  ngOnDestroy(): void {
    this.toastrSubscription.unsubscribe();
  }
  closeAction(toastrAction: any) {
    this.toastrData = toastrAction;
  }

}
