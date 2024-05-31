import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserRightsNew } from './userrightsnew.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class UserrightsnewService extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<UserRightsNew[]> = new BehaviorSubject<UserRightsNew[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();

  }

  public roleListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/userRights/getUserList`;

  public moduleList = `${this.serverUrl.apiServerAddress}api/auth/app/userRights/getModuleList`;

  public roleFormUrl = `${this.serverUrl.apiServerAddress}api/auth/app/userRights/getFormList`;

  public roleFormUrlModule = `${this.serverUrl.apiServerAddress}api/auth/app/userRights/getFormByModuleList`;

  public saveUrl = `${this.serverUrl.apiServerAddress}api/auth/app/userRights/save`;

  get data(): UserRightsNew[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  roleRightsMasterAddUpdate(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.saveUrl, obj);
  }
}
