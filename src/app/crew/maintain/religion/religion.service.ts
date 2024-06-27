import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Religion } from './religion.model';

@Injectable({
  providedIn: 'root'
})
export class ReligionService extends UnsubscribeOnDestroyAdapter{
  
  isTblLoading = true;
 
  
  dataChange: BehaviorSubject<Religion[]> = new BehaviorSubject<Religion[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/religion/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/religion/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/religion/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/religion/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/religion/update`;
  public getSequenceCode = `${this.serverUrl.apiServerAddress}api/crew/maintain/religion/getSequenceCode`;


  get data(): Religion[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getList() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }

  saveReligion(religion: Religion, router, notificationService){
     this.httpService.post<Religion>(this.saveUrl, religion).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/religion/list-religion']);
      }else{
        notificationService.showNotification(
          "snackbar-danger",
         data.message,
          "bottom",
          "center"
        );
      }
      }, error: (err) => console.log(err)
     });
  }

  updateReligion(religion: Religion, router, notificationService){
    this.httpService.post<Religion>(this.updateUrl, religion).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/religion/list-religion']);
      }else{
        notificationService.showNotification(
          "snackbar-danger",
          data.message,
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