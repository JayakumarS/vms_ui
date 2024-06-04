import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactsKne } from './contracts-kne.model';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class ContractsKNEService extends UnsubscribeOnDestroyAdapter{

  dataChange: BehaviorSubject<ContactsKne[]> = new BehaviorSubject<ContactsKne[]>([]);
  isTblLoading: boolean;
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): ContactsKne[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{wageScale:"Test Scale",currency:"INR",validFrom:"10/01/2023",validTo:"10/05/2023"}];
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
