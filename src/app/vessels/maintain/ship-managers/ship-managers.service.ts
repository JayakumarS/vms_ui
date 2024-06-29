
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ShipModel } from './ship-mangers.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ShipManagersService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<ShipModel[]> = new BehaviorSubject<ShipModel[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/vessels/shipManagers/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/vessels/shipManagers/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/vessels/shipManagers/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/vessels/shipManagers/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/vessels/shipManagers/update`;
  public getSequenceCode = `${this.serverUrl.apiServerAddress}api/vessels/shipManagers/getSequenceCode`;


  get data(): ShipModel[] {
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

  saveShipModel(ShipModel: ShipModel, router, notificationService){
     this.httpService.post<ShipModel>(this.saveUrl, ShipModel).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/maintain/ship-managers/list-ship-managers']);
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

  updateShipModel(ShipModel: ShipModel, router, notificationService){
    this.httpService.post<ShipModel>(this.updateUrl, ShipModel).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/maintain/ship-managers/list-ship-managers']);
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

  
  
  // deleteEmployees(countryCode : any,router,notificationService): void {
  //    this.httpService.get<CountryMaster>(this.deleteCountryUrl+"?countryCode="+countryCode).subscribe(data => {
  //     console.log(countryCode);
  //     if(data.Success===true){
  //       notificationService.showNotification(
  //         "snackbar-success",
  //         "Deleted Record Successfully...!!!",
  //         "bottom",
  //         "center"
  //       );
  //       router.navigate(['/master/country-Master/list-CountryMaster']);
  //     }
  //     else if(data.Success===false){
  //       notificationService.showNotification(
  //         "snackbar-danger",
  //         "Error in delete...!!!",
  //         "bottom",
  //         "center"
  //       );
  //     }

  //     },
  //     (err: HttpErrorResponse) => {
  //        // error code here
  //     }
  //   );
  // }

  getCurrencyList() {
   
   
  }

 
}