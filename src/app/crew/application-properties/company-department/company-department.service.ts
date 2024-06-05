import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CompanyDepartment } from './company-department.model';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';

@Injectable({
  providedIn: 'root'
})
export class CompanyDepartmentService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<CompanyDepartment[]> = new BehaviorSubject<CompanyDepartment[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): CompanyDepartment[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{code:"YTS",description:"Balaji",sorting:"Balaji"}];
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
