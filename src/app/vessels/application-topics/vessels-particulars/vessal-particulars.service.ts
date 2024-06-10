
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { vesswlsParticulars } from './vessal-particulars.model';
import * as moment from 'moment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VessalParticularsService extends UnsubscribeOnDestroyAdapter{

  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }
  
  getDateObj(string): any {
    return moment(string, 'DD/MM/YYYY')
  }
  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<vesswlsParticulars[]> = new BehaviorSubject<vesswlsParticulars[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}app/countryMaster/getList`;
  private saveCountryMaster = `${this.serverUrl.apiServerAddress}app/countryMaster/save`;
  public deleteCountryUrl = `${this.serverUrl.apiServerAddress}app/countryMaster/delete`;
  public editCountryMaster = `${this.serverUrl.apiServerAddress}app/countryMaster/edit`;
  public updateCountryMaster = `${this.serverUrl.apiServerAddress}app/countryMaster/update`;
  public currencyListUrl = `${this.serverUrl.apiServerAddress}app/currencyMaster/getList`;
  public editcountryMaster = `${this.serverUrl.apiServerAddress}app/countryMaster/getCode`;
  public validateCusShortNameUrl = `${this.serverUrl.apiServerAddress}app/common/commonServices/validateUnique`;
  public viewCountryMaster = `${this.serverUrl.apiServerAddress}app/countryMaster/view`;
  public savePrePlan = `${this.serverUrl.apiServerAddress}app/countryMaster/savePrePlan`;
  public updatePreplanCal = `${this.serverUrl.apiServerAddress}app/countryMaster/updatePreplan`;
  public deleteEventCal = `${this.serverUrl.apiServerAddress}app/countryMaster/deleteEventCal`;
  public editEventDetail = `${this.serverUrl.apiServerAddress}app/countryMaster/editEventDetail`;

  get data(): vesswlsParticulars[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
    
  }
  



 
}
