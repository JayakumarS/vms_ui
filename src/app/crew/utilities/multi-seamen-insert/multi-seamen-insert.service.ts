import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { miultiSeamenInsert } from './multi-seamen-insert.model';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MultiSeamenInsertService extends UnsubscribeOnDestroyAdapter{
  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }
  
  getDateObj(string): any {
    return moment(string, 'DD/MM/YYYY')
  }
  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<miultiSeamenInsert[]> = new BehaviorSubject<miultiSeamenInsert[]>(
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
  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/utilities/multiseamen/saveMultiSeamen`;




  get data(): miultiSeamenInsert[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
   
  }

  saveMultiSeamenUrl(miultiSeamenInsert: miultiSeamenInsert, router, notificationService){
    this.httpService.post<miultiSeamenInsert>(this.saveUrl, miultiSeamenInsert).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
       location.reload();
       //router.navigate(['/crew/application-properties/define-preferences-for-working-hours/define-rank-shift/list-define-rank-shift']);
     }else{
       notificationService.showNotification(
         "snackbar-danger",
         "Not Updated",
         "bottom",
         "center"
       );
     }
     }, error: (err) => console.log(err)
    });
 }
}
