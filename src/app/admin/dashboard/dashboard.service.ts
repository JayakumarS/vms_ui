import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MainDashboardResultBean } from './dashboard-result-bean';
import { Dashboard } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  isTblLoading = true;
  dataChange: BehaviorSubject<Dashboard[]> = new BehaviorSubject<Dashboard[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  subs: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {

  }
  public getListUrl = `${this.serverUrl.apiServerAddress}app/customerInvoice/getList`;
  public getsalesOrder = `${this.serverUrl.apiServerAddress}app/saleOrder/getList`;
  public getItemWiseList = `${this.serverUrl.apiServerAddress}app/saleOrder/getItemWiseList`;
  public countvalue = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getCustomerCount`;
  public salesOrderCount = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getsalesOrderCount`;

  public getQtyOrderCount = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getQtyOrderCount`;
  public getcustomerlistCount = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getcustomerlistCount`;
  public purchaseOrderCount = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getpurchaseOrderCount`;
  public getitemNotSaleslist = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getitemNotqytcount`;
  public invoiceCount = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getinvoiceCount`;
  public earningsCount = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getearningsCount`;
  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/Dashboard/getCustomerCount`;
  public ctryCustCount = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getCountryBasedCustomerCount`;
  public getIncomelist = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getTotalIncomeCount`;
  public getExpensesList = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getTotalExpenseCount`;
  public getWorkOrderList = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getBOMList`;
  public getAveragesaleslist = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getAveragesaleslist`;
  public getAverageCollectionslist = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getAverageCollections`;
  public getCustomerSurveyList = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getCustomerSurveyList`;
  public getCustAnlsForDashBd = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getCustAnlsForDashBd`;
  public getAllSalesQuote = `${this.serverUrl.apiServerAddress}app/saleQuote/getList`;
  public getPendingInvoiceList = `${this.serverUrl.apiServerAddress}app/purchaseInvoice/getList`;
  public getUserLogListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/getUserLogList`;
  public getDashboardCountsUrl = `${this.serverUrl.apiServerAddress}api/auth/app/mainDashboard/dashboardCounts`;

  get data(): Dashboard[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllCustomers(): void {

    this.subs.sink = this.httpService.get<MainDashboardResultBean>(this.countvalue).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.countvalue);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  // getAllCustomerInvoice(): void {
  //   this.subs.sink = this.httpService.get<CustomerInvoiceResultBean>(this.getCustomerInvoice).subscribe(
  //     (data) => {
  //       this.isTblLoading = false;
  //       this.dataChange.next(data.lCustomerInvoiceBean);
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.isTblLoading = false;
  //       console.log(error.name + " " + error.message);
  //     }
  //   );
  // }
}
