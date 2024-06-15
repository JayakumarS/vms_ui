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
import { miultiSeamenInsert } from '../multi-seamen-insert.model';
import { MultiSeamenInsertService } from '../multi-seamen-insert.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailsPopupComponent } from '../person-details-popup/person-details-popup.component';
@Component({
  selector: 'app-add-multi-seamen-insert',
  templateUrl: './add-multi-seamen-insert.component.html',
  styleUrls: ['./add-multi-seamen-insert.component.sass']
})
export class AddMultiSeamenInsertComponent implements OnInit {

  public registryportFilterCtrl: FormControl = new FormControl();
  registryportFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('registryport', { static: true }) registryport: MatSelect;

  public vessaltypeFilterCtrl: FormControl = new FormControl();
  vessaltypeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vessaltype', { static: true }) vessaltype: MatSelect;

  public nationalityFilterCtrl: FormControl = new FormControl();
  nationalityFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('nationality', { static: true }) nationality: MatSelect;

  public rankFilterCtrl: FormControl = new FormControl();
  rankFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('rank', { static: true }) rank: MatSelect;

  public payFilterCtrl: FormControl = new FormControl();
  payFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('pay', { static: true }) pay: MatSelect;


  public currencyFilterCtrl: FormControl = new FormControl();
  currencyFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('currency', { static: true }) currency: MatSelect;

  public nameFilterCtrl: FormControl = new FormControl();
  nameFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('name', { static: true }) name: MatSelect;

  protected onDestroy = new Subject<void>();


  docForm: FormGroup;
  miultiSeamenInsert: miultiSeamenInsert;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;
  vessaltypelist: any;
  nationalitylist: any;
  ranklist: any;
  paylist: any;
  currencylist: any;
  namelist: any;
  registryportlist: any;
  // For Encryption
  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];

  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public MultiSeamenInsertService: MultiSeamenInsertService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService, public dialog: MatDialog,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
      startdateObj: [""],
      startdate: [""],
      vessal: [""],
      port: [""],
      multiseamendetail: this.fb.array([
        this.fb.group({
          select: [""],
          code:[""],
          rank:[""],
          pay: [""],
          currency: [""],
          name: [""],
          joiningdateObj: [""],
          joiningdate: [""],
          estSigndateObj: [""],
          estSigndate: [""],
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

     this.vessaltypelist = [
      { id: "RO RO VESSAL", text: "RO RO VESSAL" },
      { id: "TANKER", text: "TANKER" },
    
    ];
    
    this.vessaltypeFilteredOptions.next(this.vessaltypelist.slice());

// listen for origin List  search field value changes
this.vessaltypeFilterCtrl.valueChanges
  .pipe(takeUntil(this.onDestroy))
  .subscribe(() => {
    this.filteritemvessaltypelist();
  });


  this.nationalitylist = [
    { id: "BANGLADESH", text: "BANGLADESH" },
    { id: "BRITISH", text: "BRITISH" },
    { id: "BELGIAN", text: "BELGIAN" },

  
  ];
  
  this.nationalityFilteredOptions.next(this.nationalitylist.slice());

// listen for origin List  search field value changes
this.nationalityFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
  this.filteritemnationalitylist();
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

this.registryportlist = [
  
  { id: "BANGLADESH", text: "BANGLADESH" },
  { id: "BRITISH", text: "BRITISH" },
  { id: "BELGIAN", text: "BELGIAN" },

];

this.registryportFilteredOptions.next(this.registryportlist.slice());

// listen for origin List  search field value changes
this.registryportFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemregistryportlist();
});


this.paylist = [
  
  { id: "YES", text: "YES" },
  { id: "NO", text: "NO" },

];

this.payFilteredOptions.next(this.paylist.slice());

// listen for origin List  search field value changes
this.payFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritempaylist();
});


this.currencylist = [
  
  { id: "USD", text: "USD" },
  { id: "INR", text: "INR" },
  { id: "AUD", text: "AUD" },
  { id: "CAD", text: "CAD" },

];

this.currencyFilteredOptions.next(this.currencylist.slice());

// listen for origin List  search field value changes
this.currencyFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemcurrencylist();
});




this.namelist = [
  
  { Code: "34575", FullName: "Rinkoo",Rank:"Cook",Nationality:"Indian" },

  { Code: "34576", FullName: "Naing",Rank:"Engineer",Nationality:"Indian" },

  { Code: "34579", FullName: "Vasim",Rank:"Officer",Nationality:"Indian" },

];

this.nameFilteredOptions.next(this.namelist.slice());

