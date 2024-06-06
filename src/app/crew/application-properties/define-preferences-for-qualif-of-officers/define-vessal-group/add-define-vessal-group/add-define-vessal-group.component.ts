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
import { definevessalgroup } from '../define-vessal-group.model';
import { DefineVessalGroupService } from '../define-vessal-group.service';
@Component({
  selector: 'app-add-define-vessal-group',
  templateUrl: './add-define-vessal-group.component.html',
  styleUrls: ['./add-define-vessal-group.component.sass']
})
export class AddDefineVessalGroupComponent implements OnInit {


 
  public typecodeFilterCtrl: FormControl = new FormControl();
  typecodeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('typecode', { static: true }) typecode: MatSelect;
 


  public typesubgroupFilterCtrl: FormControl = new FormControl();
  typesubgroupFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('typesubgroup', { static: true }) typesubgroup: MatSelect;
 
  public typegroupCtrl: FormControl = new FormControl();
  typegroupFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('typegroup', { static: true }) typegroup: MatSelect;

  protected onDestroy = new Subject<void>();


  docForm: FormGroup;
  definevessalgroup: definevessalgroup;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  isChecked: boolean = false;
  ranklist: any;
  typegrouplist: any;
  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];
  itemRevenueExplist:any;
  itemTypelist:any;
  onboardlist:any;
  quantityCalculationlist:any;
  contentsFilterslist:any;
  groupinglist:any;
  typesubgrouplist:any;
  typecodelist:any;
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public DefineVessalGroupService: DefineVessalGroupService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
  


      definevessaldetails: this.fb.array([
        this.fb.group({
     
          typegroup: [""],
          typesubgroup: [""],
          typecode: [""],
       
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



  
     this.typegrouplist = [
      { id: "BULKER", text: "BULKER" },
      { id: "TANKER", text: "TANKER" },
    
    
    ];
    
    this.typegroupFilteredOptions.next(this.typegrouplist.slice());
    
    // listen for origin List  search field value changes
    this.typegroupCtrl.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
    this.filtertypegroup();
    });
    
    
    
    this.typesubgrouplist = [
      { id: "ALL SUBGROUP", text: "ALL SUBGROUP" },
      { id: "CHEMICAL TANKER", text: "CHEMICAL TANKER" },
      { id: "GAS TANKER", text: "GAS TANKER" },
      { id: "OIL TANKER", text: "OIL TANKER" }
    
    
    ];
    
    this.typesubgroupFilteredOptions.next(this.typesubgrouplist.slice());
    
    // listen for origin List  search field value changes
    this.typesubgroupFilterCtrl.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
    this.filtertypesubgrouplist();
    });
    
    
    
    this.typecodelist = [
      { id: "PaySlips", text: "PaySlips" },
      { id: "Income and Expense", text: "Income and Expense" },
      {  id: "Pay for repor", text: "Pay for repor"},
    
    
    ];
    
    this.typecodeFilteredOptions.next(this.typecodelist.slice());
    
    // listen for origin List  search field value changes
    this.typecodeFilterCtrl.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
    this.filtertypecodelist();
    });
    



}
filtertypecodelist(){
  if (!this.typecodelist) {
    return;
  }
  // get the search keyword
  let search = this.typecodeFilterCtrl.value;
  if (!search) {
    this.typesubgroupFilteredOptions.next(this.typecodelist.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  // filter the banks
  this.typecodeFilteredOptions.next(
    this.typecodelist.filter(title => title.text.toLowerCase().includes(search))
  );
}
filtertypesubgrouplist(){
  if (!this.typesubgrouplist) {
    return;
  }
  // get the search keyword
  let search = this.typesubgroupFilterCtrl.value;
  if (!search) {
    this.typesubgroupFilteredOptions.next(this.typesubgrouplist.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  // filter the banks
  this.typesubgroupFilteredOptions.next(
    this.typesubgrouplist.filter(title => title.text.toLowerCase().includes(search))
  );
 }
 filtertypegroup(){
  if (!this.typegrouplist) {
    return;
  }
  // get the search keyword
  let search = this.typegroupCtrl.value;
  if (!search) {
    this.typegroupFilteredOptions.next(this.typegrouplist.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  // filter the banks
  this.typegroupFilteredOptions.next(
    this.typegrouplist.filter(title => title.text.toLowerCase().includes(search))
  );
 }





   addRow(){
    let definevessaldetailsDtlArray=this.docForm.controls.definevessaldetails as FormArray;
    let arraylen=definevessaldetailsDtlArray.length;
    var len = this.docForm.controls["definevessaldetails"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      typegroup: [""],
      typesubgroup: [""],
      typecode: [""],
   
    })
    definevessaldetailsDtlArray.insert(arraylen,newUsergroup);
  }

   removeRow(index){

    var value;
    let dataarray1 = this.docForm.controls.definevessaldetails as FormArray;
    dataarray1.removeAt(index);

  }
  onSubmit(){

  }
  fetchDetails(countryCode: any): void {
   
  }
  
  update() {


  }

  onCancel(){
    this.router.navigate(['/crew/application-properties/define-preferences-for-qualif-of-officers/define-vessal-group/list-Define-vessalGroup']);

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
        definevessaldetails: this.fb.array([
          this.fb.group({
            typegroup: [""],
            typesubgroup: [""],
            typecode: [""],
         
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


