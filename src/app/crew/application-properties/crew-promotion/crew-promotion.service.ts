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

getList(){}
  
}

