import { Injectable } from '@angular/core';
import * as moment from "moment";
import { serverLocations } from '../auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';

@Injectable()
export class CommonService extends UnsubscribeOnDestroyAdapter {

  constructor(private serverUrl: serverLocations) {
    super();
  }

  public validateOldPasswordUrl = `${this.serverUrl.apiServerAddress}api/userMaster/oldPasswordValidation`;
  public updateChangePasswordUrl = `${this.serverUrl.apiServerAddress}api/userMaster/updatePassword`;

  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }

  getYear(date): any {
    if (!date) {
      return null;
    }
    return moment(date).format('YYYY');
  }

  getDateNew(date): any {
    return moment(date).format('YYYY-MM-DD');
  }

  getDateObj(dateString: string): any {
    if (!dateString) {
      return null;
    }
    const date = moment(dateString, 'DD/MM/YYYY', true);
    return date.isValid() ? date : null;
  }
}
