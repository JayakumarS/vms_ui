
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MaintainRankResultBean } from './maintain-rank-result-bean';
import { MaintainRank } from './maintain-rank.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MaintainRankService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<MaintainRank[]> = new BehaviorSubject<MaintainRank[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }


  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/maintainRank/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/crew/maintainRank/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/maintainRank/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/maintainRank/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/maintainRank/update`;
  public getdepartment = `${this.serverUrl.apiServerAddress}api/crew/maintainRank/getdepartment`;
  public getgrouppage = `${this.serverUrl.apiServerAddress}api/crew/maintainRank/getgrouppage`;

  
  get data(): MaintainRank[] {
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
  


  saveRank(MaintainRank: MaintainRank, router, notificationService){
    this.httpService.post<MaintainRank>(this.saveUrl, MaintainRank).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
       router.navigate(['/crew/maintain/maintain-rank/list-maintain-rank']);
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

 updateRank(MaintainRank: MaintainRank, router, notificationService){
  this.httpService.post<MaintainRank>(this.updateUrl, MaintainRank).subscribe({next: (data: any) => {
    if (data.success == true) {
      notificationService.showNotification(
        "snackbar-success",
        "Record Updated Successfully",
        "bottom",
        "center"
      );
      router.navigate(['/crew/maintain/maintain-rank/list-maintain-rank']);
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