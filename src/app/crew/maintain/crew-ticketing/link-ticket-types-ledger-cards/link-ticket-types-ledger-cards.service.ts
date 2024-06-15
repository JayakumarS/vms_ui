import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { LinkTicketTypesLedgerCards } from './link-ticket-types-ledger-cards.model';

@Injectable({
  providedIn: 'root'
})
export class LinkTicketTypesLedgerCardsService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<LinkTicketTypesLedgerCards[]> = new BehaviorSubject<LinkTicketTypesLedgerCards[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): LinkTicketTypesLedgerCards[] {
    return this.dataChange.value;
  }

  getList(){
    let value,url;
    let list = [{    ticketTypes:"BUSSINESS",ledgerCards:"CREW PROVISIONS (5101)"}];
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
