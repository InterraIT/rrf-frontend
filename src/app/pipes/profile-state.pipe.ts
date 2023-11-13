import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppConstants } from '../helpers/app-contants.helper';

@Pipe({
  name: 'profileState'
})
export class ProfileStatePipe implements PipeTransform {

 
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
    if (stateObj.stateID == AppConstants.STATES.PROFILE.UPLOADED.ID) {
      termsApply = '<button class="btn btn-status initial">' + stateObj.stateDisplayName + '</button>';
    } else if (stateObj.stateID ==AppConstants.STATES.PROFILE.IN_PROGRESS.ID) {
      termsApply = '<button class="btn btn-status open">' + stateObj.stateDisplayName + '</button>';
    }else if (stateObj.stateID ==AppConstants.STATES.PROFILE.PROFILE_REJECTED.ID) {
      termsApply = '<button class="btn btn-status profile-rejected">' + stateObj.stateDisplayName + '</button>';
    } else if (stateObj.stateID == AppConstants.STATES.PROFILE.SHORT_LISTED.ID) {
      termsApply = '<button class="btn btn-status shortlisted">' + stateObj.stateDisplayName + '</button>';
    }else if ( stateObj.stateID ==  AppConstants.STATES.PROFILE.REJECTED.ID) {
      termsApply = '<button class="btn btn-status rejected">' + stateObj.stateDisplayName + '</button>';
    }else if (stateObj.stateID == AppConstants.STATES.PROFILE.BACKUP.ID) {
      termsApply = '<button class="btn btn-status backup">' + stateObj.stateDisplayName + '</button>';
    }else if (stateObj.stateID == AppConstants.STATES.PROFILE.OFFERED.ID) {
      termsApply = '<button class="btn btn-status offered">' + stateObj.stateDisplayName + '</button>';
    }else if (stateObj.stateID == AppConstants.STATES.PROFILE.ACCEPTED.ID) {
      termsApply = '<button class="btn btn-status accepted">' + stateObj.stateDisplayName + '</button>';
    }else if (stateObj.stateID == AppConstants.STATES.PROFILE.DECLINED.ID) {
      termsApply = '<button class="btn btn-status declined">' + stateObj.stateDisplayName + '</button>';
    }else if (stateObj.stateID == AppConstants.STATES.PROFILE.WITHDRAWN.ID) {
      termsApply = '<button class="btn btn-status withdrawn">' + stateObj.stateDisplayName + '</button>';
    }else if (stateObj.stateID == AppConstants.STATES.PROFILE.JOINED.ID) {
      termsApply = '<button class="btn btn-status hired">' + stateObj.stateDisplayName + '</button>';
    }

    return termsApply;
  }

}
