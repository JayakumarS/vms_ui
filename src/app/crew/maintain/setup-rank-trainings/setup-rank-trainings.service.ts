import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject } from 'rxjs';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { setuptraining } from './setup-rank-trainings.model';

@Injectable({
  providedIn: 'root'
})
export class SetupRankTrainingsService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<setuptraining[]> = new BehaviorSubject<setuptraining[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;

  get data(): setuptraining[] {
    return this.dataChange.value;
  }
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private save = `${this.serverUrl.apiServerAddress}api/crew/maintain/ranktrainings/save`;
  public list = `${this.serverUrl.apiServerAddress}api/crew/maintain/ranktrainings/list`;
  public ranklist = `${this.serverUrl.apiServerAddress}api/crew/maintain/ranktrainings/getrank`;
  public getsaveList = `${this.serverUrl.apiServerAddress}api/crew/maintain/ranktrainings/savelist`;
  


  
 //save
 addtraining(setuptraining:setuptraining, router, notificationService): void {
  this.dialogData = setuptraining;
  this.httpService.post<setuptraining>(this.save, setuptraining).subscribe(data => {
    console.log(data);
    if (data) {
      
      notificationService.showNotification(
        "snackbar-success",
        "Record Added successfully...",
        "bottom",
        "center"
      );
      router.navigate(['/crew/maintain/setup-ranktraining/add-setuptraining']);
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
