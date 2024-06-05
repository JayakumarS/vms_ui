import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonlContracts } from './personal-contracts.model';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class PersonalContractsService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<PersonlContracts[]> = new BehaviorSubject<PersonlContracts[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): PersonlContracts[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{code:"YTS",surName:"Balaji",name:"Balaji",active:"yes",rank:"1",nationality:"Indian",gender:"Male",agent:"Sea",status:"Test"}];
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
