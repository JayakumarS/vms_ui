import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CrewVesselAssignment } from './crew-vessel-assignment.model';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CrewVesselAssignmentService extends UnsubscribeOnDestroyAdapter{
  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }
  
  getDateObj(string): any {
    return moment(string, 'DD/MM/YYYY')
  }
  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<CrewVesselAssignment[]> = new BehaviorSubject<CrewVesselAssignment[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public getvessel = `${this.serverUrl.apiServerAddress}api/common/getVessel`;
  public getrank = `${this.serverUrl.apiServerAddress}api/common/getRankMasters`;
  public getport = `${this.serverUrl.apiServerAddress}api/crew/CrewVesselAssignment/getport`;

  
  public listUrl = `${this.serverUrl.apiServerAddress}api/crew/WorkStatus/edit`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/WorkStatus/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/WorkStatus/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/WorkStatus/update`;
  public getList = `${this.serverUrl.apiServerAddress}api/crew/CrewVesselAssignment/showlist`;


  get data(): CrewVesselAssignment[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  // getList() {
  //   this.isTblLoading = true; 
  //   this.httpService.get<any>(this.listUrl).subscribe({next: (data: any) => {
  //       this.isTblLoading = false;
  //       this.dataChange.next(data.list);
  //     }, error: (err) => console.log(err)
  //    });
  // }

  save(CrewVesselAssignment: CrewVesselAssignment, router, notificationService){
    this.httpService.post<CrewVesselAssignment>(this.getList, CrewVesselAssignment).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
        // router.navigate(['/crew/applications/applications/list-applications']);
     }else{
       notificationService.showNotification(
         "snackbar-danger",
         "Not Updated",
         "bottom",
         "center"
       );
     }
     }, error: (err) => console.log(err)
    });
 }
 
}