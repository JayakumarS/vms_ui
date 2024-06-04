import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { libraryfile } from './library-file.model';
import { BehaviorSubject } from 'rxjs';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryFileService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<libraryfile[]> = new BehaviorSubject<libraryfile[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;

  get data(): libraryfile[] {
    return this.dataChange.value;
  }

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private save = `${this.serverUrl.apiServerAddress}api/`;
  private getList = `${this.serverUrl.apiServerAddress}api/`;
  private deleteURL = `${this.serverUrl.apiServerAddress}api/`;
  public editURL = `${this.serverUrl.apiServerAddress}api/`;
  public updateURL= `${this.serverUrl.apiServerAddress}api/`;
  

  

  //save
  addfile(adduser:libraryfile, router, notificationService, spinner): void {
  this.dialogData = adduser;
  this.httpService.post<libraryfile>(this.save, adduser).subscribe(data => {
    console.log(data);
    if (data) {
      spinner.hide();
      notificationService.showNotification(
        "snackbar-success",
        "Record Added successfully...",
        "bottom",
        "center"
      );
      router.navigate(['/crew/maintain/libraryfile/list-library']);
    }
    else {
      spinner.hide();
      notificationService.showNotification(
        "snackbar-danger",
        "Not Updated...!!!",
        "bottom",
        "center"
      );
    }
  },
    (err: HttpErrorResponse) => {

    });
}


//Update
Update(libraryfile: libraryfile,router,notificationService): void {
  this.dialogData = libraryfile;
  this.httpService.post<libraryfile>(this.updateURL, libraryfile).subscribe(data => {
    console.log(data);
    if(data){
      notificationService.showNotification(
        "snackbar-success",
        "Updated Record Successfully...!!!",
        "bottom",
        "center"
      );
      router.navigate(['/crew/maintain/libraryfile/list-library']);
    }
    else {
      notificationService.showNotification(
        "snackbar-danger",
        "Not Updated ...!!!",
        "bottom",
        "center"
        );
      }
  });
}
}
