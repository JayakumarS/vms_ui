import { Injectable } from '@angular/core';
import { CurrencyModel } from './currency.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class CurrencyMasterService  extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<CurrencyModel[]> = new BehaviorSubject<CurrencyModel[]>([]);


  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
   }

  public saveUrl = `${this.serverUrl.apiServerAddress}api/master/currency/save`;
  public listUrl = `${this.serverUrl.apiServerAddress}api/master/currency/list`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/master/currency/edit`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/master/currency/delete`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/master/currency/update`;



  get data(): CurrencyModel[] {
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

  saveCurrency(currencymodel: CurrencyModel, router, notificationService){
    this.httpService.post<CurrencyModel>(this.saveUrl, currencymodel).subscribe({next: (data: any) => {
     if (data.success == true) {
       notificationService.showNotification(
         "snackbar-success",
         "Record Added Successfully",
         "bottom",
         "center"
       );
       router.navigate(['/crew/currency-master/list-currency-master']);
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

 updateCurrency(currency: CurrencyModel, router, notificationService){
  this.httpService.post<CurrencyModel>(this.updateUrl, currency).subscribe({next: (data: any) => {
    if (data.success == true) {
      notificationService.showNotification(
        "snackbar-success",
        "Record Updated Successfully",
        "bottom",
        "center"
      );
      router.navigate(['/crew/currency-master/list-currency-master']);
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
