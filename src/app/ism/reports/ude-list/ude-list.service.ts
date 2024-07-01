import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import * as moment from 'moment';
import { udelist } from './ude-list/ude-list.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UdeListService extends UnsubscribeOnDestroyAdapter{

  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }
  
  getDateObj(string): any {
    return moment(string, 'DD/MM/YYYY')
  }
  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<udelist[]> = new BehaviorSubject<udelist[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
 
  get data(): udelist[] {
    return this.dataChange.value;
  }
  public getfleet = `${this.serverUrl.apiServerAddress}api/common/getFleetList`;


  


  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
    
  }
  



 
}
