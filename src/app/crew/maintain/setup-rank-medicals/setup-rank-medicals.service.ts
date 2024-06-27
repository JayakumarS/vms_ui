import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject } from 'rxjs';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { setupmedical } from './setup-rank-medicals.model';

@Injectable({
  providedIn: 'root'
})
export class SetupRankMedicalsService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<setupmedical[]> = new BehaviorSubject<setupmedical[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;

  get data(): setupmedical[] {
    return this.dataChange.value;
  }
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private save = `${this.serverUrl.apiServerAddress}api/crew/maintain/rankmedicals/save`;
  public list = `${this.serverUrl.apiServerAddress}api/crew/maintain/rankmedicals/list`;
  public ranklist = `${this.serverUrl.apiServerAddress}api/crew/maintain/rankmedicals/getrank`;
  public getsaveList = `${this.serverUrl.apiServerAddress}api/crew/maintain/rankmedicals/savelist`;
  


  
 //save
 addmedical(setuptraining:setupmedical, router, notificationService): void {
  this.dialogData = setuptraining;
  this.httpService.post<setupmedical>(this.save, setuptraining).subscribe(data => {
    console.log(data);
    if (data) {
      
      notificationService.showNotification(
        "snackbar-success",
        "Record Added successfully...",
        "bottom",
        "center"
      );
      router.navigate(['/crew/maintain/setup-rankmedical/add-setupmedical']);
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
