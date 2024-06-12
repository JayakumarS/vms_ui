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

  getList(){
    let value,url;
    let list = [{code:"AG",department:"AGENCY FEES",formType:"Provisions/Stores",decimals:"0.00",itemsToOrderCommends:"",itemsNotToOrderCommends:"",availableOffice:"YES",availableVessel:"NO",officeUndefinedItemsS:"YES",vesselUndefinedItemsS:"YES",proposedItems:"NO",officeUndefinedItemsL:"YES",vesselUndefinedItemsL:"YES",lockSupplyCaseswithinvoicedate:"brfore",vesselOrders:"NO",tolerance:"",minimumItems:""}];
    this.isTblLoading = false;
    this.dataChange.next(list);
    // this.subs.sink = this.httpService.post<any>(url,value).subscribe(
    //   (data) => {
    //     this.isTblLoading = false;
    //     this.dataChange.next(list);
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.isTblLoading = false;
    //     console.log(error.name + " " + error.message);
    //   }
    // );
  }
}
