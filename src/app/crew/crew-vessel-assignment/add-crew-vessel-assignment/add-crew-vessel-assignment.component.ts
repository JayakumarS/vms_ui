import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { debounce } from 'lodash';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import * as moment from 'moment';
import { CrewVesselAssignment } from '../crew-vessel-assignment.model';
import { CrewVesselAssignmentService } from '../crew-vessel-assignment.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from 'src/app/common-service/common.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  selector: 'app-add-crew-vessel-assignment',
  templateUrl: './add-crew-vessel-assignment.component.html',
  styleUrls: ['./add-crew-vessel-assignment.component.sass'],

  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
        },
      }
    }, CommonService
  ]
})
export class AddCrewVesselAssignmentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  dropdownSettings: IDropdownSettings;
  vessellist: any = [];
  ranklist: any = [];
  portList:any;
  substitudeList: any;
  supplierDropDownList: any;
  companyDropDownList: any;
  isValidateSucess: any;
  selectedRow: any;
  loadData: any;
  totalAmount1: any;
  CrewVesselAssignment: CrewVesselAssignment;
 show: boolean=false;
  customerCode: any;
  companyCode: any;
  edit: boolean = false;
  prCode: any;
  minToDate: Date;

  supplierCode: any;
  newPageSize: any;
  totalItems: any;
  supplierName: any;
  usersData: MainList[] = [];
  selectedItems: any[] = [];
  exchangeRate: any[];
  alPaymentInformationList: any[];


  docForm: FormGroup;
  i: any = 1;
  isReset: boolean = false;
  mainList = [];




  // For supplier DropDown List field searchable dropdown needed variables
  public supplierCodeFilterCtrl: FormControl = new FormControl();
  supplierCodeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('singleSelectemployee', { static: true }) singleSelectsupplier: MatSelect;
  protected onDestroy = new Subject<void>();
  public nameFilterCtrl: FormControl = new FormControl();
  nameFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('name', { static: true }) name: MatSelect;

  // For company DropDown List field searchable dropdown needed variables
  public companyCodeFilterCtrl: FormControl = new FormControl();
  companyCodeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('singleSelectemployee', { static: true }) singleSelectcustomer: MatSelect;

  updatedata: any;
  lDetaillist: any[];
  rowIndex: number = 0;

  encryptionService: any;
  serverUrl: any;
  decryptRequestId: number;
  requestId: number;
  payTcAmt: number;
  payBcAmt: number;
  data: any;
  totalTCAmount: number;
  totalBCAmount: number;
  rowCollection: any;
  tablerow: any[] = [];
  tcAmount: any;
  bcAmount: any;
  datasave: any;
  // toggleCheck: boolean =false;

  constructor(private fb: FormBuilder,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public router: Router,
public CrewVesselAssignmentService: CrewVesselAssignmentService,
    private httpService: HttpServiceService,private cmnService: CommonService,
    public notificationService: NotificationService,
    private snackBar: MatSnackBar,
  


  ) {
    super();
    this.docForm = this.fb.group({
      date : [""],
      dateObj: [""],
      vessel: [""],
      rankcode:[""],

      data: this.fb.array([
        this.fb.group({
      rank: [""],
      port: [""],
      name: [""],
      assignRemarks: [""],
      voyageRemarks: [""],
      signoff:[""],
      signon:[""],
     
    })
]),
})

  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        //For User login Editable mode
        this.fetchDetails(this.requestId);
      }
    });

 this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    
    this.httpService.get<any>(this.CrewVesselAssignmentService.getvessel).subscribe((res: any) => {

      this.vessellist = res.lCommonUtilityBean;

        });

        this.httpService.get<any>(this.CrewVesselAssignmentService.getrank).subscribe((res: any) => {

          this.ranklist = res.lCommonUtilityBean;
    
            });

            this.httpService.get<any>(this.CrewVesselAssignmentService.getport).subscribe((res: any) => {

              this.portList = res;
        
                });

                
     this.substitudeList=[

      { Code: "34575", FullName: "Rinkoo",Rank:"Cook",Nationality:"Indian" },

  { Code: "34576", FullName: "Naing",Rank:"Engineer",Nationality:"Indian" },

  { Code: "34579", FullName: "Vasim",Rank:"Officer",Nationality:"Indian" },


     ];
     this.nameFilteredOptions.next(this.substitudeList.slice());

// listen for origin List  search field value changes
this.nameFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemnamelist();
});


