
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeamansContract } from '../seamans-contract.model';
import { SeamansContractResultBean } from '../seamans-contract-result-bean';


@Component({
  selector: 'app-seamans-contract',
  templateUrl: './seamans-contract.component.html',
  styleUrls: ['./seamans-contract.component.sass']
})
export class SeamansContractComponent implements OnInit {

  docForm: FormGroup;
  countryMaster: SeamansContract;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];
  contractForm: FormGroup;

  isChecked: boolean = false;
  currentTimeSlot: any;
  public exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

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
      
       servicestate:[""],
      isActive:["true"],
      paytype:[""],
      typeofcontract:[""],
      startingdate:[""],
      joiningdate:[""],
      port:[""],
      vessel:[""],
      rank:[""],
      seaman:[""],
      currency:[""],
      dateofcontract:[""],
      timeofcontract: [" "],
      dateTimeOfContract: [''],
      time: ['']

      
    });
    
    }
  
   ngOnInit() {
    
     // Currency list dropdown
    this.httpService.get<SeamansContractResultBean>(this.countryMasterService.currencyListUrl).subscribe(
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
   }

  onSubmit(){
    
  }
  removeRow(){
    
  }
 
  onCheckboxChange() {
    // Add your logic here based on checkbox state change
    console.log('Checkbox state changed:', this.isChecked);
  }
  
 
 
  onDateChange1(event: any, inputFlag: any, index: number) {
    // if (event.target.value != null) {
    //   if (inputFlag == "servicestate") {
    //     this.docForm.patchValue({ servicestate: cdate });
    //   }

    // }

    // if(this.docForm.value.creditNoteDate!=null){
    //   this.createForm(this.docForm.value.creditNoteDate);
    // }
  }
  
  onDateChange(event: any, inputFlag: any, index: number) {
    // if (event.target.value != null) {
    //   if (inputFlag == "servicestate") {
    //     this.docForm.patchValue({ servicestate: cdate });
    //   }

    // }

    // if(this.docForm.value.creditNoteDate!=null){
    //   this.createForm(this.docForm.value.creditNoteDate);
    // }
  }
  openTimePicker(): void {
    const timeInput = document.getElementById('hiddenTimeInput') as HTMLInputElement;
    timeInput.click();
  }
  onDateInput(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    // const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    // if (inputValue != "") {
    //   if (dateFormat.test(inputValue)) {
    //     let fdate = this.cmnService.getDateObj(inputValue);
    //     if (inputFlag == "creditNoteDate") {
    //       this.docForm.patchValue({
    //         'creditNoteDate': inputValue,
    //         'creditNoteDateObj': fdate
    //       });
    //     }
    //   }
    // } else {
    //   this.docForm.patchValue({
    //     'creditNoteDate': "",
    //     'cabotageInvoiceDateObj': ""
    //   });
    // }

  }
  onDateInput1(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    // const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    // if (inputValue != "") {
    //   if (dateFormat.test(inputValue)) {
    //     let fdate = this.cmnService.getDateObj(inputValue);
    //     if (inputFlag == "creditNoteDate") {
    //       this.docForm.patchValue({
    //         'creditNoteDate': inputValue,
    //         'creditNoteDateObj': fdate
    //       });
    //     }
    //   }
    // } else {
    //   this.docForm.patchValue({
    //     'creditNoteDate': "",
    //     'cabotageInvoiceDateObj': ""
    //   });
    // }

  }
  addRow() {
    let seamansdtltableArray = this.docForm.controls.seamansdtltable as FormArray;
    let arraylen = seamansdtltableArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      startingdate: [""],
      remarks: [""],
      endingDate:[""]
      

    })
    seamansdtltableArray.insert(arraylen, newUsergroup);

  }
  incrementTimeSlot() {
    let seamansdtltableArray = this.docForm.controls.seamansdtltable1 as FormArray;
    const numberOfSlots = 4; // Number of rows to insert
    const currentLength = seamansdtltableArray.length;
    seamansdtltableArray.clear();

    // Initialize start time
    let startTime = 8;
    let endTime = 9;

    for (let i = 0; i < numberOfSlots; i++) {
        // Create form group with start and end time
        let newUsergroup: FormGroup = this.fb.group({
            shiftstart: [`${startTime}.00`],
            shiftend: [`${endTime}.00`],
            place: [""],
            watchkeeping: [""],
        });

        // Insert form group into FormArray
        seamansdtltableArray.insert(currentLength + i, newUsergroup);

        // Increment start and end time by 1 hour
        startTime++;
        endTime++;
    }

    // Update current time slot
    this.currentTimeSlot = `8.00-9.00`;
}

incrementTimeSlot1(){
  let seamansdtltableArray = this.docForm.controls.seamansdtltable1 as FormArray;
    const numberOfSlots = 4; // Number of rows to insert
    const currentLength = seamansdtltableArray.length;
    seamansdtltableArray.clear();

    // Initialize start time
    let startTime = 12;
    let endTime = 13;

    for (let i = 0; i < numberOfSlots; i++) {
        // Create form group with start and end time
        let newUsergroup: FormGroup = this.fb.group({
            shiftstart: [`${startTime}.00`],
            shiftend: [`${endTime}.00`],
            place: [""],
            watchkeeping: [""],
        });

        // Insert form group into FormArray
        seamansdtltableArray.insert(currentLength + i, newUsergroup);

        // Increment start and end time by 1 hour
        startTime++;
        endTime++;
    }

    // Update current time slot
    this.currentTimeSlot = `12.00-13.00`;
}
incrementTimeSlot2(){
  let seamansdtltableArray = this.docForm.controls.seamansdtltable1 as FormArray;
    const numberOfSlots = 4; // Number of rows to insert
    const currentLength = seamansdtltableArray.length;
    seamansdtltableArray.clear();

    // Initialize start time
    let startTime = 16;
    let endTime = 17;

    for (let i = 0; i < numberOfSlots; i++) {
        // Create form group with start and end time
        let newUsergroup: FormGroup = this.fb.group({
            shiftstart: [`${startTime}.00`],
            shiftend: [`${endTime}.00`],
            place: [""],
            watchkeeping: [""],
        });

        // Insert form group into FormArray
        seamansdtltableArray.insert(currentLength + i, newUsergroup);

        // Increment start and end time by 1 hour
        startTime++;
        endTime++;
    }

    // Update current time slot
    this.currentTimeSlot = `16.00-17.00`;
}
incrementHour(time) {
    const [hours, minutes] = time.split(':');
    let newHours = parseInt(hours, 10) + 1;
    if (newHours === 24) newHours = 0; // Reset to 0 if it's 24 hours
    return `${newHours.toString().padStart(2, '0')}:${minutes}`;
}

// incrementHour(time) {
//     const [hours, minutes] = time.split(':');
//     let newHours = parseInt(hours, 10) + 1;
//     if (newHours === 24) newHours = 0; // Reset to 0 if it's 24 hours
//     return `${newHours.toString().padStart(2, '0')}:${minutes}`;
// }

  
  incrementHour1(startTime: any) {
    throw new Error('Method not implemented.');
  }
  

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
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

  onCancel(){
    this.router.navigate(['/crew/maintain/maintain-rank/list-maintain-rank']);
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
    this.httpService.get<any>(this.countryMasterService.validateCusShortNameUrl+ "?tableName=" +"country"+"&columnName="+"country_code"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['countryCode'].setErrors({ country: true });
      }else{
        this.docForm.controls['countryCode'].setErrors(null);
      }
    });
  }

}

