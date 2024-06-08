import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CommTypesModel } from './comm-types.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';

@Injectable({
  providedIn: 'root'
})
export class CommunicationTypesService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<CommTypesModel[]> = new BehaviorSubject<CommTypesModel[]>([]);

  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): CommTypesModel[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
      let list = [{code:"YTS",description:"test description"}]
      this.isTblLoading = false;
      this.dataChange.next(list);
  }
}
