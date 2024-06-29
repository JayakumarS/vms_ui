import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { InterviewSetup } from './interview-setup.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewSetupService extends UnsubscribeOnDestroyAdapter{
 

  isTblLoading = true;

  dataChange: BehaviorSubject<InterviewSetup[]> = new BehaviorSubject<InterviewSetup[]>(
    []
  );
  
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/interviewsetup/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/interviewsetup/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/interviewsetup/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/interviewsetup/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/interviewsetup/update`;
  public rankListUrl = `${this.serverUrl.apiServerAddress}api/crew/maintain/interviewsetup/getRankMasters`;
  public getrank = `${this.serverUrl.apiServerAddress}api/common/getRankMasters`;


  get data(): InterviewSetup[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getList() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listUrl).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }

  saveInterviewSetup(interviewSetup: InterviewSetup, router, notificationService){
     this.httpService.post<InterviewSetup>(this.saveUrl, interviewSetup).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/interview-setup/list-interview']);
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

  updateInterviewSetup(interviewSetup: InterviewSetup, router, notificationService){
    this.httpService.post<InterviewSetup>(this.updateUrl, interviewSetup).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/interview-setup/list-interview']);
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