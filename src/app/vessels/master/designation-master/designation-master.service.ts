import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DesignationMaster } from './designation-master.model';
import { DesignationMasterResultBean } from './designation-master-result-bean';
@Injectable({
  providedIn: 'root'
})
export class DesignationMasterService extends UnsubscribeOnDestroyAdapter {

  
  isTblLoading = true;
  dataChange: BehaviorSubject<DesignationMaster[]> = new BehaviorSubject<DesignationMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}app/designationMaster/getList`;
  private saveDesignation = `${this.serverUrl.apiServerAddress}app/designationMaster/save`;
  public editDesignationMaster = `${this.serverUrl.apiServerAddress}app/designationMaster/edit`;
  public updateDesignationMaster = `${this.serverUrl.apiServerAddress}app/designationMaster/update`;
  private deleteDesignationMaster = `${this.serverUrl.apiServerAddress}app/designationMaster/delete`;
  public validateDesignation = `${this.serverUrl.apiServerAddress}app/common/commonServices/validateUnique`;
  
  
  get data(): DesignationMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<DesignationMasterResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.designationMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addDesignation(designationMaster: DesignationMaster,router,notificationService): void {
    this.dialogData = designationMaster;
    this.httpService.post<DesignationMaster>(this.saveDesignation, designationMaster).subscribe(data => {
      console.log(data);
      if(data.Success===true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/master/designation-Master/list-designation']);
      }
      else if(data.Success===false){
        notificationService.showNotification(
          "snackbar-danger",
          "Error in save.. Please try again...!!!",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  designationMasterUpdate(designationMaster: DesignationMaster,router,notificationService): void {
    this.dialogData = designationMaster;
    this.httpService.post<DesignationMaster>(this.updateDesignationMaster, designationMaster).subscribe(data => {
      console.log(data);
      if(data.Success===true){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/designation-Master/list-designation']);
      }
      else if(data.Success===false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated ...!!!",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  // DeleteDesignationMaster(desgnCode: any,router,notificationService): void {
  //   this.httpService.get<DesignationMaster>(this.deleteDesignationMaster+"?designationMaster="+desgnCode).subscribe(data => {
  //     console.log(data);
  //     if(data.Success===true){
  //       notificationService.showNotification(
  //         "snackbar-success",
  //         "Deleted Record Successfully...!!!",
  //         "bottom",
  //         "center"
  //       );
  //       router.navigate(['/master/designation-Master/list-designation']);
  //     }
  //     else if(data.Success===false){
  //       notificationService.showNotification(
  //         "snackbar-danger",
  //         "Error in delete...!!!",
  //         "bottom",
  //         "center"
  //       );
  //     }
  //     },
  //     (err: HttpErrorResponse) => {
  //        // error code here
  //     }
  //   );
  //   /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
  //     console.log(id);
  //     },
  //     (err: HttpErrorResponse) => {
  //        // error code here
  //     }
  //   );*/
  // }

  DeleteDesignationMaster(desgnCode: any): Observable<any>  {

    return  this.httpClient.get<any>(this.deleteDesignationMaster+"?designationMaster="+desgnCode);
    
    
  };


  deleteEmployees(id: number): void {
    console.log(id);
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
