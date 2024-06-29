import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { IceModel } from './ice-class.model';
import { BehaviorSubject } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class IceClassService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<IceModel[]> = new BehaviorSubject<IceModel[]>(
    []
  );

  constructor(
    private httpClient: HttpClient,
     private serverUrl: serverLocations,
      private httpService: HttpServiceService
  ) { 
    super();
  }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/vessel/iceClass/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/vessel/iceClass/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/vessel/iceClass/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/vessel/iceClass/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/vessel/iceClass/update`;
  public getSequenceCode = `${this.serverUrl.apiServerAddress}api/vessel/iceClass/getSequenceCode`;

  
  get data(): IceModel[] {
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

  saveIceClass(icemodel: IceModel, router, notificationService){
    this.httpService.post<IceModel>(this.saveUrl, icemodel).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
       router.navigate(['/vessels/maintain/ice-class/list-ice-class']);
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

 updateIceClass(icemodel: IceModel, router, notificationService){
  this.httpService.post<IceModel>(this.updateUrl, icemodel).subscribe({next: (data: any) => {
    if (data.success == true) {
      notificationService.showNotification(
        "snackbar-success",
        "Record Updated Successfully",
        "bottom",
        "center"
      );
      router.navigate(['/vessels/maintain/ice-class/list-ice-class']);
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