// this.fetchData();
  }

  get dataArray(): FormArray {
    return this.docForm.get('data') as FormArray;
  }
  
  fetchData() {
    this.httpService.get<any>(this.CrewVesselAssignmentService.getList).subscribe((res: any) => {
      this.show = true;
      this.mainList = res.list;
      this.dataArray.clear();

      res.list.forEach(element => {
        const formGroup = this.fb.group({
          rank: [element.rank],
          name: [element.name],
          signon: [element.signon],
          signoff: [element.signoff],
          onDate: [element],
          estSignOffDate: [element],
          substituteName: [element],
          rankcode: [element],
          port: [element],
          assignRemarks: [element],
          voyageRemarks: [element],
        });
        this.dataArray.push(formGroup);
      });
    });
  }
 

  getDateString(event, inputFlag, index) {
    let cdate = this.cmnService.getDate(event.target.value);
    if (inputFlag == "date") {
      this.docForm.patchValue({ date: cdate });
    }
  }

  filteritemnamelist(){
    if (!this.substitudeList) {
      return;
    }
    // get the search keyword
    let search = this.nameFilterCtrl.value;
    if (!search) {
      this.nameFilteredOptions.next(this.substitudeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.nameFilteredOptions.next(
      this.substitudeList.filter(title => title.text.toLowerCase().includes(search))
    );
   }




   generate() {
    if(this.docForm.valid){
    this.CrewVesselAssignmentService.save(this.docForm.value, this.router, this.notificationService) ;
  //   this.httpService.post(this.CrewVesselAssignmentService.getList, this.docForm.value).subscribe((res: any) => {

  //     this.show=true;
  //     this.spinner.hide();
  //     this.mainList = res.list;

  //     let detailArray = this.docForm.controls.data as FormArray;
  //     detailArray.clear();
  //     res.list.forEach(element => {
  //      let detailArray = this.docForm.controls.data as FormArray;

  //      let arraylen = detailArray.length;
  //      let newUsergroup: FormGroup = this.fb.group({
  //       rank:[element.rank],
  //       name:[element.name],
  //       signon:[element.signon],
  //       signoff:[element.signoff],
  //       paymentOrderTCAmount:[element.paymentOrderTCAmount],
  //       paymentOrderBCAmount:[element.paymentOrderBCAmount],
  //       companycode:[element.companycode],
  //       accountHeadCode:[element.accountHeadCode],
  //       currency:[element.currency],
  //       exchangeRate:[element.exchangeRate],
  //       paidAmountTC:[element.paidAmountTC],
  //       paidAmountBC:[element.paidAmountBC],
  //       chequeNo:[element.chequeNo],
  //       chequeDateObj:[element], 
  //       voucherDateObj:[element],
  //       chequeDate:[element.chequeDate], 
  //       voucherDate:[element.voucherDate],
  //       poCompanyCode:[element.poCompanyCode],
  //      })
  //      detailArray.insert(arraylen, newUsergroup);
     
  //    });
  //    for (let i = 1; i <= 100; i++) {
  //     this.mainList.push({ id: i, name: 'Item ' + i });
  //   }
  // });
}
  }

  //RESET 

  reset() {
    if (!this.edit) {
      this.docForm.reset();
      this.docForm = this.fb.group({

        fromDateObj: [""],
        piFromDate: [""],
        piToDate: [""],
        toDateObj: [""],
        paydateObj: [""],
        paydate: [""],
        companyCode: [""],
        supplierCode: [""],
        outAmount: [""],
        totalAmount: [""],
        outAmount1: [""],
        agent: [""],
        payTcAmt: [""],
        payBcAmt: [""],
        totalBCAmount: [""],
        totalTCAmount: [""],



      });
    } else {
      this.isReset = true;
      this.fetchDetails(this.requestId);
    }

  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onContextMenu(event: MouseEvent, item: CrewVesselAssignment) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  //EDIT SERVICES
  fetchDetails(paymentInformationNo: any): void {
   
  }



  cancel(){
    
  }
  

  onSubmit() {

  }
  keyPressNumberDouble(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
  
    // Check if the pressed key is a digit or a decimal point
    const allowedCharacters = /^[0-9.-]*$/;
    if (!allowedCharacters.test(event.key)) {
      event.preventDefault();
      return;
    }
  
    // Check if the input already contains a decimal point
    const decimalPointIndex = inputValue.indexOf('.');
    if (decimalPointIndex !== -1) {
      // Check if the number of digits after the decimal point exceeds 2
      const digitsAfterDecimal = inputValue.length - decimalPointIndex - 1;
      if (digitsAfterDecimal >= 2 && event.key !== '.') {
        event.preventDefault();
      }
    }
  }



  onDateChange(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.CrewVesselAssignmentService.getDate(event.target.value);
      if (inputFlag == "date") {
        this.docForm.patchValue({ date: cdate });
      }
    
    }
  
    // if(this.docForm.value.dueDate!=null){
    //   this.check(this.docForm.value.dueDate);
    // }
  }
  onDateInput(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    if(inputValue!=""){
      if (dateFormat.test(inputValue)) {
        let fdate = this.CrewVesselAssignmentService.getDateObj(inputValue);
        if (inputFlag == "date") {
          this.docForm.patchValue({
            'date': inputValue,
            'dateObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'date': "",
        'dateObj':""
       });
    }
    
  }
  formatDate(event: any) {
    const inputDate = event.value;
    if (inputDate && typeof inputDate === 'string') {
        const parts = inputDate.split('/');
        if (parts.length === 3) {
            const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            const parsedDate = moment(formattedDate, 'YYYY/MM/DD');
            this.docForm.get('fromdate').setValue(parsedDate);
        }
    }
  }


  selectAll(event) {

  }
  
  toggleCheckbox(event: any,data, i: number): void {
    this.totalTCAmount = 0.0;
    this.totalBCAmount = 0.0;
    const index = this.selectedItems.indexOf(i); // Using index of the row instead of the event
    
    if(i in this.selectedItems){
      this.selectedItems.splice(index);
    }else{
      this.selectedItems.push(data);
    }

    this.datasave.forEach((data, dataIndex) => { // Changed variable name to avoid conflict
      if (dataIndex === i) {
        data.selected = event.target.checked;
        // Patch "Inv TC Amt" and "Inv BC Amt" to "TC Amt" and "BC Amt" of the row
        data.payTCAmount = event.target.checked ? data.tcAmount : 0;
        data.payAmount = event.target.checked ? data.bcAmount : 0;
      }
      if (data.selected) {
        this.totalTCAmount += parseFloat(data.payTCAmount);
        this.totalBCAmount += parseFloat(data.payAmount);
      }
    });

    this.docForm.patchValue({
      'totalTCAmount': this.totalTCAmount,
      'totalBCAmount': this.totalBCAmount
    });
}
calculateBCAmountForIA(val,i){
  debugger
  console.log(val);
  this.datasave[i].payAmount = val
  this.datasave[i].payTCAmount=this.checkIsNaN((parseFloat(val)/parseFloat(this.datasave[i].exchangeRate)).toFixed(2));
  if (this.selectedItems) { 
    this.calculateTotalAmountForIA();
  }

}
  calculateTCAmountForIA(val,i){
    debugger
    console.log(val);
    this.datasave[i].payTCAmount = val
    this.datasave[i].payAmount=this.checkIsNaN((parseFloat(val)*parseFloat(this.datasave[i].exchangeRate)).toFixed(2));
    if (this.selectedItems) { 
      this.calculateTotalAmountForIA();
    }
  
  
  }
  calculateTotalAmountForIA() {
    let totalBCAmount = 0.0;
    let totalTCAmount = 0.0;
  
    
    for (let selectedIndex of this.selectedItems) {
      const selectedData = selectedIndex;
      totalBCAmount += parseFloat(selectedData.payAmount);
      totalTCAmount += parseFloat(selectedData.payTCAmount);
    }
    // Update the total amounts in the form
    this.docForm.patchValue({
      'totalBCAmount': this.checkIsNaN(totalBCAmount),
      'totalTCAmount': this.checkIsNaN(totalTCAmount),
  
    });

    
  }
  checkIsNaN = function (value) {
    if (isNaN(value))
      value = 0
  
    return value;
  }
  
  




  

  onList() {
   
  }

  updateDisplayedData(paginator: MatPaginator, index: any) {

  }

  bcToTcInput
    (value: any, row: any, ex: any) {
    this.bcToTcDebounce(value, row, ex);
  }
  bcToTcDebounce = debounce((value, row: any, ex) => {
    this.bcToTcAmountCalculation(value, row, ex);
  }, 300);

  bcToTcAmountCalculation(value, row: any, ex) {
    let tcAmt = Number(parseFloat(value) / ex);
    let detaillArray = this.docForm.controls.detail as FormArray;
    let detailFormGroup = detaillArray.at(row) as FormGroup;
    detailFormGroup.patchValue({
      payTCAmount: tcAmt,
    });
    row.payTCAmount = tcAmt
    this.totalAmountCalculation(this.docForm.value.tablerow[row].payTCAmount, this.docForm.value.tablerow[row].payAmount);
  }


  totalAmountCalculation(payTCAmount, payAmount): void {
    this.payBcAmt = 0;
    this.payTcAmt = 0;

    this.selectedItems.forEach(row => {
      if (payAmount !== undefined && payAmount !== null && payAmount !== '') {
        this.payBcAmt += parseFloat(payAmount);
        this.payTcAmt += parseFloat(payTCAmount);
      }
    });

    this.docForm.patchValue({
      'totalBCAmount': this.payBcAmt,
      'totalTCAmount': this.payTcAmt
    });

  }
  tcToBcInput(value: any, row: any, ex: any) {
    this.tcToBCDebounce(value, row, ex);
  }

  tcToBCDebounce = debounce((value, row: any, ex) => {
    this.tcToBcAmountCalculation(value, row, ex);
  }, 300);

  tcToBcAmountCalculation(value, row: any, ex) {
    let bcAmt = Number(parseFloat(value) * ex);
    let detaillArray = this.docForm.controls.detail as FormArray;
    let detailFormGroup = detaillArray.at(row) as FormGroup;
    detailFormGroup.patchValue({
      payAmount: bcAmt,
    });
    row.payAmount = bcAmt
    this.totalAmountCalculation(this.docForm.value.tablerow[row].payTCAmount, this.docForm.value.tablerow[row].payAmount);

  }
  // Function to reset lists
  private resetLists() {
    this.mainList = [];
    this.usersData = [];
    // this.dataSource = new MatTableDataSource(this.usersData);
    // this.dataSource.sort = this.sort;
  }
}
export interface SubList { }
export interface MainList {
  erNo: String;
  deportYard: String;
  containerType: String;
  containerNo: String;
  isTransit: String;
}
