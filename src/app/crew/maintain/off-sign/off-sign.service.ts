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
  public vesselTypeUrl = `${this.serverUrl.apiServerAddress}api/common/getVesselType`;
  public nationalityUrl = `${this.serverUrl.apiServerAddress}api/common/getNationality`;
  public rankListUrl = `${this.serverUrl.apiServerAddress}api/common/getRankMasters`;
  get data(): offSign[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
    // const hardcodedData: offSign[] = [
    //   {
    //     vessaltype: 'RORO',
    //     id: 0,
    //     Success: false,
    //     nationality: undefined,
    //     rank: undefined,
    //     months: undefined
    //   },
    //   {
    //     vessaltype: 'TANKER',
    //     id: 0,
    //     Success: false,
    //     nationality: undefined,
    //     rank: undefined,
    //     months: undefined
    //   },
    //   {
    //     vessaltype: 'CONTAINER',
    //     id: 0,
    //     Success: false,
    //     nationality: undefined,
    //     rank: undefined,
    //     months: undefined
    //   },
    //   {
    //     vessaltype: 'BULK CARRIER',
    //     id: 0,
    //     Success: false,
    //     nationality: undefined,
    //     rank: undefined,
    //     months: undefined
    //   },
    //   // Add more items as needed
    // ];
    

    // // Update the dataChange observable with the hardcoded data
    // this.dataChange.next(hardcodedData);
  }
  



 
}
