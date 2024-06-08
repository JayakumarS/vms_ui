import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { identifier } from './identifiers-library.model';

@Injectable({
  providedIn: 'root'
})
export class IdentifiersLibraryService extends UnsubscribeOnDestroyAdapter{

  
  isTblLoading = true;
  dataChange: BehaviorSubject<identifier[]> = new BehaviorSubject<identifier[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): identifier[] {
    return this.dataChange.value;
  }
   // Temporarily stores data from dialogs
   dialogData: any;

   private save = `${this.serverUrl.apiServerAddress}api/`;

   addcategories(identifier:identifier, router, notificationService, spinner): void {
    this.dialogData = identifier;
    this.httpService.post<identifier>(this.save, identifier).subscribe(data => {
      console.log(data);
      if (data) {
        spinner.hide();
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/crew/applications/applications/list-applications']);
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
}
