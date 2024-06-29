import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrefixesModel } from './prefixes.model';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class PrefixesService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<PrefixesModel[]> = new BehaviorSubject<PrefixesModel[]>([]);

  public listUrl = `${this.serverUrl.apiServerAddress}api/master/vesselPrefix/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/master/vesselPrefix/edit`;
  public saveUrl = `${this.serverUrl.apiServerAddress}api/master/vesselPrefix/save`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/master/vesselPrefix/update`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/master/vesselPrefix/delete`;

  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }
  get data(): PrefixesModel[] {
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

  saveVesselPrefix(prefixesModel: PrefixesModel, router, notificationService){
    this.httpService.post<PrefixesModel>(this.saveUrl, prefixesModel).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
       router.navigate(['/vessels/maintain/prefixes/list-prefixes']);
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

 updateVesselPrefix(prefixesModel: PrefixesModel, router, notificationService){
  this.httpService.post<PrefixesModel>(this.updateUrl, prefixesModel).subscribe({next: (data: any) => {
    if (data.success == true) {
      notificationService.showNotification(
        "snackbar-success",
        "Record Updated Successfully",
        "bottom",
        "center"
      );
      router.navigate(['/vessels/maintain/prefixes/list-prefixes']);
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
