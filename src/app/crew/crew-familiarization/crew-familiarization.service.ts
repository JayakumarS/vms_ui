import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Crewfam } from './crew-familiarization.model';

@Injectable({
  providedIn: 'root'
})
export class CrewFamiliarizationService extends UnsubscribeOnDestroyAdapter{

  dataChange: BehaviorSubject<Crewfam[]> = new BehaviorSubject<Crewfam[]>([]);
  
  isTblLoading: boolean;
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): Crewfam[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{familiarization:"MASTER",seaman:"MASTER",vessel:"tesgt",date: '10/10/2020',status: "pending",action:""},{familiarization:"FIRST OFFICER",seaman:"MASTER",vessel:"tesgt",date: '10/10/2020',status: "pending",action:""},
      {familiarization:"SECOND OFFICER",seaman:"MASTER",vessel:"tesgt",date: '10/10/2020',status: "pending",action:""},{familiarization:"THIRD OFFICER",seaman:"MASTER",vessel:"tesgt",date: '10/10/2020',status: "pending",action:""},{familiarization:"OFFR ON WATCH",seaman:"MASTER",vessel:"tesgt",date: '10/10/2020',status: "pending",action:""},{familiarization:"TRAINEE OFFICER",seaman:"MASTER",vessel:"tesgt",date: '10/10/2020',status: "pending",action:""}];
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

  
    getList1(){
      let value,url;
      let list1 = [{familiarization:"MASTER",seaman:"MASTER",vessel:"tesgt",date: '10/10/2020',status: "pending",action:""}];
      this.isTblLoading = false;
      this.dataChange.next(list1);
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
