import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';
import { CountryMaster } from '../country-master.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CountryMasterResultBean } from '../country-master-result-bean';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-country-master',
  templateUrl: './add-country-master.component.html',
  styleUrls: ['./add-country-master.component.sass']
})
export class AddCountryMasterComponent implements OnInit {

  docForm: FormGroup;
  countryMaster: CountryMaster;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

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
      countryCode: ["", [Validators.required]],
      countryName: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      clientType:[""],
      isActive:["true"],
    });

  }
  
   ngOnInit() {
    
     // Currency list dropdown
    this.httpService.get<CountryMasterResultBean>(this.countryMasterService.currencyListUrl).subscribe(
       (data) => {
         this.currencyList = data.currencyList;
         this.currtmpList=data.currencyList;
       },
       (error: HttpErrorResponse) => {
        //  console.log(error.name + " " + error.message);
       }
     );

     this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
   }

  onSubmit(){
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

    this.countryMaster = this.docForm.value;
    this.countryMasterService.countryUpdate(this.countryMaster,this.router,this.notificationService);

  }

  onCancel(){
    this.router.navigate(['/master/country-Master/list-CountryMaster']);
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
