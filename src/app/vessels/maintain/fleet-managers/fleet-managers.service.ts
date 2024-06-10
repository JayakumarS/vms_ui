import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { FleetModel } from './fleet.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FleetManagersService {
  isTblLoading = true;
  dataChange: BehaviorSubject<FleetModel[]> = new BehaviorSubject<FleetModel[]>([]);

  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) { }

  get data(): FleetModel[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{fleet:"Ship Management SZE",opmanager:"Attar Mohammed",techmanager:"Reza"}];
    this.isTblLoading = false;
    this.dataChange.next(list);
  }
}
