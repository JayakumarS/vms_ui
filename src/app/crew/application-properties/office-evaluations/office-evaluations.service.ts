import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ofcevaluation } from './office-evaluations.model';

@Injectable({
  providedIn: 'root'
})
export class OfficeEvaluationsService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<ofcevaluation[]> = new BehaviorSubject<ofcevaluation[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): ofcevaluation[] {
    return this.dataChange.value;
  }

   // Temporarily stores data from dialogs
   dialogData: any;
   
  private save = `${this.serverUrl.apiServerAddress}api/`;
  private getList = `${this.serverUrl.apiServerAddress}api/`;
  private deleteURL = `${this.serverUrl.apiServerAddress}api/`;
  public editURL = `${this.serverUrl.apiServerAddress}api/`;
  public updateURL= `${this.serverUrl.apiServerAddress}api/`;

  getAllList(){
    
  }
  addevaluation(ofcevaluation:ofcevaluation, router, notificationService, spinner): void {
    this.dialogData = ofcevaluation;
    this.httpService.post<ofcevaluation>(this.save, ofcevaluation).subscribe(data => {
      console.log(data);
      if (data) {
        spinner.hide();
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/crew/application-properties/office-evaluation/list-officeevaluation']);
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
