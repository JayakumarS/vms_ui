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

import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { defineRank } from '../define-rank.model';
import { DefineRanksService } from '../define-ranks.service';
@Component({
  selector: 'app-add-define-ranks',
  templateUrl: './add-define-ranks.component.html',
  styleUrls: ['./add-define-ranks.component.sass']
})
export class AddDefineRanksComponent implements OnInit {

  
  public itemRevenueExpFilterCtrl: FormControl = new FormControl();
  itemRevenueExpFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('supplieritemRevenueExp', { static: true }) supplieritemRevenueExp: MatSelect;
 
  public onboardFilterCtrl: FormControl = new FormControl();
  onboardFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('onboard', { static: true }) onboard: MatSelect;
 
  public itemTypeFilterCtrl: FormControl = new FormControl();
  itemTypeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('itemType', { static: true }) itemType: MatSelect;
 

  public contentsFilterslistFilterCtrl: FormControl = new FormControl();
  contentsFilterslistFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('contentsFilters', { static: true }) contentsFilters: MatSelect;
 
  public quantityCalculationFilterCtrl: FormControl = new FormControl();
  quantityCalculationFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('quantityCalculation', { static: true }) quantityCalculation: MatSelect;
 

  public groupingFilterCtrl: FormControl = new FormControl();
  groupingFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('grouping', { static: true }) grouping: MatSelect;
 
  public rankFilterCtrl: FormControl = new FormControl();
  rankFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('rank', { static: true }) rank: MatSelect;

  protected onDestroy = new Subject<void>();


  docForm: FormGroup;
  defineRank: defineRank;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  isChecked: boolean = false;
  ranklist: any;

  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];
  itemRevenueExplist:any;
  itemTypelist:any;
  onboardlist:any;
  quantityCalculationlist:any;
  contentsFilterslist:any;
  groupinglist:any;
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public DefineRanksService: DefineRanksService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
  


      defineRankDetails: this.fb.array([
        this.fb.group({
          select: [""],

          rank: [""],
          qualificationRankDescription: [""],
          radioQualification: [""],
          ocimfcoccode: [""],
          bridgeTeam: [""],
          yearOfWatch: [""],
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
     this.ranklist = [
      { id: "ENGINEER", text: "ENGINEER" },
      { id: "OFFICER", text: "OFFICER" },
      { id: "COOK", text: "COOK" },
    
    
    ];
    
    this.rankFilteredOptions.next(this.ranklist.slice());
    
    // listen for origin List  search field value changes
    this.rankFilterCtrl.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
    this.filteritemranklist();
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


this.onboardlist = [
  { id: "Advances", text: "Advances" },
  { id: " Extra Items", text: "Extra Items" },
  {  id: " Fixed O/T", text: "Fixed O/T"},
  {  id: "Overtime", text: "Overtime"}
];

this.onboardFilteredOptions.next(this.onboardlist.slice());

// listen for origin List  search field value changes
this.onboardFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteronboardlist();
});

this.contentsFilterslist = [
  { id: "Yes", text: "Yes" },
  { id: " No", text: "No" },

];

this.contentsFilterslistFilteredOptions.next(this.contentsFilterslist.slice());

// listen for origin List  search field value changes
this.contentsFilterslistFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filtercontentsFilterslist();



});


this.quantityCalculationlist = [
  { id: "Yes", text: "Yes" },
  { id: " No", text: "No" },

];

this.quantityCalculationFilteredOptions.next(this.quantityCalculationlist.slice());

// listen for origin List  search field value changes
this.quantityCalculationFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filterquantityCalculationlist();

});


this.groupinglist = [
  { id: "Bonded Analysis", text: "Bonded Analysis" },
  { id: " Cash Analysis", text: "Cash Analysis" },
  { id: " Internet Analysis", text: "Internet Analysis" },
  { id: "Previous Balance", text: "Previous Balance" },
];

this.groupingFilteredOptions.next(this.groupinglist.slice());

// listen for origin List  search field value changes
this.groupingFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filtergroupinglist();

});

}


filteritemranklist(){
  if (!this.ranklist) {
    return;
  }
  // get the search keyword
  let search = this.rankFilterCtrl.value;
  if (!search) {
    this.rankFilteredOptions.next(this.ranklist.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  // filter the banks
  this.rankFilteredOptions.next(
    this.ranklist.filter(title => title.text.toLowerCase().includes(search))
  );
 }
filtergroupinglist(){
  if (!this.groupinglist) {
    return;
  }
  // get the search keyword
  let search = this.groupingFilterCtrl.value;
  if (!search) {
    this.groupingFilteredOptions.next(this.groupinglist.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  // filter the banks
  this.groupingFilteredOptions.next(
    this.groupinglist.filter(title => title.text.toLowerCase().includes(search))
  );
}
filterquantityCalculationlist(){
  if (!this.quantityCalculationlist) {
    return;
  }
  // get the search keyword
  let search = this.quantityCalculationFilterCtrl.value;
  if (!search) {
    this.quantityCalculationFilteredOptions.next(this.quantityCalculationlist.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  // filter the banks
  this.quantityCalculationFilteredOptions.next(
    this.quantityCalculationlist.filter(title => title.text.toLowerCase().includes(search))
  );
}

   filtercontentsFilterslist(){
    if (!this.contentsFilterslist) {
      return;
    }
    // get the search keyword
    let search = this.contentsFilterslistFilterCtrl.value;
    if (!search) {
      this.contentsFilterslistFilteredOptions.next(this.contentsFilterslist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.contentsFilterslistFilteredOptions.next(
      this.contentsFilterslist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteronboardlist(){
    if (!this.onboardlist) {
      return;
    }
    // get the search keyword
    let search = this.onboardFilterCtrl.value;
    if (!search) {
      this.onboardFilteredOptions.next(this.onboardlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.onboardFilteredOptions.next(
      this.onboardlist.filter(title => title.text.toLowerCase().includes(search))
    );
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
   removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.defineRankDetails as FormArray;
    let i = 0;
    
    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if(count == 0){
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }

  }
   addRow(){
    let defineRankDetailsDtlArray=this.docForm.controls.defineRankDetails as FormArray;
    let arraylen=defineRankDetailsDtlArray.length;
    var len = this.docForm.controls["defineRankDetails"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      select: [""],

      rank: [""],
      qualificationRankDescription: [""],
      radioQualification: [""],
      ocimfcoccode: [""],
      bridgeTeam: [""],
      yearOfWatch: [""],
    })
    defineRankDetailsDtlArray.insert(arraylen,newUsergroup);
  }

  onSubmit(){

  }
  fetchDetails(countryCode: any): void {
   
  }
  
  update() {


  }

  onCancel(){
    this.router.navigate(['/crew/application-properties/define-preferences-for-qualif-of-officers/define-ranks/list-Define-rank']);

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
        defineRankDetails: this.fb.array([
          this.fb.group({
            rank: [""],
            qualificationRankDescription: [""],
            radioQualification: [""],
            ocimfcoccode: [""],
            bridgeTeam: [""],
            yearOfWatch: [""],    
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


