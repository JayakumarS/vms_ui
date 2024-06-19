import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject } from 'rxjs';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { setuprank } from './setup-rank-certificates.model';

@Injectable({
  providedIn: 'root'
})
export class SetupRankCertificatesService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<setuprank[]> = new BehaviorSubject<setuprank[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;

  get data(): setuprank[] {
    return this.dataChange.value;
  }
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private save = `${this.serverUrl.apiServerAddress}api/`;
  private getList = `${this.serverUrl.apiServerAddress}api/`;
  private deleteURL = `${this.serverUrl.apiServerAddress}api/`;
  public editURL = `${this.serverUrl.apiServerAddress}api/`;
  public updateURL= `${this.serverUrl.apiServerAddress}api/`;
  

  //save
  addrank(setuprank:setuprank, router, notificationService, spinner): void {
    this.dialogData = setuprank;
    this.httpService.post<setuprank>(this.save, setuprank).subscribe(data => {
      console.log(data);
      if (data) {
        spinner.hide();
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/libraryfile/list-library']);
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
  
  
  //Update
  Updaterank(setuprank: setuprank,router,notificationService): void {
    this.dialogData = setuprank;
    this.httpService.post<setuprank>(this.updateURL, setuprank).subscribe(data => {
      console.log(data);
      if(data){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/libraryfile/list-library']);
      }
      else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated ...!!!",
          "bottom",
          "center"
          );
        }
    });
  }
  
}
