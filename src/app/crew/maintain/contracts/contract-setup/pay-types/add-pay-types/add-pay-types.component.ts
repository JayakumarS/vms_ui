
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { payTypes } from '../pay-typer.model';
import { PayTypesService } from '../pay-types.service';
@Component({
  selector: 'app-add-pay-types',
  templateUrl: './add-pay-types.component.html',
  styleUrls: ['./add-pay-types.component.sass']
})
export class AddPayTypesComponent implements OnInit {

  docForm: FormGroup;
  payTypes: payTypes;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  isChecked: boolean = false;

  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];

  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public PayTypesService: PayTypesService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
  


      offSigndetail: this.fb.array([
        this.fb.group({
          siNo : 1,
          payType:[""],
          contents:[""],
          col: [""],
          description: [""],
          pay: [""],
          office: [""],
          mga: [""],
   
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
   }

   addRow(){
    let offSigndetailDtlArray=this.docForm.controls.offSigndetail as FormArray;
    let arraylen=offSigndetailDtlArray.length;
    var len = this.docForm.controls["offSigndetail"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      siNo :len + 1,
      payType:[""],
      contents:[""],
      col: [""],
      description: [""],
      pay: [""],
      office: [""],
      mga: [""],
    })
    offSigndetailDtlArray.insert(arraylen,newUsergroup);
  }

   removeRow(index){

    var value;
    let dataarray1 = this.docForm.controls.offSigndetail as FormArray;
    dataarray1.removeAt(index);

  }
  onSubmit(){

  }
  fetchDetails(countryCode: any): void {
   
  }
  
  update() {


  }

  onCancel(){
    this.router.navigate(['/crew/maintain/contracts/contract-setup/pay-types/list-pay-types']);

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

  }

}

