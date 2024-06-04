import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { payItems } from '../pay-items.model';
import { PayItemsService } from '../pay-items.service';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-add-pay-items',
  templateUrl: './add-pay-items.component.html',
  styleUrls: ['./add-pay-items.component.sass']
})
export class AddPayItemsComponent implements OnInit {

  
  public itemRevenueExpFilterCtrl: FormControl = new FormControl();
  itemRevenueExpFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('supplieritemRevenueExp', { static: true }) supplieritemRevenueExp: MatSelect;
 
  
  public itemTypeFilterCtrl: FormControl = new FormControl();
  itemTypeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('itemType', { static: true }) itemType: MatSelect;
 
  protected onDestroy = new Subject<void>();


  docForm: FormGroup;
  payItems: payItems;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  isChecked: boolean = false;

  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];
  itemRevenueExplist:any;
  itemTypelist:any;
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public PayItemsService: PayItemsService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
  


      payitemsDetails: this.fb.array([
        this.fb.group({
          sort : 1,
          code:[""],
          description:[""],
          debitecode: [""],
          creditcode: [""],
          itemRevenueExp: [""],
          itemType: [""],
          onboard: [""],
          contentsFilters: [""],
          grouping: [""],
          quantityCalculation: [""],
        })
      ]),
    });


  }
  
   ngOnInit() {
    

     this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });

     this.itemRevenueExplist = [
      { id: "Income", text: "Income" },
      { id: "Expense", text: "Expense" },
      {  id: "Allotment", text: "Allotment"},
      { id: "On Board Expense", text: "On Board Expense" },
      {  id: "Summary", text: "Summary"}
    ];
    
    this.itemRevenueExpFilteredOptions.next(this.itemRevenueExplist.slice());

// listen for origin List  search field value changes
this.itemRevenueExpFilterCtrl.valueChanges
  .pipe(takeUntil(this.onDestroy))
  .subscribe(() => {
    this.filteritemRevenueExp();
  });

  this.itemTypelist = [
    { id: "Close MGA Items", text: "Close MGA Items" },
    { id: "  MGA Items", text: "  MGA Items" },
    {  id: "Pay Items", text: "Pay Items"},
    {  id: "Victualling", text: "Victualling"}
  ];
  
  this.itemTypeFilteredOptions.next(this.itemTypelist.slice());

// listen for origin List  search field value changes
this.itemTypeFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
  this.filteritemTypelist();
});

   }

   filteritemTypelist(){
    if (!this.itemTypelist) {
      return;
    }
    // get the search keyword
    let search = this.itemTypeFilterCtrl.value;
    if (!search) {
      this.itemTypeFilteredOptions.next(this.itemTypelist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.itemTypeFilteredOptions.next(
      this.itemTypelist.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   
   filteritemRevenueExp(){
    if (!this.itemRevenueExplist) {
      return;
    }
    // get the search keyword
    let search = this.itemRevenueExpFilterCtrl.value;
    if (!search) {
      this.itemRevenueExpFilteredOptions.next(this.itemRevenueExplist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.itemRevenueExpFilteredOptions.next(
      this.itemRevenueExplist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   addRow(){
    let payitemsDetailsDtlArray=this.docForm.controls.payitemsDetails as FormArray;
    let arraylen=payitemsDetailsDtlArray.length;
    var len = this.docForm.controls["payitemsDetails"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      sort : 1 + len,
      code:[""],
      description:[""],
      debitecode: [""],
      creditcode: [""],
      itemRevenueExp: [""],
      itemType: [""],
      onboard: [""],
      contentsFilters: [""],
      grouping: [""],
      quantityCalculation: [""],
    })
    payitemsDetailsDtlArray.insert(arraylen,newUsergroup);
  }

   removeRow(index){

    var value;
    let dataarray1 = this.docForm.controls.payitemsDetails as FormArray;
    dataarray1.removeAt(index);

  }
  onSubmit(){

  }
  fetchDetails(countryCode: any): void {
   
  }
  
  update() {


  }

  onCancel(){
    this.router.navigate(['/crew/maintain/contracts/contract-setup/pay-items/list-pay-items']);

  }

  getmastrcurr(){

  }
  
  
  getmastrcurr1(currid) {
  var value;
  var value1;
  this.currencyList.forEach(element => {
  if (element.id === currid) {
    value = element.text;
    value1 = element.id;
  }
  });
  return value;
  }

  onKey(value) {
    if (value == "") {
      this.currencyList = this.currtmpList;
    } else {
      this.currencyList = this.currtmpList;
      this.currencyList = this.search(value);
    }
  }
  
  search(value: string) {
    let filter = value.toLowerCase();
    return this.currencyList.filter(option =>
      option.item.toLowerCase().startsWith(filter)
    );
  }
  
  reset(){
    if(!this.edit){
      this.docForm = this.fb.group({
        payitemsDetails: this.fb.array([
          this.fb.group({
            sort : 1,
            code:[""],
            description:[""],
            debitecode: [""],
            creditcode: [""],
            itemRevenueExp: [""],
            itemType: [""],
            onboard: [""],
            contentsFilters: [""],
            grouping: [""],
            quantityCalculation: [""],
          })
        ]),
      });
    }else{
      this.fetchDetails(this.docForm.value.countryCode);
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  validateCountry(event){

  }

}

