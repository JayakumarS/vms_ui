import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { WorkLicense } from './work-license.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WorkLicenseService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<WorkLicense[]> = new BehaviorSubject<WorkLicense[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/WorkLicense/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/crew/WorkLicense/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/WorkLicense/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/WorkLicense/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/WorkLicense/update`;


  get data(): WorkLicense[] {
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

  saveeworkLicense(WorkLicense: WorkLicense, router, notificationService){
     this.httpService.post<WorkLicense>(this.saveUrl, WorkLicense).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/work-license/list-Work-License']);
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

  updateworkLicense(WorkLicense: WorkLicense, router, notificationService){
    this.httpService.post<WorkLicense>(this.updateUrl, WorkLicense).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/work-license/list-Work-License']);
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