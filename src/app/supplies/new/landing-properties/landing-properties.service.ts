import { Injectable } from '@angular/core';
import { LandingProperties } from './landing-properties.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class LandingPropertiesService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<LandingProperties[]> = new BehaviorSubject<LandingProperties[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): LandingProperties[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{vessel:"GODA-GODAVARI",department:"Head",totalWeight:"OC-515",approver:"Budget-1"}];
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
