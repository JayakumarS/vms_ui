
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserAgentLink } from './user-agent-link.model';

@Injectable({
  providedIn: 'root'
})
export class UserAgentLinkService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<UserAgentLink[]> = new BehaviorSubject<UserAgentLink[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): UserAgentLink[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{crewuser:"RJG-RAJIV GANDHI",agent:"APEX MARINE SERVICES PVT LTD"}];
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
