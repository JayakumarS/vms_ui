import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Medicals } from './medicals-model';

@Injectable({
  providedIn: 'root'
})
export class MedicalsService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<Medicals[]> = new BehaviorSubject<Medicals[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private listMedical = `${this.serverUrl.apiServerAddress}api/crew/maintain/medical/list`;
  private saveMedical = `${this.serverUrl.apiServerAddress}api/crew/maintain/medical/save`;
  public deleteMedical = `${this.serverUrl.apiServerAddress}api/crew/maintain/medical/delete`;
  public editmed = `${this.serverUrl.apiServerAddress}api/crew/maintain/medical/edit`;
  public updateMedical = `${this.serverUrl.apiServerAddress}api/crew/maintain/medical/update`;
 
  get data(): Medicals[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getList() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listMedical).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }

  savemed(Medicals: Medicals, router, notificationService) {
    this.httpService.post<Medicals>(this.saveMedical, Medicals).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/Medicals/list-Medicals']);
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

  updatemed(Medicals: Medicals, router, notificationService){
    this.httpService.post<Medicals>(this.updateMedical, Medicals).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/Medicals/list-Medicals']);
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
    return this.httpClient.get<any>(this.deleteMedical + "?id=" + id);
  }
}
