import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { application } from './applications.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<application[]> = new BehaviorSubject<application[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): application[] {
    return this.dataChange.value;
  }
   // Temporarily stores data from dialogs
   dialogData: any;
   
  private save = `${this.serverUrl.apiServerAddress}api/`;
  private getAllList = `${this.serverUrl.apiServerAddress}api/`;
  private deleteURL = `${this.serverUrl.apiServerAddress}api/`;
  public editURL = `${this.serverUrl.apiServerAddress}api/`;
  public updateURL= `${this.serverUrl.apiServerAddress}api/`;


  getList(){
    
  }

  addapp(application:application, router, notificationService, spinner): void {
    this.dialogData = application;
    this.httpService.post<application>(this.save, application).subscribe(data => {
      console.log(data);
      if (data) {
        spinner.hide();
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/crew/applications/applications/list-applications']);
      }
      else {
        spinner.hide();
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated...!!!",
          "bottom",
          "center"
        );
      }
    },
      (err: HttpErrorResponse) => {
  
      });
  

  }
}
