import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { offSign } from './off-sign.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OffSignService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<offSign[]> = new BehaviorSubject<offSign[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private listUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/offsign/listOffSign`;
  private saveUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/offsign/saveOffSign`;
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
  public vesselTypeUrl = `${this.serverUrl.apiServerAddress}api/common/getVesselType`;
  public nationalityUrl = `${this.serverUrl.apiServerAddress}api/common/getNationality`;
  public rankListUrl = `${this.serverUrl.apiServerAddress}api/common/getRankMasters`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/offsign/editOffSign`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/offsign/updateOffSign`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/offsign/deleteOffSign`;

  get data(): offSign[] {
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
  
  saveOffSignUrl(offSign: offSign, router, notificationService){
    this.httpService.post<offSign>(this.saveUrl, offSign).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
       router.navigate(['/crew/maintain/off-sign/list-off-sign']);
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

 updateOffSign(offSign: offSign, router, notificationService){
  this.httpService.post<offSign>(this.updateUrl, offSign).subscribe({next: (data: any) => {
    if (data.success == true) {
      notificationService.showNotification(
        "snackbar-success",
        "Record Updated Successfully",
        "bottom",
        "center"
      );
      router.navigate(['/crew/maintain/off-sign/list-off-sign']);
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

delete(id){
  return this.httpClient.get<any>(this.deleteUrl + "?id=" + parseInt(id));
}
 
}
