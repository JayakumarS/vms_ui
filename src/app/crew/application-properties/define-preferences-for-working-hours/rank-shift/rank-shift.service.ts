
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { RankShift } from './list-rank-shift/rank-shift.model';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RankShiftService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<RankShift[]> = new BehaviorSubject<RankShift[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
 
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/RankWorkingShift/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/crew/RankWorkingShift/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/RankWorkingShift/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/RankWorkingShift/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/RankWorkingShift/update`;
  public getvessel = `${this.serverUrl.apiServerAddress}api/common/getVessel`;
  public getrank = `${this.serverUrl.apiServerAddress}api/crew/CrewVesselAssignment/getrank`;




  get data(): RankShift[] {
    return this.dataChange.value;
  }

  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }
  getDialogData() {
    return this.dialogData;
  }
  getDateObj(string): any {
    return moment(string, 'DD/MM/YYYY')
  }
  getList() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }

  saveRankShift(RankShift: RankShift, router, notificationService){
     this.httpService.post<RankShift>(this.saveUrl, RankShift).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/application-properties/define-preferences-for-working-hours/define-rank-shift/list-define-rank-shift']);
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

  updateRankShift(RankShift: RankShift, router, notificationService){
    this.httpService.post<RankShift>(this.updateUrl, RankShift).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/application-properties/define-preferences-for-working-hours/define-rank-shift/list-define-rank-shift']);
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