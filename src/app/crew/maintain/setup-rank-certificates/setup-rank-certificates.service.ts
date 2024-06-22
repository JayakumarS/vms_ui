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

  private save = `${this.serverUrl.apiServerAddress}api/crew/maintain/rankcertificate/save`;
  public list = `${this.serverUrl.apiServerAddress}api/crew/maintain/rankcertificate/list`;
  public ranklist = `${this.serverUrl.apiServerAddress}api/crew/maintain/rankcertificate/getrank`;
  public getsaveList = `${this.serverUrl.apiServerAddress}api/crew/maintain/rankcertificate/savelist`;
  // public updateURL= `${this.serverUrl.apiServerAddress}api/`;
  

  

  //list

  getList(){
    this.isTblLoading = true; 
    this.httpService.get<any>(this.list).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }
  //save
  addrank(setuprank:setuprank, router, notificationService): void {
    this.dialogData = setuprank;
    this.httpService.post<setuprank>(this.save, setuprank).subscribe(data => {
      console.log(data);
      if (data) {
       
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/setup-rank/add-setuprank']);
      }
      else {
        
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
