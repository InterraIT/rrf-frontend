import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppConstants } from '../helpers/app-contants.helper';

@Pipe({
  name: 'postionState'
})
export class PostionStatePipe implements PipeTransform {

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
    if (stateObj.stateID == AppConstants.STATES.POSITION.INIT.ID) {
      termsApply = '<button class="btn btn-status initial">' + stateObj.stateDisplayName + '</button>';
    } else if ( stateObj.stateID == AppConstants.STATES.POSITION.DRAFT.ID) {
      termsApply = '<button class="btn btn-status draft">' + stateObj.stateDisplayName + '</button>';
    }
    else if (stateObj.stateID ==AppConstants.STATES.POSITION.OPEN.ID) {
      termsApply = '<button class="btn btn-status open">' + stateObj.stateDisplayName + '</button>';
    }
    else if (stateObj.stateID == AppConstants.STATES.POSITION.OFFERED.ID) {
      termsApply = '<button class="btn btn-status offered">' + stateObj.stateDisplayName + '</button>';
    } else if (stateObj.stateID == AppConstants.STATES.POSITION.HIRED.ID) {
      termsApply = '<button class="btn btn-status hired">' + stateObj.stateDisplayName + '</button>';
    }else if (stateObj.stateID == AppConstants.STATES.POSITION.CLOSED.ID) {
      termsApply = '<button class="btn btn-status closed">' + stateObj.stateDisplayName + '</button>';
    }

    return termsApply;
  }

}
