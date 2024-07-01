import { Injectable } from '@angular/core';
import { UOMMaster } from './uom-master.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject, Observable } from 'rxjs';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UomMasterResultBean } from './uom-master-result-bean';

@Injectable({
  providedIn: 'root'
})
export class UomMasterService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<UOMMaster[]> = new BehaviorSubject<UOMMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private getAllMasters = `${this.serverUrl.apiServerAddress}api/master/uom/listUom`;
  public deleteUomUrl = `${this.serverUrl.apiServerAddress}api/master/uom/deleteUom`;
  public editUomMaster = `${this.serverUrl.apiServerAddress}api/master/uom/editUom`;
  public updateUomMaster = `${this.serverUrl.apiServerAddress}api/master/uom/updateUom`;
  public saveUomMaster = `${this.serverUrl.apiServerAddress}api/master/uom/saveUom`;
  public getsequencecode = `${this.serverUrl.apiServerAddress}api/master/uom/getSequenceCode`;

  get data(): UOMMaster[] {
    return this.dataChange.value;
  }
  getDialogData() { 
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<UomMasterResultBean>(this.getAllMasters).subscribe(
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

  addUom(uomMaster: UOMMaster,router,notificationService): void {
    this.dialogData = uomMaster;
    this.httpService.post<UOMMaster>(this.saveUomMaster,uomMaster).subscribe(data => {
      console.log(data);
      if(data.success===true){
        notificationService.showNotification(
          "snackbar-success",
          "UOM Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/master/uom-Master/list-uom']);
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

  UomUpdate(uomMaster: UOMMaster,router,notificationService): void {
    this.dialogData = uomMaster;
    this.httpService.post<UOMMaster>(this.updateUomMaster, uomMaster).subscribe(data => {
      console.log(data);
      if(data.success===true){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/master/uom-Master/list-uom']);
      }
      else if(data.success===false){
        notificationService.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
  });
}

UomDelete(id){
  return this.httpClient.get<any>(this.deleteUomUrl + "?id=" + id);
}

}
