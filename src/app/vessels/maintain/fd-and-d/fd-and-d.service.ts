import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { fdandd } from './fd-and-d.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FdAndDService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<fdandd[]> = new BehaviorSubject<fdandd[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  public saveUrl = `${this.serverUrl.apiServerAddress}api/vessel/VesselInsurance/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/vessel/VesselInsurance/listfdandd`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/vessel/VesselInsurance/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/vessel/VesselInsurance/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/vessel/VesselInsurance/update`;

  get data(): fdandd[] {
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

  savefdandd(fdandd: fdandd, router, notificationService){
     this.httpService.post<fdandd>(this.saveUrl, fdandd).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
         router.navigate(['/vessels/maintain/fd-and-d/list-fd-and-d']);
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

  updatefdandd(fdandd: fdandd, router, notificationService){
    this.httpService.post<fdandd>(this.updateUrl, fdandd).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/maintain/fd-and-d/list-fd-and-d']);
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
 
}