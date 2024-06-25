import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CountryMaster } from '../country-master.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CountryMasterResultBean } from '../country-master-result-bean';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CountryMasterService } from '../country-master.service';

@Component({
  selector: 'app-add-country-master',
  templateUrl: './add-country-master.component.html',
  styleUrls: ['./add-country-master.component.sass']
})
export class AddCountryMasterComponent implements OnInit {

  docForm: FormGroup;
  countryMaster: CountryMaster;
  edit:boolean=false;
 
  public currencyFilterCtrl: FormControl = new FormControl();
  currencyFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('contractscurrency', { static: true }) contractscurrency: MatSelect;

  public phoneFilterCtrl: FormControl = new FormControl();
  phoneFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('phoneFilter', { static: true }) phoneFilter: MatSelect;
  protected onDestroy = new Subject<void>();

  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];
  currencyList:any=[];
  phoneList:any=[];

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
      countryCode: ["", [Validators.required]],
      countryName: ["", [Validators.required]],
      currencyCode: ["", [Validators.required]],
      phoneCode : [""],
      nationality :[""],
      isActive:[true],
      countryId:[""]
    });

  }
  
   ngOnInit() {
    
     this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ 
      this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId) ;

      }
     }); 

    // Currency list dropdown
    this.httpService.get<CountryMasterResultBean>(this.countryMasterService.currencyListUrl).subscribe(
      (data) => {
        this.currencyList = data.lCommonUtilityBean;
        this.currencyFilteredOptions.next(this.currencyList.slice());
      },);

     this.currencyFilteredOptions.next(this.currencyList.slice());
     this.currencyFilterCtrl.valueChanges
       .pipe(takeUntil(this.onDestroy))
       .subscribe(() => {
         this.filterCurrency();
       });

    // Phone code list dropdown
    this.httpService.get<CountryMasterResultBean>(this.countryMasterService.phoneCodeListUrl).subscribe(
      (data) => {
        this.phoneList = data.lCommonUtilityBean;
        this.phoneFilteredOptions.next(this.phoneList.slice());
      },);

     this.phoneFilteredOptions.next(this.phoneList.slice());
     this.phoneFilterCtrl.valueChanges
       .pipe(takeUntil(this.onDestroy))
       .subscribe(() => {
         this.filterPhoneCode();
       });
   }


   filterPhoneCode(){
    if (!this.phoneList) {
      return;
    }
    let search = this.phoneFilterCtrl.value;
    if (!search) {
      this.phoneFilteredOptions.next(this.phoneList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.phoneFilteredOptions.next(
      this.phoneList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filterCurrency(){
    if (!this.currencyList) {
      return;
    }
    let search = this.currencyFilterCtrl.value;
    if (!search) {
      this.currencyFilteredOptions.next(this.currencyList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.currencyFilteredOptions.next(
      this.currencyList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

  save(){
    if(this.docForm.valid){
      this.countryMaster = this.docForm.value;
      // console.log(this.countryMaster);
      this.countryMasterService.addCountry(this.countryMaster,this.router,this.notificationService);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }
  fetchDetails(countryCode: any): void {
    this.httpService.get(this.countryMasterService.editCountryMaster + "?id="+countryCode).subscribe((res: any) => {
      // console.log(countryCode);

      this.docForm.patchValue({
        'countryCode': res.list[0].countryCode,
        'countryName': res.list[0].countryName,
        'currencyCode': res.list[0].currencyCode,
        'phoneCode': res.list[0].phoneCode,
        'nationality': res.list[0].nationality,
        'isActive': res.list[0].isActive,
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
    this.docForm.value.countryId = this.requestId;
    this.countryMaster = this.docForm.value;
    this.countryMasterService.countryUpdate(this.countryMaster,this.router,this.notificationService);

  }

  cancel(){
    this.router.navigate(['/vessels/master/country-Master/list-CountryMaster']);
  }

  getmastrcurr(){
    this.httpService.get<CountryMasterResultBean>(this.countryMasterService.currencyListUrl).subscribe(
      (data) => {
        this.currencyList = data.currencyList;
      },
      (error: HttpErrorResponse) => {
       //  console.log(error.name + " " + error.message);
      }
    );
    
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
