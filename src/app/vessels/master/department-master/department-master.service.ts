import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { DepartmentMaster } from "./department-master.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { DepartmentMasterResultBean } from './department-master-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { NotificationService } from 'src/app/core/service/notification.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentMasterService extends UnsubscribeOnDestroyAdapter {

  
  isTblLoading = true;
  dataChange: BehaviorSubject<DepartmentMaster[]> = new BehaviorSubject<DepartmentMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private httpService: HttpServiceService
    ) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}app/departmentMaster/getList`;
  private saveDepartment = `${this.serverUrl.apiServerAddress}app/departmentMaster/save`;
  public editDepartment = `${this.serverUrl.apiServerAddress}app/departmentMaster/edit`;
  public updateDepartment = `${this.serverUrl.apiServerAddress}app/departmentMaster/update`;
  public deleteDepartment = `${this.serverUrl.apiServerAddress}app/departmentMaster/delete`;
  public userMasterList = `${this.serverUrl.apiServerAddress}app/departmentMaster/userList`;
  public validateDepartment = `${this.serverUrl.apiServerAddress}app/common/commonServices/validateUnique`;
  public fetchDeptHead = `${this.serverUrl.apiServerAddress}app/departmentMaster/fetchDeptHead`;

  get data(): DepartmentMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(object): void {
        // console.log(object);
      this.subs.sink = this.httpService.post<DepartmentMasterResultBean>(this.getAllMasters,object).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.departmentMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            // console.log(error.name + " " + error.message);
          }
        );
  }

  // For Save
  addDepartment(DepartmentMaster: DepartmentMaster, router, notificationService): void {
    this.dialogData = DepartmentMaster;
    this.httpService.post<DepartmentMaster>(this.saveDepartment, DepartmentMaster).subscribe(data => {
      if(data.Success===true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/master/department-Master/list-department']);
      }
      else if(data.Success===false){
        notificationService.showNotification(
          "snackbar-danger",
          "Error in Save.. Please try again...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/department-Master/list-department']);
      }
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  departmentUpdate(departmentMaster: DepartmentMaster,router,notificationService): void {
    this.dialogData = departmentMaster;
    this.httpService.post<DepartmentMaster>(this.updateDepartment, departmentMaster).subscribe(data => {
      // console.log(data);
      if(data.Success===true){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/department-Master/list-department']);
      }
      else if(data.Success===false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated ...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/department-Master/list-department']);
      }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  // departmentDelete(deptCode: any,router,notificationService): void {
  //   this.httpService.get<DepartmentMaster>(this.deleteDepartment+"?departmentMaster="+deptCode).subscribe(data => {
  //     console.log(data);
  //     if(data.Success===true){
  //       notificationService.showNotification(
  //         "snackbar-success",
  //         "Deleted Record Successfully...!!!",
  //         "bottom",
  //         "center"
  //       );
  //       router.navigate(['/master/department-Master/list-department']);
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

  departmentDelete(deptCode: any): Observable<any>  {
    return  this.httpClient.get<any>(this.deleteDepartment+"?departmentMaster="+deptCode);
  };


 
}
