
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { Accountants } from '../accountants.model';
import { AccountantsResultBean } from '../accountants-result-bean';

@Component({
  selector: 'app-add-accountants',
  templateUrl: './add-accountants.component.html',
  styleUrls: ['./add-accountants.component.sass']
})
export class AddAccountantsComponent implements OnInit {
  public groupageFilterCtrl: FormControl = new FormControl();
  groupageFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('suppliergroupage', { static: true }) suppliergroupage: MatSelect;

  public departmentFilterCtrl: FormControl = new FormControl();
  departmentFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('suppliergroupage', { static: true }) supplierdepartment: MatSelect;

  protected onDestroy = new Subject<void>();




  docForm: FormGroup;
  countryMaster: Accountants;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;
  groupagelist:any;
  departmentlist:any;
  // For Encryption
  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];

  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public countryMasterService: CountryMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      code: ["", [Validators.required]],
      description: ["", [Validators.required]],
      groupage: ["", [Validators.required]],
      
      isActive:["true"],
    });

  }
  
   ngOnInit() {
    
     // Currency list dropdown
    this.httpService.get<AccountantsResultBean>(this.countryMasterService.currencyListUrl).subscribe(
      // //  (data) => {
      // //    this.currencyList = data.currencyList;
      // //    this.currtmpList=data.currencyList;
      // //  },
      //  (error: HttpErrorResponse) => {
      //   //  console.log(error.name + " " + error.message);
      //  }
     );

     this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });

     this.groupageFilterCtrl.valueChanges
     .pipe(takeUntil(this.onDestroy))
     .subscribe(() => {
       this.filtergroupage();
     });
   
     this.groupagelist = [
       { id: "junior officer", text: "junior officer" },
       { id: " officer", text: "  officer" },
       {  id: "petty officer", text: "petty officer"},
       {  id: "senior officer", text: "senior officer"},
       {  id: "SuperNumerary", text: "SuperNumerary"},
       {  id: "Trainee", text: "Trainee"},
       {  id: "Visitor", text: "Visitor"}
     ];
     

     this.groupageFilteredOptions.next(this.groupagelist.slice());


     this.departmentFilterCtrl.valueChanges
     .pipe(takeUntil(this.onDestroy))
     .subscribe(() => {
       this.filterdepartment();
     });
   
     this.departmentlist = [
       { id: "deck", text: "deck" },
       { id: " engine", text: " engine" },
       {  id: "catering", text: "catering"},
       {  id: "others", text: "others"},
     
     ];
     

     this.departmentFilteredOptions.next(this.departmentlist.slice());


   }

   save(){}

   cancel(){
     this.router.navigate(['/crew/maintain/maintain-rank/list-maintain-rank']);
   }
  filtergroupage(){
    if (!this.groupagelist) {
      return;
    }
    // get the search keyword
    let search = this.groupageFilterCtrl.value;
    if (!search) {
      this.groupageFilteredOptions.next(this.groupagelist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.groupageFilteredOptions.next(
      this.groupagelist.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filterdepartment(){
    if (!this.departmentlist) {
      return;
    }
    // get the search keyword
    let search = this.departmentFilterCtrl.value;
    if (!search) {
      this.departmentFilteredOptions.next(this.departmentlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.departmentFilteredOptions.next(
      this.departmentlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
  fetchDetails(countryCode: any): void {
    this.httpService.get(this.countryMasterService.editCountryMaster + "?countryMaster="+encodeURIComponent(this.encryptionService.encryptAesToString(countryCode, this.serverUrl.secretKey).toString())).subscribe((res: any) => {
      // console.log(countryCode);

      this.docForm.patchValue({
        'countryCode': res.countryMasterBean.countryCode,
        'countryName': res.countryMasterBean.countryName,
        'currency': res.countryMasterBean.currency,
        'clientType': res.countryMasterBean.clientType,
        'isActive': res.countryMasterBean.isActive,
      })
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  
  update() {

    

  }

  // onCancel(){
  //   this.router.navigate(['/crew/maintain/maintain-rank/list-maintain-rank']);
  // }

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
        countryCode: [""],
        countryName: [""],
        currency: [""],
        clientType:[""],
        isActive:["true"],
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
    this.httpService.get<any>(this.countryMasterService.validateCusShortNameUrl+ "?tableName=" +"country"+"&columnName="+"country_code"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['countryCode'].setErrors({ country: true });
      }else{
        this.docForm.controls['countryCode'].setErrors(null);
      }
    });
  }

}

