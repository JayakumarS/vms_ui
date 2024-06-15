import { Injectable } from '@angular/core';
import { Airlines } from './airlines.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class AirlinesService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Airlines[]> = new BehaviorSubject<Airlines[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): Airlines[] {
    return this.dataChange.value;
  }
  
  getList(){
    let value,url;
    let list = [{    code:"",title:"",phoneNo:"",dddress:""}];
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
