import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { BehaviorSubject } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { fleetmanager } from './fleet-managers-model';

@Injectable({
  providedIn: 'root'
})
export class FleetManagersService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<fleetmanager[]> = new BehaviorSubject<fleetmanager[]>([]);

  currencyList:[];

  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  get data(): fleetmanager[] {
    return this.dataChange.value;
  }
  public saveUrl = `${this.serverUrl.apiServerAddress}api/vessel/FleetManager/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/vessel/FleetManager/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/vessel/FleetManager/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/vessel/FleetManager/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/vessel/FleetManager/update`;
  public getSequenceCode = `${this.serverUrl.apiServerAddress}api/vessel/FleetManager/getSequenceCode`;
  public getFleetUrl = `${this.serverUrl.apiServerAddress}api/common/getFleetList`;
  public getCrewName = `${this.serverUrl.apiServerAddress}api/common/getSeamenName`;

  


  getList(){
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }

  save(fleetmanager: fleetmanager, router, notificationService){
    this.httpService.post<fleetmanager>(this.saveUrl, fleetmanager).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
       router.navigate(['/vessels/maintain/fleet-managers/list-fleet-managers']);
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

 update(fleetmanager: fleetmanager, router, notificationService){
  this.httpService.post<fleetmanager>(this.updateUrl, fleetmanager).subscribe({next: (data: any) => {
    if (data.success == true) {
      notificationService.showNotification(
        "snackbar-success",
        "Record Updated Successfully",
        "bottom",
        "center"
      );
      router.navigate(['/vessels/maintain/fleet-managers/list-fleet-managers']);
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

delete(id){
  return this.httpClient.get<any>(this.deleteUrl + "?id=" + id);
}


}
