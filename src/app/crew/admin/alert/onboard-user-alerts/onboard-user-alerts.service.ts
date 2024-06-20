import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserAlerts } from './onboard-user-alerts.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardUserAlertsService extends UnsubscribeOnDestroyAdapter{

  dataChange: BehaviorSubject<UserAlerts[]> = new BehaviorSubject<UserAlerts[]>([]);
  isTblLoading: boolean;
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): UserAlerts[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{vessel:"Test Scale",dataType:"INR"}];
    this.isTblLoading = false;
    this.dataChange.next(list);
    // this.subs.sink = this.httpService.post<any>(url,value).subscribe(
    //   (data) => {
    //     this.isTblLoading = false;
    //     this.dataChange.next(list);
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.isTblLoading = false;
    //     console.log(error.name + " " + error.message);
    //   }
    // );
  }
}
