import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UnitsPackings} from './units-packings.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UnitsPackingsService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<UnitsPackings[]> = new BehaviorSubject<UnitsPackings[]>([]);

  public generateCodeUrl = `${this.serverUrl.apiServerAddress}api/supplies/unitsPacking/generateCode`;
  public uomUrl = `${this.serverUrl.apiServerAddress}api/common/getUom`;
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): UnitsPackings[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{    unitGroup:"Kgr",conversionFactor:"0,64374",abbreviation:"PACK-24 OZ",unitLock:"N"}];
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
