

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Fleets } from './fleets/fleets.model';

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

  get data(): Fleets[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getList() {
    // Define the type for the list
    let list: Fleets[] = [
      {
        code: "MAS",
        description: "GFS Ship Management FZE",
        getRandomID: function (): string {
          throw new Error('Function not implemented.');
        }
      }
    ];
  
    // Set loading to false initially
    this.isTblLoading = false;
  
    // Update the dataChange subject with the list
    this.dataChange.next(list);
  
    // Uncomment and define value and url for future API requests
    // let value = {}; // Define the payload for the POST request
    // let url = 'your-api-endpoint'; // Replace with the actual API endpoint
  
    // If you plan to fetch data from an API, uncomment the code below
    /*
    this.isTblLoading = true; // Set loading to true while fetching data
    this.subs.sink = this.httpService.post<MaintainRank[]>(url, value).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
    */
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