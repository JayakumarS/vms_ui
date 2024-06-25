import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { wagescale } from './wage-scale.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WageScalesService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<wagescale[]> = new BehaviorSubject<wagescale[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private listwage = `${this.serverUrl.apiServerAddress}api/vessels/wagescale/list`;
  private savewage = `${this.serverUrl.apiServerAddress}api/vessels/wagescale/save`;
  public deletewage = `${this.serverUrl.apiServerAddress}api/vessels/wagescale/delete`;
  public editwage = `${this.serverUrl.apiServerAddress}api/vessels/wagescale/edit`;
  public updatewage = `${this.serverUrl.apiServerAddress}api/vessels/wagescale/update`;
 
  get data(): wagescale[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getList() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listwage).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }

  savescale(wagescale: wagescale, router, notificationService) {
    this.httpService.post<wagescale>(this.savewage, wagescale).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/maintain/wage-scale/list-wageScale']);
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

  updatescale(wagescale: wagescale, router, notificationService){
    this.httpService.post<wagescale>(this.updatewage, wagescale).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/vessels/maintain/wage-scale/list-wageScale']);
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
    return this.httpClient.get<any>(this.deletewage + "?id=" + id);
  }
 
}