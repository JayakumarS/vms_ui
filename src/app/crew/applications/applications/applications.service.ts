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

  get data(): application[] {
    return this.dataChange.value;
  }
   // Temporarily stores data from dialogs
   dialogData: any;
   
  private getAllList = `${this.serverUrl.apiServerAddress}api/`;
  private deleteURL = `${this.serverUrl.apiServerAddress}api/`;
  public getvessel = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/getvessel`;
  public getrank = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/getrank`;
  public getnationality = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/getnationality`;
  public getagent = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/getagent`;
  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/save`;
  public listUrl =`${this.serverUrl.apiServerAddress}api/crew/Crewapplications/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/edit`;
  public updateUrl= `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/update`;
  public getlicence = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/getlicence`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/delete`;
  public uploadFilePI = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/uploadfile`;
  public getenginelist = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/getenginelist`;
  public getCertificate = `${this.serverUrl.apiServerAddress}api/crew/Crewapplications/certificateList`;
  
  
  
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
}
