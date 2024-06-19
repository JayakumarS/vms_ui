import { Injectable } from '@angular/core';
import { PortMaster } from './port-master.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { PortMasterResultBean } from './port-master-result-bean';

@Injectable({
  providedIn: 'root'
})
export class PortMasterService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<PortMaster[]> = new BehaviorSubject<PortMaster[]>(
    []
  );
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/master/port/listPort`;
  private savePortMaster = `${this.serverUrl.apiServerAddress}api/master/port/savePort`;
  private updatePortMaster = `${this.serverUrl.apiServerAddress}api/master/port/updatePort`;
  private deletePortUrl = `${this.serverUrl.apiServerAddress}api/master/port/deletePort`;
  public editPortMaster = `${this.serverUrl.apiServerAddress}api/master/port/editPort`;

  get data(): PortMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllList(): void {
    this.subs.sink = this.httpService.get<PortMasterResultBean>(this.getAllMasters).subscribe(
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

addPort(portMaster: PortMaster,router,notificationService): void {
this.dialogData = portMaster;
this.httpService.post<PortMaster>(this.savePortMaster,portMaster).subscribe(data => {
  console.log(data);
  if(data.success===true){
    notificationService.showNotification(
      "snackbar-success",
      "Country Added successfully...",
      "bottom",
      "center"
    );
    router.navigate(['/vessels/master/port-Master/list-port-master']);
  }
  else if(data.success===false){
    notificationService.showNotification(
      "snackbar-danger",
      "Save Failed ...!!!",
      "bottom",
      "center"
    );
  }
  },
  (err: HttpErrorResponse) => {
    
});
}

portUpdate(portMaster: PortMaster,router,notificationService): void {
this.dialogData = portMaster;
this.httpService.post<PortMaster>(this.updatePortMaster, portMaster).subscribe(data => {
  console.log(data);
  if(data.success===true){
    notificationService.showNotification(
      "snackbar-success",
      "Updated Record Successfully...!!!",
      "bottom",
      "center"
    );
    router.navigate(['/vessels/master/port-Master/list-port-master']);
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
portDelete(countryCode: any): Observable<any>  {
return  this.httpClient.get<any>(this.deletePortUrl+"?id="+countryCode);
};

}
