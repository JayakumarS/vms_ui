
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Class } from './class.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClassService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<Class[]> = new BehaviorSubject<Class[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private list = `${this.serverUrl.apiServerAddress}api/vessels/class/list`;
  private savevesselclass = `${this.serverUrl.apiServerAddress}api/vessels/class/saveclass`;
  public deleteclass = `${this.serverUrl.apiServerAddress}api/vessels/class/delete`;
  public editclass = `${this.serverUrl.apiServerAddress}api/vessels/class/editclass`;
  public updatevesselclass = `${this.serverUrl.apiServerAddress}api/vessels/class/updateclass`;
  

  get data(): Class[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
 
    
    getList() {
      this.isTblLoading = true; 
      this.httpService.get<any>(this.list).subscribe({next: (data: any) => {
          this.isTblLoading = false;
          this.dataChange.next(data.list);
        }, error: (err) => console.log(err)
       });
    }
  
    saveclass(Class: Class, router, notificationService) {
      this.httpService.post<Class>(this.savevesselclass, Class).subscribe({next: (data: any) => {
        if (data.success == true) {
          notificationService.showNotification(
            "snackbar-success",
            "Record Added Successfully",
            "bottom",
            "center"
          );
          router.navigate(['/vessels/maintain/class/list-class']);
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
  
    updateclass(Class: Class, router, notificationService){
      this.httpService.post<Class>(this.updatevesselclass, Class).subscribe({next: (data: any) => {
        if (data.success == true) {
          notificationService.showNotification(
            "snackbar-success",
            "Record Updated Successfully",
            "bottom",
            "center"
          );
          router.navigate(['/vessels/maintain/class/list-class']);
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
      return this.httpClient.get<any>(this.deleteclass + "?id=" + id);
    }
   
  
 
}