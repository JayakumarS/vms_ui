import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import * as moment from 'moment';
import { miultiSeamenSignOff } from './multi-seamem-sign-off.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MultiSeamenSignOffService extends UnsubscribeOnDestroyAdapter{
  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }
  
  getDateObj(string): any {
    return moment(string, 'DD/MM/YYYY')
  }
  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<miultiSeamenSignOff[]> = new BehaviorSubject<miultiSeamenSignOff[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  public getVesselUrl = `${this.serverUrl.apiServerAddress}api/common/getVessel`;
  // public getVesselUrl = `${this.serverUrl.apiServerAddress}api/crew/CrewVesselAssignment/getvessel`
  public getJoiningPortUrl = `${this.serverUrl.apiServerAddress}api/common/getjoinport`;
  public getCurrencyListUrl = `${this.serverUrl.apiServerAddress}api/common/getCurrency`;
  public getnameListUrl = `${this.serverUrl.apiServerAddress}api/common/getCurrency`;
  public getport = `${this.serverUrl.apiServerAddress}api/common/getPort`;
  public getRankUrl = `${this.serverUrl.apiServerAddress}api/common/getRankMasters`;
  public getNameUrl = `${this.serverUrl.apiServerAddress}api/common/getSeamenName`;
  public savedata = `${this.serverUrl.apiServerAddress}api/crew/multiSeamenSignOff/saveMultiSeamen`;

  public nationalityUrl = `${this.serverUrl.apiServerAddress}api/common/getNationality`;

  public fetchdata = `${this.serverUrl.apiServerAddress}api/crew/multiSeamenSignOff/multiSemanlist`;

  


  get data(): miultiSeamenSignOff[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
   
  }


}
