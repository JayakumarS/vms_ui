import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { VesselOwner } from './vessel-owner.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VesselOwnerService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<VesselOwner[]> = new BehaviorSubject<VesselOwner[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/vessel/VesselOwner/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/vessel/VesselOwner/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/vessel/VesselOwner/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/vessel/VesselOwner/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/vessel/VesselOwner/update`;


  get data(): VesselOwner[] {
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

  saveVesselOwner(VesselOwner: VesselOwner, router, notificationService){
     this.httpService.post<VesselOwner>(this.saveUrl, VesselOwner).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/maintain/vessel-owner/list-vessel-owner']);
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

  updateVesselOwner(VesselOwner: VesselOwner, router, notificationService){
    this.httpService.post<VesselOwner>(this.updateUrl, VesselOwner).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/maintain/vessel-owner/list-vessel-owner']);
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