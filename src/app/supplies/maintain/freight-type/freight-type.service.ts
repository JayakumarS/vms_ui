
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { FreightType } from './freight-type.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FreightTypeService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<FreightType[]> = new BehaviorSubject<FreightType[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/FreightType/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/crew/FreightType/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/FreightType/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/FreightType/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/FreightType/update`;


  get data(): FreightType[] {
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

  saveFreightType(FreightType: FreightType, router, notificationService){
     this.httpService.post<FreightType>(this.saveUrl, FreightType).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/supplies/maintain/freight-type/list-freight-type']);
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

  updateFreightType(FreightType: FreightType, router, notificationService){
    this.httpService.post<FreightType>(this.updateUrl, FreightType).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/supplies/maintain/freight-type/list-freight-type']);
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