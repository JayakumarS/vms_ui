import { Injectable } from '@angular/core';
import { TicketTypes } from './ticket-types.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject } from 'rxjs';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class TicketTypesService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<TicketTypes[]> = new BehaviorSubject<TicketTypes[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): TicketTypes[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{    code:"",desc:""}];
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
