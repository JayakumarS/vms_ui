

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Fleets } from './fleets.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FleetsService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<Fleets[]> = new BehaviorSubject<Fleets[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/vessels/fleet/delete`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/vessels/fleet/edit`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/vessels/fleet/update`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/vessels/fleet/list`;
  public saveUrl = `${this.serverUrl.apiServerAddress}api/vessels/fleet/save`;
  
  get data(): Fleets[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getList() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }
  savefleet(fleets: Fleets, router, notificationService) {
    this.httpService.post<Fleets>(this.saveUrl, fleets).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/maintain/fleets/list-fleets']);
      }else{
        notificationService.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
      }, error: (err) => console.log(err)
     });
   
  }
  updatefleet(fleets: Fleets, router, notificationService){
    this.httpService.post<Fleets>(this.updateUrl, fleets).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/maintain/fleets/list-fleets']);
      }else{
        notificationService.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
      }, error: (err) => console.log(err)
     });
  }

  delete(id){
    return this.httpClient.get<any>(this.deleteUrl + "?id=" + id);
  }
 
}