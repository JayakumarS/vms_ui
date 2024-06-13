import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DepartmentBudget } from './department-budgets.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';

@Injectable({
  providedIn: 'root'
})
export class DepartmentBudgetsService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<DepartmentBudget[]> = new BehaviorSubject<DepartmentBudget[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): DepartmentBudget[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [
      {department:"AGENCY FEES",desc:"AGENCY FEES / EHS",alert:"100",valid:"Yes"},
      {department:"INSURANCE - BKR",desc:"INSURANCE - BUNKER",alert:"100",valid:"No"}
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
