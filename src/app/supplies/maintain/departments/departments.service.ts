import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Departments } from './departments.model';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<Departments[]> = new BehaviorSubject<Departments[]>([]);

  public generateCodeUrl = `${this.serverUrl.apiServerAddress}api/supplies/supplieDepartment/generateCode`;
  public saveUrl = `${this.serverUrl.apiServerAddress}api/supplies/supplieDepartment/save`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/supplies/supplieDepartment/edit`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/supplies/supplieDepartment/update`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/supplies/supplieDepartment/list`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/supplies/supplieDepartment/delete`;
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): Departments[] {
    return this.dataChange.value;
  }

  getList() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }

  save(dep: any, router, notificationService){
    this.httpService.post<any>(this.saveUrl, dep).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/supplies/maintain/departments/list-departments']);
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

  update(dep: any, router, notificationService){
    this.httpService.post<any>(this.updateUrl, dep).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/supplies/maintain/departments/list-departments']);
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
    return this.httpClient.get<any>(this.deleteUrl + "?id=" + id);
  }
}
