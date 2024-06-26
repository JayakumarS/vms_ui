import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { Familiarization } from './familiarization-type.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class FamiliarizationTypesService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<Familiarization[]> = new BehaviorSubject<Familiarization[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): Familiarization[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{code:"ONBOARD",description:"Shipboard Familiarization",sorting:4},{code:"ECDIS",description:"ECDIS Familiarization Checklist",sorting:5},{code:"LIFTING APP",description:"Familiarization - Operate Ship's Lifting Appliance",sorting:6},
      {code:"BRIEFING",description:"BRIEFING of Mater & Senior Officers",sorting:1},{code:"DEBRIEFING",description:"DE-BRIEFING of Master & Senior Officers",sorting:4}
    ];
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
