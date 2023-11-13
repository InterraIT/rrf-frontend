import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppConstants } from '../helpers/app-contants.helper';

@Pipe({
  name: 'interviewState'
})
export class InterviewStatePipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  transform(stateObj: any): SafeHtml {
    let termsApply = this.getHtml(stateObj);
    return this._sanitizer.bypassSecurityTrustHtml(termsApply);
  }

  private getHtml(stateObj: any): string {
    if (stateObj === null || stateObj === undefined) {
      return "";
    }
    
    let termsApply = '<button class="btn btn-status">' + stateObj.stateDisplayName + '</button>';
    if (stateObj.stateID == AppConstants.STATES.INTERVIEW.SCHEDULED.ID) {
      termsApply = '<button class="btn btn-status scheduled">' + stateObj.stateDisplayName + '</button>';
    } else if (stateObj.stateID ==AppConstants.STATES.INTERVIEW.SELECTED.ID) {
      termsApply = '<button class="btn btn-status selected-interview">' + stateObj.stateDisplayName + '</button>';
    } else if ( stateObj.stateID ==  AppConstants.STATES.INTERVIEW.REJECTED.ID) {
      termsApply = '<button class="btn btn-status not-committed">' + stateObj.stateDisplayName + '</button>';
    }else if (stateObj.stateID == AppConstants.STATES.INTERVIEW.ON_HOLD.ID) {
      termsApply = '<button class="btn btn-status expired">' + stateObj.stateDisplayName + '</button>';
    }else if (stateObj.stateID == AppConstants.STATES.INTERVIEW.CANCELLED.ID) {
      termsApply = '<button class="btn btn-status remove">' + stateObj.stateDisplayName + '</button>';
    }
    return termsApply;
  }

}
