import { Injectable } from '@angular/core';
import { ECommerceSuppliersReference } from './e-commerce-suppliers-reference.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { BehaviorSubject } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class ECommerceSuppliersReferenceService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<ECommerceSuppliersReference[]> = new BehaviorSubject<ECommerceSuppliersReference[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): ECommerceSuppliersReference[] {
    return this.dataChange.value;
  }
 

 
  getList(){
    let value,url;
    let list = [{webCode:"",webSupCode:"",webSupName:""}];
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
  // getList2(){
  //   let value,url;
  //   let list = [{shipservCode:"GODA-GODAVARI",shipservSupCode:"Head",shipservSupName:"OC-515",shipservContRefer:"Budget-1"}];
  //   this.isTblLoading = false;
  //   this.dataChange.next(list);
  //   // this.subs.sink = this.httpService.post<any>(url,value).subscribe(
  //   //   (data) => {
  //   //     this.isTblLoading = false;
  //   //     this.dataChange.next(list);
  //   //   },
  //   //   (error: HttpErrorResponse) => {
  //   //     this.isTblLoading = false;
  //   //     console.log(error.name + " " + error.message);
  //   //   }
  //   // );
  // }

  // getList3(){
  //   let value,url;
  //   let list = [{procureshipCode:"GODA-GODAVARI",procureSupCode:"Head",procureSupName:"OC-515",procureContRefer:"Budget-1"}];
  //   this.isTblLoading = false;
  //   this.dataChange.next(list);
  //   // this.subs.sink = this.httpService.post<any>(url,value).subscribe(
  //   //   (data) => {
  //   //     this.isTblLoading = false;
  //   //     this.dataChange.next(list);
  //   //   },
  //   //   (error: HttpErrorResponse) => {
  //   //     this.isTblLoading = false;
  //   //     console.log(error.name + " " + error.message);
  //   //   }
  //   // );
  // }

  // getList4(){
  //   let value,url;
  //   let list = [{mespasCode:"GODA-GODAVARI",mespasSupCode:"Head",mespasSupName:"OC-515",mespasContRefer:"Budget-1"}];
  //   this.isTblLoading = false;
  //   this.dataChange.next(list);
  //   // this.subs.sink = this.httpService.post<any>(url,value).subscribe(
  //   //   (data) => {
  //   //     this.isTblLoading = false;
  //   //     this.dataChange.next(list);
  //   //   },
  //   //   (error: HttpErrorResponse) => {
  //   //     this.isTblLoading = false;
  //   //     console.log(error.name + " " + error.message);
  //   //   }
  //   // );
  // }
  
  // getList5(){
  //   let value,url;
  //   let list = [{seaProcCode:"GODA-GODAVARI",seaProcSupCode:"Head",seaProcSupName:"OC-515",seaProcContRefer:"Budget-1"}];
  //   this.isTblLoading = false;
  //   this.dataChange.next(list);
  //   // this.subs.sink = this.httpService.post<any>(url,value).subscribe(
  //   //   (data) => {
  //   //     this.isTblLoading = false;
  //   //     this.dataChange.next(list);
  //   //   },
  //   //   (error: HttpErrorResponse) => {
  //   //     this.isTblLoading = false;
  //   //     console.log(error.name + " " + error.message);
  //   //   }
  //   // );
  // }
}
