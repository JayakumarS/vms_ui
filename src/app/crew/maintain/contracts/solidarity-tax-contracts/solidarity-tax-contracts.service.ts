import { Injectable } from '@angular/core';
import { SolidarityTaxContracts } from './solidarity-tax-contracts.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class SolidarityTaxContractsService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<SolidarityTaxContracts[]> = new BehaviorSubject<SolidarityTaxContracts[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): SolidarityTaxContracts[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [
      {currency:"UST",fromDate:"14/03/2024",toDate:"4/02/2024",item:"TDS",proportionalCalculation:"yes"},
      {currency:"INR",fromDate:"14/01/2024",toDate:"4/03/2024",item:"TDS",proportionalCalculation:"no"},
      {currency:"AED",fromDate:"14/02/2024",toDate:"12/01/2024",item:"TDS",proportionalCalculation:"yes"},
      {currency:"UST",fromDate:"14/03/2024",toDate:"4/02/2024",item:"TDS",proportionalCalculation:"no"},
      {currency:"AED",fromDate:"14/04/2024",toDate:"17/05/2024",item:"TDS",proportionalCalculation:"yes"},
      {currency:"UST",fromDate:"14/05/2024",toDate:"4/06/2024",item:"TDS",proportionalCalculation:"no"}
];
    

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
