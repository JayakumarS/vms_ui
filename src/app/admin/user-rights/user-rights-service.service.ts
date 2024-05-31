
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { UserRights } from "./user-rights.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserRightsServiceService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<UserRights[]> = new BehaviorSubject<UserRights[]>(
    []

  );

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, 
    private httpService: HttpServiceService) {
    super();
  }

  public userList = `${this.serverUrl.apiServerAddress}api/auth/app/userRights/getUserList`;

  public companyList = `${this.serverUrl.apiServerAddress}api/auth/app/userRights/getCompanyList`;

  public moduleList = `${this.serverUrl.apiServerAddress}api/auth/app/userRights/getModuleList`;

  public userformList = `${this.serverUrl.apiServerAddress}api/auth/app/userRights/getuserFormList`;


  public userpermissionList = `${this.serverUrl.apiServerAddress}api/auth/app/userRights/getuserpermissions`;

  public propertyList = `${this.serverUrl.apiServerAddress}api/auth/app/userRights/getPropertyList`;

}
