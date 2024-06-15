import { Injectable } from '@angular/core';
import { TravelAgencies } from './travel-agencies.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TravelAgenciesService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<TravelAgencies[]> = new BehaviorSubject<TravelAgencies[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): TravelAgencies[] {
    return this.dataChange.value;
  }
  
  getList(){
    let value,url;
    let list = [{    code:"",name:"",email:"",address:"",city:"",postCode:"",phones:"",fax:"",responsible:"",travelAgent:"",autosent:""}];
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
