import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { OffManagerModel } from './off-managers.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficialManagersService {
  
  isTblLoading = true;
  dataChange: BehaviorSubject<OffManagerModel[]> = new BehaviorSubject<OffManagerModel[]>([]);

  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) { }

  get data(): OffManagerModel[] {
    return this.dataChange.value;
  }


  getList(){
    let value,url;
    let list = [{code:"1",description:"Official manager description",city:"Singapore",address:"Abc Street, Cde Road, FGh City, Ijk Country, Pincode 12345.",phone:"9876543210"}];
    this.isTblLoading = false;
    this.dataChange.next(list);
  }
}
