import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { InterviewSetup } from './interview-setup.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewSetupService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<InterviewSetup[]> = new BehaviorSubject<InterviewSetup[]>([]);
  
  constructor(  private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService) {

      super();

     }
     get data(): InterviewSetup[] {
      return this.dataChange.value;
    }

    getList(){
    
    }
}
