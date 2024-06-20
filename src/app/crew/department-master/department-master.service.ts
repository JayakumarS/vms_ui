import { Injectable } from '@angular/core';
import { DepartmentModel } from './department.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class DepartmentMasterService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<DepartmentModel[]> = new BehaviorSubject<DepartmentModel[]>([]);

  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) { 
    super();
  }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/master/department/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/master/department/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/master/department/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/master/department/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/master/department/update`;

  
  get data(): DepartmentModel[] {
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

  saveDepartment(department: DepartmentModel, router, notificationService){
    this.httpService.post<DepartmentModel>(this.saveUrl, department).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
       router.navigate(['/crew/department-master/list-department']);
     }else{
       notificationService.showNotification(
         "snackbar-danger",
         "Save Failed",
         "bottom",
         "center"
       );
     }
     }, error: (err) => console.log(err)
    });
 }

 updateDepartment(department: DepartmentModel, router, notificationService){
  this.httpService.post<DepartmentModel>(this.updateUrl, department).subscribe({next: (data: any) => {
    if (data.success == true) {
      notificationService.showNotification(
        "snackbar-success",
        "Record Updated Successfully",
        "bottom",
        "center"
      );
      router.navigate(['/crew/department-master/list-department']);
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
