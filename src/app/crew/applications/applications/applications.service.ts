import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { application } from './applications.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<application[]> = new BehaviorSubject<application[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }
   
  popArr=[];
   
  getPopArr(){
    return this.popArr
  }

  setPopArr(arr){
    this.popArr = arr;
  }
  get data(): application[] {
    return this.dataChange.value;
  }
   // Temporarily stores data from dialogs
   dialogData: any;
  
  public getvessel = `${this.serverUrl.apiServerAddress}api/common/getVessel`;
  public getrank = `${this.serverUrl.apiServerAddress}api/common/getRankMasters`;
  public getnation = `${this.serverUrl.apiServerAddress}api/common/getNationality`;
  public getagent = `${this.serverUrl.apiServerAddress}api/common/getAgents`;
  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/save`;
  public listUrl =`${this.serverUrl.apiServerAddress}api/crew/Crewapplications/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/edit`;
  public updateUrl= `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/update`;
  public getlicence = `${this.serverUrl.apiServerAddress}api/common/getLicense`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/delete`;
  public uploadFilePI = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/uploadfile`;
  public getenginelist = `${this.serverUrl.apiServerAddress}api/common/getExpEngine`;
  public getCertificate = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/certificateList`;
  public savecertificateUrl = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/saveCertificate`;
  public getmedicalCertificate = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/mcertificateList`;

  
  
  getList(){
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }


  save(application: application, router, notificationService){
    this.httpService.post<application>(this.saveUrl, application).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
        router.navigate(['/crew/applications/applications/list-applications']);
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

 update(application: application, router, notificationService){
  this.httpService.post<application>(this.updateUrl, application).subscribe({next: (data: any) => {
    if (data.success == true) {
      notificationService.showNotification(
        "snackbar-success",
        "Record Updated Successfully",
        "bottom",
        "center"
      );
      router.navigate(['/crew/applications/applications/list-applications']);
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

savecertificate(application: application, router, notificationService){
  this.httpService.post<application>(this.savecertificateUrl, application).subscribe({next: (data: any) => {
   if (data.success == true) {
     notificationService.showNotification(
       "snackbar-success",
       "Record Added Successfully",
       "bottom",
       "center"
     );
      router.navigate(['/crew/applications/applications/list-applications']);
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
