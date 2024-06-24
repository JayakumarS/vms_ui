import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { agent } from './agent.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AgentService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<agent[]> = new BehaviorSubject<agent[]>(
    []
  );
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private listagent = `${this.serverUrl.apiServerAddress}api/crew/maintain/agent/getlist`;
  private saveagent = `${this.serverUrl.apiServerAddress}api/crew/maintain/agent/save`;
  public deleteagent = `${this.serverUrl.apiServerAddress}api/crew/maintain/agent/delete`;
  public edit = `${this.serverUrl.apiServerAddress}api/crew/maintain/agent/edit`;
  public updateagent = `${this.serverUrl.apiServerAddress}api/crew/maintain/agent/update`;
 
  get data(): agent[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getList() {
    this.isTblLoading = true; 
    this.httpService.get<any>(this.listagent).subscribe({next: (data: any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.list);
      }, error: (err) => console.log(err)
     });
  }

  save(agent: agent, router, notificationService) {
    this.httpService.post<agent>(this.saveagent, agent).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/agent/list-agent']);
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

  update(agent: agent, router, notificationService){
    this.httpService.post<agent>(this.updateagent, agent).subscribe({next: (data: any) => {
      if (data.success == true) {
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully",
          "bottom",
          "center"
        );
        router.navigate(['/crew/maintain/agent/list-agent']);
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

  delete(id){
    return this.httpClient.get<any>(this.deleteagent + "?id=" + id);
  }
}
