import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { PersonMaintenance } from './person-maintenance.model';

@Injectable({
  providedIn: 'root'
})
export class PersonMaintenanceService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<PersonMaintenance[]> = new BehaviorSubject<PersonMaintenance[]>([]);

  //API'S
  public countryUrl = `${this.serverUrl.apiServerAddress}api/common/getCountry`;
  public rankListUrl = `${this.serverUrl.apiServerAddress}api/common/getRankMasters`;
  public agentListUrl = `${this.serverUrl.apiServerAddress}api/common/getAgents`;
  public religionListUrl = `${this.serverUrl.apiServerAddress}api/common/getReligion`;
  public licenseUrl = `${this.serverUrl.apiServerAddress}api/common/getLicense`;
  public healthStatusUrl = `${this.serverUrl.apiServerAddress}api/common/getHealthStatus`;
  public workStatusUrl = `${this.serverUrl.apiServerAddress}api/common/getWorkStatus`;
  public vesselTypeUrl = `${this.serverUrl.apiServerAddress}api/common/getVesselType`;
  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/personMaintenance/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/crew/personMaintenance/list`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/personMaintenance/delete`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/personMaintenance/edit`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/personMaintenance/update`;
  public uploadFileUrl = `${this.serverUrl.apiServerAddress}api/crew/personMaintenance/fileUpload`;
  public applicantListUrl = `${this.serverUrl.apiServerAddress}api/crew/personMaintenance/getApplicantList`;
  public detailsUrl = `${this.serverUrl.apiServerAddress}api/crew/personMaintenance/getdetails`;
  
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): PersonMaintenance[] {
    return this.dataChange.value;
  }

  getList() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }

  save(person: any, router, notificationService){
    this.httpService.post<any>(this.saveUrl, person).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/applications/person-maintenance/list-person-maintenance']);
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

  update(person: any, router, notificationService){
    this.httpService.post<any>(this.updateUrl, person).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/applications/person-maintenance/list-person-maintenance']);
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
