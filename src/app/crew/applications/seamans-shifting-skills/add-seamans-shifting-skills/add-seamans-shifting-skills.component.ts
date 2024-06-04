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
import { SeamansShiftingSkills } from '../seamans-shifting-skills.model';
import { SeamansShiftingSkillsResultBean } from '../seamans-shifting-skills-result-bean';


@Component({
  selector: 'app-add-seamans-shifting-skills',
  templateUrl: './add-seamans-shifting-skills.component.html',
  styleUrls: ['./add-seamans-shifting-skills.component.sass']
})
export class AddSeamansShiftingSkillsComponent implements OnInit {

  docForm: FormGroup;
  countryMaster: SeamansShiftingSkills;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];
  isChecked: boolean = false;
  currentTimeSlot: any;


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
      seaman: ["", [Validators.required]],
      vessel: ["", [Validators.required]],
      rank:[""],
       servicestate:[""],
      isActive:["true"],
      seamansdtltable: this.fb.array([
        this.fb.group({
          startingdate: ["",[Validators.required]],
          remarks:[""],
          endingDate:[""],
          // rank:["",[Validators.required]],
          
        })
       
      ]),
      seamansdtltable1: this.fb.array([
        this.fb.group({
          shiftstart: [""],
          shiftend: [""],
          place: [""],
          watchkeeping: [""],

        })
      ]),
    });
    
    }
  
   ngOnInit() {
    
     // Currency list dropdown
    this.httpService.get<SeamansShiftingSkillsResultBean>(this.countryMasterService.currencyListUrl).subscribe(
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

    for (let i = 0; i < numberOfSlots; i++) {
        let newUsergroup: FormGroup = this.fb.group({
            shiftstart: [""],
            shiftend: [""],
            place: [""],
            watchkeeping: [""],
        });
        seamansdtltableArray.insert(currentLength + i, newUsergroup);
    }

    const timeSlotParts = this.currentTimeSlot.split('-');
    const startTime = timeSlotParts[0];
    const endTime = timeSlotParts[1];
  
    // Increment the start and end time by 1 hour
    const newStartTime = this.incrementHour(startTime);
    const newEndTime = this.incrementHour(endTime);
  
    this.currentTimeSlot = `${newStartTime}-${newEndTime}`;
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

