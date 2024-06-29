import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrewPromotion } from './crew-promotion.model';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CrewPromotionService {
  isTblLoading = true;
  dataChange: BehaviorSubject<CrewPromotion[]> = new BehaviorSubject<CrewPromotion[]>([]);

  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) { }
  get data(): CrewPromotion[] {
    return this.dataChange.value;
  }

  public getranklist = `${this.serverUrl.apiServerAddress}api/common/getRankMasters`;
  public getnationalitylist = `${this.serverUrl.apiServerAddress}api/common/getNationality`;
  public getvesseltypelist = `${this.serverUrl.apiServerAddress}api/common/getVesselType`;

  getList(){
    let value,url;
    let list = [{currank:"First Officer",prorank:"Second Officer",nationality:"India",vesseltype:"Bulk Carrier",promoyears:"2"}];
    this.isTblLoading = false;
    this.dataChange.next(list);
  }
  
}

