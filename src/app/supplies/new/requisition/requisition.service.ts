import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Requisition } from './requisition.model';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService extends UnsubscribeOnDestroyAdapter{

  
  isTblLoading = true;
  dataChange: BehaviorSubject<Requisition[]> = new BehaviorSubject<Requisition[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): Requisition[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{vessel:"GODA-GODAVARI",department:"Head",rCode:"OC-515",budget:"Budget-1"}];
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
