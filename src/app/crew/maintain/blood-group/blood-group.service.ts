import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BloodGroup } from './blood-group.model';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class BloodGroupService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
 
  dataChange: BehaviorSubject<BloodGroup[]> = new BehaviorSubject<BloodGroup[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/bloodgroup/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/bloodgroup/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/bloodgroup/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/bloodgroup/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/bloodgroup/update`;
  


  get data(): BloodGroup[] {
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

  saveBloodGroup(bloodGroup: BloodGroup, router, notificationService){
     this.httpService.post<BloodGroup>(this.saveUrl, bloodGroup).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/blood-group/list-blood-group']);
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

  updateBloodGroup(bloodGroup: BloodGroup, router, notificationService){
    this.httpService.post<BloodGroup>(this.updateUrl, bloodGroup).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/blood-group/list-blood-group']);
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