import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HealthStatus } from './health-status.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HealthStatusService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<HealthStatus[]> = new BehaviorSubject<HealthStatus[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/HealthStatus/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/crew/HealthStatus/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/HealthStatus/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/HealthStatus/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/HealthStatus/update`;


  get data(): HealthStatus[] {
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

  saveeHealthStatus(HealthStatus: HealthStatus, router, notificationService){
     this.httpService.post<HealthStatus>(this.saveUrl, HealthStatus).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/health-status/list-health-status']);
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

  updateHealthStatus(HealthStatus: HealthStatus, router, notificationService){
    this.httpService.post<HealthStatus>(this.updateUrl, HealthStatus).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/health-status/list-health-status']);
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