import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { ShipModel } from './ship-mangers.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipManagersService {

  isTblLoading = true;
  dataChange: BehaviorSubject<ShipModel[]> = new BehaviorSubject<ShipModel[]>([]);

  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) { }

  get data(): ShipModel[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{shipman:"GFS",name:"GFS Ship Management"}];
    this.isTblLoading = false;
    this.dataChange.next(list);
  }
}
