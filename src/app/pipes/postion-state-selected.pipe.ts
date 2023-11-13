import { Pipe, PipeTransform } from '@angular/core';
import { AppConstants } from '../helpers/app-contants.helper';

@Pipe({
  name: 'postionStateSelected'
})
export class PostionStateSelectedPipe implements PipeTransform {

  transform(state: any, selectedStatedID: string): string {
    return this.getCssClass(state,selectedStatedID);
  }

  private getCssClass(stateObj: any, selectedStatedID: string): string  {
    if (stateObj === null || stateObj === undefined) {
      return "";
    }
    
    let termsApply = 'all';
    if (stateObj.stateID == AppConstants.STATES.POSITION.INIT.ID) {
      termsApply = 'initial';
    } else if ( stateObj.stateID == AppConstants.STATES.POSITION.DRAFT.ID) {
      termsApply = 'draft';
    }
    else if (stateObj.stateID ==AppConstants.STATES.POSITION.OPEN.ID) {
      termsApply = 'open';
    }
    else if (stateObj.stateID == AppConstants.STATES.POSITION.OFFERED.ID) {
      termsApply = 'offered';
    } else if (stateObj.stateID == AppConstants.STATES.POSITION.HIRED.ID) {
      termsApply = 'hired';
    }else if (stateObj.stateID == AppConstants.STATES.POSITION.CLOSED.ID) {
      termsApply = 'closed';
    }

    if (selectedStatedID == stateObj.stateID || (selectedStatedID == '' && termsApply == 'all')) {
      termsApply += ' selected';
    }

    return termsApply;
  }

}
