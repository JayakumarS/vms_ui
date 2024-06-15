import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ChangeReqModel } from './change-req-dept.model';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';

@Injectable({
  providedIn: 'root'
})
export class ChangeReqDeptService extends UnsubscribeOnDestroyAdapter {
  
  isTblLoading = true;
  dataChange: BehaviorSubject<ChangeReqModel[]> = new BehaviorSubject<ChangeReqModel[]>([]);

  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) { 
    super();
  }

  get data(): ChangeReqModel[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{department:"FUEL TESTING",code:1,date:"14-June-2024",budget:"FUEL SAMPLE TEST KITS"}];
    this.isTblLoading = false;
    this.dataChange.next(list);

  }
}
