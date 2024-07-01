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
  // isTblLoading2 = true;

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
   public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/save`;
   public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/update`;
   public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/delete`;
   public deletestorageUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/deletestorage`;


   public savestorageUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/savestorage`;

   public savefunctionUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/savefunction`;

   public editUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/edit`;
   public editstorageUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/editstorage`;
   public updatestorageUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/updatestorage`;
   public editfunctionUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/editfunction`;
   public deletefunctionUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/deletefunction`;
   public updatefunctionUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/updatefunction`;

   
   

   public listUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/list`;
   public codeUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/codemax`;
   public liststorageUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/liststorage`;
   public listfunctionUrl = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/listfunction`;
   
   public getSequenceCode = `${this.serverUrl.apiServerAddress}api/crew/IdentifiersLibrary/getSequenceCode`;
   getList() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
        console.log(data);

      }, error: (err) => console.log(err)
     });
  }

  getListStorage() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.liststorageUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
        console.log(data);

      }, error: (err) => console.log(err)
     });
  }

  getListFunction() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listfunctionUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
        console.log(data);

      }, error: (err) => console.log(err)
     });
  }

   saveStorage(identifier: identifier, router, notificationService){
    this.httpService.post<identifier>(this.savestorageUrl, identifier).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
       router.navigate(['/supplies/maintain/identifiers-library/identifiers']);
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

 saveFunction(identifier: identifier, router, notificationService){
  this.httpService.post<identifier>(this.savefunctionUrl, identifier).subscribe({next: (data: any) => {
   if (data.success == true) {
     notificationService.showNotification(
       "snackbar-success",
       "Record Added Successfully",
       "bottom",
       "center"
     );
     router.navigate(['/supplies/maintain/identifiers-library/identifiers']);
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


deletestorage(id){
  return this.httpClient.get<any>(this.deletestorageUrl + "?id=" + id);
}


delete(id){
  return this.httpClient.get<any>(this.deleteUrl + "?id=" + id);
}
deletefunction(id){
  return this.httpClient.get<any>(this.deletefunctionUrl + "?id=" + id);
}




   saveIdentifierLibrary(identifier: identifier, router, notificationService){
    this.httpService.post<identifier>(this.saveUrl, identifier).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
       router.navigate(['/supplies/maintain/identifiers-library/identifiers']);
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
