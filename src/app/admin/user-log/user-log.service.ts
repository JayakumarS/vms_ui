import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserLogMasterResultBean } from './user-log-result-bean';
import { UserLogMaster } from './user-log.model';

@Injectable({
  providedIn: 'root'
})
export class UserLogService extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<UserLogMaster[]> = new BehaviorSubject<UserLogMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    ) {
    super();
  }
  public getAllMasters = `${this.serverUrl.apiServerAddress}api/userLog/getList`;
  public userNameList = `${this.serverUrl.apiServerAddress}api/userLog/getUserName`;
 


  get data(): UserLogMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(object): void {
    
        this.subs.sink = this.httpService.post<UserLogMasterResultBean>(this.getAllMasters,object).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.userLogDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
 
}
