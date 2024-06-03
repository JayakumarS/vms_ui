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
    return moment(date).format('YYYY');
  }

  getDateNew(date): any {
    return moment(date).format('YYYY-MM-DD');
  }

  getDateObj(string): any {
    return moment(string, 'DD/MM/YYYY')
  }
}
