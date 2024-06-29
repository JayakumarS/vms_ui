import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import * as moment from 'moment';
import { MultiSeamenInsert } from './multi-seamen-insert.model';

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
  dataChange: BehaviorSubject<MultiSeamenInsert[]> = new BehaviorSubject<MultiSeamenInsert[]>(
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
  public nationalityUrl = `${this.serverUrl.apiServerAddress}api/common/getNationality`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/utilities/multiseamen/deleteMultiSeamen`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/crew/utilities/multiseamen/listMultiSeamen`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/utilities/multiseamen/editMultiSeamen`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/utilities/multiseamen/updateMultiSeamen`;
  public CheckValidUrl = `${this.serverUrl.apiServerAddress}api/crew/utilities/multiseamen/checkValid`;


  get data(): MultiSeamenInsert[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  getAllList(): void {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });  
}
  delete(id){
    return this.httpClient.get<any>(this.deleteUrl + "?id=" + parseInt(id));
  }

  updateMultiSeamenUrl(MultiSeamenInsert: MultiSeamenInsert, router, notificationService){
    this.httpService.post<MultiSeamenInsert>(this.updateUrl, MultiSeamenInsert).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/utilities/multi-seamen-insert/list-multi-seamen-insert']);
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

  saveMultiSeamenUrl(MultiSeamenInsert: MultiSeamenInsert, router, notificationService){
    this.httpService.post<MultiSeamenInsert>(this.saveUrl, MultiSeamenInsert).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
       router.navigate(['/crew/utilities/multi-seamen-insert/list-multi-seamen-insert']);
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
