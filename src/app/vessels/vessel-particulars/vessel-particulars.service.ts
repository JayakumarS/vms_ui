import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import * as moment from 'moment';
import { vesselsParticulars } from './vessal-particulars.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VesselsParticularsService extends UnsubscribeOnDestroyAdapter{

  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }
  
  getDateObj(string): any {
    return moment(string, 'DD/MM/YYYY')
  }
  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<vesselsParticulars[]> = new BehaviorSubject<vesselsParticulars[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public fleetUrl = `${this.serverUrl.apiServerAddress}api/common/getFleetList`;
  public vesselClassUrl = `${this.serverUrl.apiServerAddress}api/common/getVesselClassList`;
  public vesselTypeUrl = `${this.serverUrl.apiServerAddress}api/common/getVesselType`;
  public vesselInsuranceUrl = `${this.serverUrl.apiServerAddress}api/common/getVesselInsurance`;
  public wageUrl = `${this.serverUrl.apiServerAddress}api/common/getWageScale`;
  public portUrl = `${this.serverUrl.apiServerAddress}api/common/getPort`;
  public flagUrl = `${this.serverUrl.apiServerAddress}api/common/getNationality`;
  public vesselOwnerUrl = `${this.serverUrl.apiServerAddress}api/common/getVesselOwner`;
  public officialMngrUrl = `${this.serverUrl.apiServerAddress}api/common/getOfficialManagers`;
  public saveUrl = `${this.serverUrl.apiServerAddress}api/master/vesselParticular/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/master/vesselParticular/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/master/vesselParticular/edit`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/master/vesselParticular/update`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/master/vesselParticular/delete`;
  public generateCodeUrl = `${this.serverUrl.apiServerAddress}api/master/vesselParticular/generateCode`;
  public shipMngrUrl = `${this.serverUrl.apiServerAddress}api/common/getShipManagers`;
  public currencyListUrl = "";

  get data(): vesselsParticulars[] {
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

  saveVesselParticulars(vesselsParticulars: any, router, notificationService){
    this.httpService.post<any>(this.saveUrl, vesselsParticulars).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/vessel-particulars/list-vessel-particulars']);
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

  updateVesselParticular(vesselsParticulars: any, router, notificationService){
    this.httpService.post<any>(this.updateUrl, vesselsParticulars).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/vessel-particulars/list-vessel-particulars']);
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
    return this.httpClient.get<any>(this.deleteUrl + "?id=" + id);
  }
  



 
}
