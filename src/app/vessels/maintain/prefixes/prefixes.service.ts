import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrefixesModel } from './prefixes.model';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class PrefixesService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<PrefixesModel[]> = new BehaviorSubject<PrefixesModel[]>([]);

  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }
  get data(): PrefixesModel[] {
    return this.dataChange.value;
  }

  
getList(){
  let value,url;
    let list = [{code:"YTS",description:"test description"}]
    this.isTblLoading = false;
    this.dataChange.next(list);
}
}
