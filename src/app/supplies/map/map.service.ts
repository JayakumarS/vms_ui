import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class MapService extends UnsubscribeOnDestroyAdapter{



  isTblLoading = true;
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private snackBar: MatSnackBar,private httpService: HttpServiceService) {
    super()
   }
  public getConnectionByClick = `${this.serverUrl.apiServerAddress}api/auth/app/Network/getConnectionByClick`;
  public allConnectionListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/Network/getAllConnectionList`;
  public ConnectionCountUrl = `${this.serverUrl.apiServerAddress}api/auth/app/Network/getAllConCountList`;



}
