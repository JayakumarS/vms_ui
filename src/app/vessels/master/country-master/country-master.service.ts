import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { CountryMaster } from "./country-master.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { CountryMasterResultBean } from './country-master-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CountryMasterService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<CountryMaster[]> = new BehaviorSubject<CountryMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public currencyListUrl = `${this.serverUrl.apiServerAddress}api/common/getCurrency`;
  public editcountryMaster = `${this.serverUrl.apiServerAddress}app/countryMaster/getCode`;
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/master/country/listCountry`;
  private saveCountryMaster = `${this.serverUrl.apiServerAddress}api/master/country/saveCountry`;
  public deleteCountryUrl = `${this.serverUrl.apiServerAddress}api/master/country/deleteCountry`;
  public editCountryMaster = `${this.serverUrl.apiServerAddress}api/master/country/editCountry`;
  public updateCountryMaster = `${this.serverUrl.apiServerAddress}api/master/country/updateCountry`;
  public validateCusShortNameUrl = `${this.serverUrl.apiServerAddress}app/common/commonServices/validateUnique`;
  public viewCountryMaster = `${this.serverUrl.apiServerAddress}app/countryMaster/view`;
  public savePrePlan = `${this.serverUrl.apiServerAddress}app/countryMaster/savePrePlan`;
  public updatePreplanCal = `${this.serverUrl.apiServerAddress}app/countryMaster/updatePreplan`;
  public deleteEventCal = `${this.serverUrl.apiServerAddress}app/countryMaster/deleteEventCal`;
  public phoneCodeListUrl = `${this.serverUrl.apiServerAddress}api/common/getphoneCode`;

  get data(): CountryMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<CountryMasterResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.list);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  addCountry(countryMaster: CountryMaster,router,notificationService): void {
    this.dialogData = countryMaster;
    this.httpService.post<CountryMaster>(this.saveCountryMaster,countryMaster).subscribe(data => {
      console.log(data);
      if(data.success===true){
        notificationService.showNotification(
          "snackbar-success",
          "Country Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/master/country-Master/list-CountryMaster']);
      }
      else if(data.success===false){
        notificationService.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  countryUpdate(countryMaster: CountryMaster,router,notificationService): void {
    this.dialogData = countryMaster;
    this.httpService.post<CountryMaster>(this.updateCountryMaster, countryMaster).subscribe(data => {
      console.log(data);
      if(data.success===true){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/master/country-Master/list-CountryMaster']);
      }
      else if(data.success===false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated ...!!!",
          "bottom",
          "center"
        );
      }
  });
}
countryDelete(countryCode: any): Observable<any>  {
  return  this.httpClient.get<any>(this.deleteCountryUrl+"?id="+countryCode);
};
 
}
