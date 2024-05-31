import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserMessagePopUpComponent } from './list-user-master/user-message-pop-up/user-message-pop-up.component';
import { UserMasterResultBean } from './user-master-result-bean';
import { UserMaster } from './user-master.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService extends UnsubscribeOnDestroyAdapter {

 
  dialogData:any;
  isTblLoading = true;
  dataChange: BehaviorSubject<UserMaster[]> = new BehaviorSubject<UserMaster[]>(
    []
  );

  constructor(
    private httpClient: HttpClient,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    private spinner: NgxSpinnerService,
    ) {
    super();
  }

  private saveUser = `${this.serverUrl.apiServerAddress}api/userMaster/save`;
  public locationList = `${this.serverUrl.apiServerAddress}app/inventory/deliveryorder/getLocationList`;
  public designation = `${this.serverUrl.apiServerAddress}api/userMaster/getDesignationList`;
  public department = `${this.serverUrl.apiServerAddress}api/userMaster/getDepartmentList`;
  public username = `${this.serverUrl.apiServerAddress}api/userMaster/getUserNameList`;
  public getAllMasters = `${this.serverUrl.apiServerAddress}api/userMaster/getList`;
  public editUser = `${this.serverUrl.apiServerAddress}api/userMaster/edit`;
  public updateUser = `${this.serverUrl.apiServerAddress}api/userMaster/update`;
  public deleteUser = `${this.serverUrl.apiServerAddress}api/userMaster/delete`;
  public validateFullNameUrl = `${this.serverUrl.apiServerAddress}api/userMaster/validateLoginName`;
  public validateLoginNameUrl = `${this.serverUrl.apiServerAddress}api/userMaster/validateLoginName`;
  public validateLoginidUrl = `${this.serverUrl.apiServerAddress}api/userMaster/validateLoginid`;

  get data(): UserMaster[] {
    return this.dataChange.value;
  }


  getAllList(object): void {
    
    this.subs.sink = this.httpService.post<UserMasterResultBean>(this.getAllMasters,object).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.userMasterDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}


addUserMaster(userMaster: UserMaster, router, notificationService,dialog): void {
    this.dialogData = userMaster;
    this.httpService.post<UserMaster>(this.saveUser, userMaster).subscribe(data => {
      console.log(data);
      if(data.Success===true){
        const dialogRef = dialog.open(UserMessagePopUpComponent, {
          // height: "270px",
          //   width: "400px",
            data: data,
            // direction: tempDirection,
          });
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        this.spinner.hide();
       router.navigate(['/admin/userMaster/list-user-master']);
      }
      else if(data.Success===false){
        notificationService.showNotification(
          "snackbar-danger",
          "Error in Save.. Please try again...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/admin/userMaster/list-user-master']);
      }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  updateUserMaster(userMaster: UserMaster,router,notificationService): void {
    this.dialogData = userMaster;
    this.httpService.post<UserMaster>(this.updateUser, userMaster).subscribe(data => {
      console.log(data);
      if(data.Success===true){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Record ...!!!",
          "bottom",
          "center"
        );
        this.spinner.hide();
        router.navigate(['/admin/userMaster/list-user-master']);
      }
      else if(data.Success===false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated ...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/admin/userMaster/list-user-master']);
      }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  userMasterDelete(userId: any): Observable<any>  {
    return  this.httpClient.get<any>(this.deleteUser+"?userId="+userId);
  };

}
