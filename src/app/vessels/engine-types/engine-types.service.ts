import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EngineModel } from './engine-types.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class EngineTypesService extends UnsubscribeOnDestroyAdapter {
  
  isTblLoading = true;
  dataChange: BehaviorSubject<EngineModel[]> = new BehaviorSubject<EngineModel[]>([]);

  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
   }
   get data(): EngineModel[] {
    return this.dataChange.value;
  }
  getList(){
    let value,url;
      let list = [{code:"YTS",description:"test description"}]
      this.isTblLoading = false;
      this.dataChange.next(list);
  }
}