// listen for origin List  search field value changes
this.nameFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemnamelist();
});




   }

   filteritemnamelist(){
    if (!this.namelist) {
      return;
    }
    // get the search keyword
    let search = this.nameFilterCtrl.value;
    if (!search) {
      this.nameFilteredOptions.next(this.namelist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.nameFilteredOptions.next(
      this.namelist.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filteritemcurrencylist(){
    if (!this.currencylist) {
      return;
    }
    // get the search keyword
    let search = this.currencyFilterCtrl.value;
    if (!search) {
      this.currencyFilteredOptions.next(this.currencylist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.currencyFilteredOptions.next(
      this.currencylist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritempaylist(){
    if (!this.paylist) {
      return;
    }
    // get the search keyword
    let search = this.payFilterCtrl.value;
    if (!search) {
      this.payFilteredOptions.next(this.paylist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.payFilteredOptions.next(
      this.paylist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemregistryportlist(){
    if (!this.registryportlist) {
      return;
    }
    // get the search keyword
    let search = this.registryportFilterCtrl.value;
    if (!search) {
      this.registryportFilteredOptions.next(this.registryportlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.registryportFilteredOptions.next(
      this.registryportlist.filter(title => title.text.toLowerCase().includes(search))
    );
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
   filteritemnationalitylist(){
    if (!this.nationalitylist) {
      return;
    }
    // get the search keyword
    let search = this.nationalityFilterCtrl.value;
    if (!search) {
      this.nationalityFilteredOptions.next(this.nationalitylist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.nationalityFilteredOptions.next(
      this.nationalitylist.filter(title => title.text.toLowerCase().includes(search))
    );
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

   onDateChange2(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.MultiSeamenInsertService.getDate(event.target.value);
      if (inputFlag == "startdate") {
        this.docForm.patchValue({ startdate: cdate });
      }
    
    }
  
    // if(this.docForm.value.dueDate!=null){
    //   this.check(this.docForm.value.dueDate);
    // }
  }
  onDateInput2(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    if(inputValue!=""){
      if (dateFormat.test(inputValue)) {
        let fdate = this.MultiSeamenInsertService.getDateObj(inputValue);
        if (inputFlag == "startdate") {
          this.docForm.patchValue({
            'startdate': inputValue,
            'startdateObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'startdate': "",
        'startdateObj':""
       });
    }
    
  }
  formatDate2(event: any) {
    const inputDate = event.value;
    if (inputDate && typeof inputDate === 'string') {
        const parts = inputDate.split('/');
        if (parts.length === 3) {
            const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            const parsedDate = moment(formattedDate, 'YYYY/MM/DD');
            this.docForm.get('startdate').setValue(parsedDate);
        }
    }
  }



  
  onDateChange3(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.MultiSeamenInsertService.getDate(event.target.value);
      if (inputFlag == "joiningdate") {
        this.docForm.patchValue({ joiningdate: cdate });
      }
    
    }
  
    // if(this.docForm.value.dueDate!=null){
    //   this.check(this.docForm.value.dueDate);
    // }
  }
  onDateInput3(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    if(inputValue!=""){
      if (dateFormat.test(inputValue)) {
        let fdate = this.MultiSeamenInsertService.getDateObj(inputValue);
        if (inputFlag == "joiningdate") {
          this.docForm.patchValue({
            'joiningdate': inputValue,
            'joiningdateObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'joiningdate': "",
        'joiningdateObj':""
       });
    }
    
  }
  formatDate3(event: any) {
    const inputDate = event.value;
    if (inputDate && typeof inputDate === 'string') {
        const parts = inputDate.split('/');
        if (parts.length === 3) {
            const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            const parsedDate = moment(formattedDate, 'YYYY/MM/DD');
            this.docForm.get('joiningdate').setValue(parsedDate);
        }
    }
  }




  
  onDateChange4(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.MultiSeamenInsertService.getDate(event.target.value);
      if (inputFlag == "estSigndate") {
        this.docForm.patchValue({ startdate: cdate });
      }
    
    }
  
    // if(this.docForm.value.dueDate!=null){
    //   this.check(this.docForm.value.dueDate);
    // }
  }
  onDateInput4(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    if(inputValue!=""){
      if (dateFormat.test(inputValue)) {
        let fdate = this.MultiSeamenInsertService.getDateObj(inputValue);
        if (inputFlag == "estSigndate") {
          this.docForm.patchValue({
            'estSigndate': inputValue,
            'estSigndateObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'estSigndate': "",
        'estSigndateObj':""
       });
    }
    
  }
  formatDate4(event: any) {
    const inputDate = event.value;
    if (inputDate && typeof inputDate === 'string') {
        const parts = inputDate.split('/');
        if (parts.length === 3) {
            const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            const parsedDate = moment(formattedDate, 'YYYY/MM/DD');
            this.docForm.get('estSigndate').setValue(parsedDate);
        }
    }
  }



  popup(row){
    let tempDirection: 'ltr' | 'rtl';
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(PersonDetailsPopupComponent, {
      data: row,
      height: "80%",
      width: "100%",
      direction: tempDirection,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

   addRow(){
    let multiseamendetailDtlArray=this.docForm.controls.multiseamendetail as FormArray;
    let arraylen=multiseamendetailDtlArray.length;
    let newUsergroup:FormGroup = this.fb.group({
      select: [""],
      code:[""],
      rank:[""],
      pay: [""],
      currency: [""],
      name: [""],
      joiningdateObj: [""],
      joiningdate: [""],
      estSigndateObj: [""],
      estSigndate: [""],
    })
    multiseamendetailDtlArray.insert(arraylen,newUsergroup);
  }

   removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.multiseamendetail as FormArray;
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
  onSubmit(){

  }
  fetchDetails(countryCode: any): void {
   
  }
  
  update() {


  }

  onCancel(){
    this.router.navigate(['/crew/maintain/off-sign/list-off-sign']);

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
        vessaltype: [""],


        multiseamendetail: this.fb.array([
          this.fb.group({
            siNo : 1,
            nationality:[""],
            rank:[""],
            months: [""],
  
     
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
