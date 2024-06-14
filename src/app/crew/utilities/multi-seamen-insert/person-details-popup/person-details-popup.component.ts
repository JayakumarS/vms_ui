import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from 'moment';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { NotificationService } from 'src/app/core/service/notification.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionService } from 'ag-grid-community';
import { miultiSeamenInsert } from '../multi-seamen-insert.model';
import { MultiSeamenInsertService } from '../multi-seamen-insert.service';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-person-details-popup',
  templateUrl: './person-details-popup.component.html',
  styleUrls: ['./person-details-popup.component.sass']
})
export class PersonDetailsPopupComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  public vessaltypeFilterCtrl: FormControl = new FormControl();
  vessaltypeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vessaltype', { static: true }) vessaltype: MatSelect;
  protected onDestroy = new Subject<void>();

  columnsToDisplay = [
    "checkbox",
    "InvNo",                 
    "InvDt",                 
    "currency",                 
    "exRate",
    "receiveAmt",                 
    "balanceAmt",
    "tcAmt",                 
    "bcAmt",                  
  ];
  pageSize = 10; // Number of items per page
  currentPage = 1; // Current page number
  
  docForm: FormGroup;
  miultiSeamenInsert:miultiSeamenInsert;
  newPageSize: any;
  mainList=[];
  usersData: MainList[] = [];
  dataSource: MatTableDataSource<any>;
  totalItems: any;
  selection = new SelectionModel<any>(true, []);
  receipt: any;
  isCheckboxSelected: boolean = false;
  config: {
    id: string,
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };
  cashbankReceipts: any;
  public page1 = 1;
  public pageSize1 = 10;
  cbInvoiceDtl=[];
  selectedIndices = [];
  selectedData: any;
  execute: boolean=false;
  vessaltypelist: any;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private router: Router,

    public route: ActivatedRoute,
    public dialog: MatDialog,
    private encryptionService: EncryptionService,
    private serverUrl: serverLocations,
    private MultiSeamenInsertService : MultiSeamenInsertService,
    public notificationService: NotificationService,
  private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private EncrDecr: EncrDecrService,
    @Inject(MAT_DIALOG_DATA) public values: any,@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PersonDetailsPopupComponent>,
  ) {
    super();
    this.docForm = this.fb.group({
      id: [""],
      cbReceiptDate: [""],
      paymentMode: ["B"],
      cbReceiptDateObj:[""],
      companyCode: [""],
      accountName:[""],
      cashAcc:[""],
      bankAcc: [""],
      currency: [""],
      chequeNO: [""],
      receivedFrom: [""],
      chequeDate: [""],
      exchangeRate:[""],
      fromCurrency:[0.0],
      toCurrency:[0.0],
      chequeDateObj:[moment()],
      totalbcCredit: [""],
      narration:[""   ],
      bcAmountHdr:[""],
      tcAmountHdr:[""],
      totalBCAmount: [""],
      totalTCAmount: [""],
      tcAmount:[""],
      bcAmount:[""],
      cshBankDetail: this.fb.array([
        this.fb.group({
          companyCode: ["C0018"],
          currency:[""],
          subgroupcode:[""],
          acctName: [""],
          subSccountCode: [""],
          shortDetail: [""],
          toCurrency:[0.0],
          fromCurrency:[0.0],
          subAccountCode:[""],
          exgRate: [""],
           tcamount: [""],
           bcamount: [""],
          tcCreditAmount: [""],
          bcCreditAmount: [""],
          vesselCode: [""],
          voyageCode: [""],
          jvType: [""],
          sectorCode: [""],
          employeeCode: [""],
          portCode: [""],
          portSequence: [""],
          departmentCode: [""],
          agentCode: [""],
          countryCode: [""],
          customerCode: [""],
          supplierCode: [""],
          designationCode: [""],
          costCenter: [""],
          assetCode: [""],
          quantityGO: [""],
          quantityFO: [""],

          isVoyage: false,
          isVessel: false,
          isService: false,
          isEmployee: false,
          isPort: false,
          isDepartment: false,
          isAgent: false,
          isLocation: false,
          isCustomer: false,
          isSupplier: false,
          isDesignation: false,
          isCostCenter: false,
          isQuantityGO: false,
          isQuantityFO: false,
          isPortSequence: false,
          isCompany: false,
          isJvType:false,
          isAsset:false,
          isJvTypeMan:false,
          isVoyageMan: false,
          isVesselMan: false,
          isServiceMan: false,
          isEmployeeMan: false,
          isPortMan: false,
          isDepartmentMan: false,
          isAgentMan: false,
          isLocationMan: false,
          isCustomerMan: false,
          isSupplierMan: false,
          isDesignationMan: false,
          isCostCenterMan: false,
          isCompanyMan: false,
          isQuantityGOMan: false,
          isQuantityFOMan: false,
          isPortSequenceMan: false,
          isCurrencyBlocked:false,
          isSubAccountCode:false,
          isTradeDebtors:false,
          isNoValidation:false,
          isSubAccountCodeMAN:false,
          cbInvoiceDtl: this.fb.array([
            this.fb.group({
              invoiceNo:[""],
              invoiceAmount:[""],
              paidTCAmount:[""],
              paidBCAmount:[""],
              customerCode:[""]
            })
          ]),
        })
      ]),
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" }; 
  
  ngOnInit(): void {
    this.subAccList();
    this.vessaltypelist = [
      { id: "PERSON MAIN", text: "PERSON MAIN" },
    
    ];
    
    this.vessaltypeFilteredOptions.next(this.vessaltypelist.slice());

// listen for origin List  search field value changes
this.vessaltypeFilterCtrl.valueChanges
  .pipe(takeUntil(this.onDestroy))
  .subscribe(() => {
    this.filteritemvessaltypelist();
  });



  }
  restoreSelectedState() {
   
}


filteritemvessaltypelist(){
  if (!this.vessaltypelist) {
    return;
  }
  // get the search keyword
  let search = this.vessaltypeFilterCtrl.value;
  if (!search) {
    this.vessaltypeFilteredOptions.next(this.vessaltypelist.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  // filter the banks
  this.vessaltypeFilteredOptions.next(
    this.vessaltypelist.filter(title => title.text.toLowerCase().includes(search))
  );
 }
  
    onCancel(){
      this.dialogRef.close();

    }

   
    submit(){
    
  }

   
    calculateBCAmountForIA(val, i) {
     
  }
  
    calculateTCAmountForIA(val,i){
     
    
    }
  subAccList(){
 
  
  }
  checkIsNaN = function (value) {
    if (isNaN(value))
      value = 0
  
    return value;
  }

selectAll(event) {
 
  
}
add(){
}
remove(){

}


pageChanged(event) {
  this.currentPage = event.pageIndex + 1;
  this.pageSize = event.pageSize;}


  select(event, index){
  
}


calculateTotalAmountForIA() {
  let totalBCAmount = 0.0;
  let totalTCAmount = 0.0;

  // Iterate over all selected indices and sum up the amounts
  for (let selectedIndex of this.selectedIndices) {
    const selectedData = this.mainList[selectedIndex];
    totalBCAmount += parseFloat(selectedData.paidBCAmount);
    totalTCAmount += parseFloat(selectedData.paidTCAmount);
  }
  // Update the total amounts in the form
  this.docForm.patchValue({
    'totalBCAmount': this.checkIsNaN(totalBCAmount),
    'totalTCAmount': this.checkIsNaN(totalTCAmount),

  });
}

}
export interface SubList {
  // itemName:String;
  // itemCategory:String;
  // availableQty:String;
  // uom:String;
  // total:String;
}

export interface MainList {
  erNo: String;
  deportYard: String;
  containerType: String;
  containerNo: String;
  isTransit: String;
  invoiceNo:any;
  currencyCode:any;
  invoiceAmount:any;
  paidBCAmount:any;
  paidTCAmount:any;
  balanceAmount:any;
  receivedAmount:any;
  exchangeRate:any;
  // subList?: SubList[] | MatTableDataSource<SubList>;
}