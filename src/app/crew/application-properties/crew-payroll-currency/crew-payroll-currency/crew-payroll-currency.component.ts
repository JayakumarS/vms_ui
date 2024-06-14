
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { CrewPayrollCurrency } from '../crew-payroll-currency.model';


@Component({
  selector: 'app-crew-payroll-currency',
  templateUrl: './crew-payroll-currency.component.html',
  styleUrls: ['./crew-payroll-currency.component.sass']
})
export class CrewPayrollCurrencyComponent implements OnInit {
  public placeFilterCtrl: FormControl = new FormControl();
  placeFilterCtrlOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('placeTest', { static: true }) placeTest: MatSelect;
  public vesselFilterCtrl: FormControl = new FormControl();
  vesselFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vesselFilter', { static: true }) vesselFilter: MatSelect;
  protected onDestroy = new Subject<void>();
  docForm: FormGroup;
  placeList:any=[];
  countryMaster: CrewPayrollCurrency;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;
  timingList:any=[];
  nationList:any=[];
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
      seaman: [""],
      vessel: [""],
      rank:[""],
       servicestate:[""],
      isActive:["true"],
      seamansdtltable: this.fb.array([
        this.fb.group({
          select:[""],
          startingdate: [""],
          remarks:[""],
          endingDate:[""],
          isChecked:[""],
          // rank:["",[Validators.required]],
          
        })
       
      ]),
      seamansdtltable1: this.fb.array([
        this.fb.group({
          select: [""],
          shiftStart: [""],
          shiftEnd: [""],
          place: [""],
          watchKeeping: [""],

        })
      ]),
    });
    
    }
  
   ngOnInit() {
    
    this.nationList = [{id:1,text:"POLAND"},{id:2,text:"PAKISTANI"},{id:3,text:"NEPALESE"},{id:4,text:"PHILIPINO"}];
    this.vesselFilteredOptions.next(this.nationList.slice());

    this.vesselFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
        this.filtervessel();
    });
     this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
     this.placeList = [{id:1,text:"At Sea"},{id:2,text:"In Port"}];
   // this.timingList = [{id:1,text:"0:00"},{id:2,text:"0:30"},{id:3,text:"1:00"},{id:4,text:"1:30"}];

    let id = 1;

    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        this.timingList.push({ id: id++, text: timeString });
      }
    }

    this.placeFilterCtrlOptions.next(this.placeList.slice());
  
    this.placeFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.placeListFilter();
    });
   }
   placeListFilter(){
    if (!this.placeList) {
      return;
    }
    let search = this.placeFilterCtrl.value;

    if(!search) {
      this.placeFilterCtrlOptions.next(this.placeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.placeFilterCtrlOptions.next(
      this.placeList.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filtervessel(){
    if (!this.nationList) {
      return;
    }
    let search = this.vesselFilterCtrl.value;
    if (!search) {
      this.vesselFilteredOptions.next(this.nationList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.vesselFilteredOptions.next(
      this.nationList.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   addRowTwo(){
    let seamansdtltable1 = this.docForm.controls.seamansdtltable1 as FormArray;
    let arraylen = seamansdtltable1.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: [""],
      shiftEnd: [""],
      place: [""],
      watchKeeping: [true],
      readOnly: [false],
      type:[""]
    })
    seamansdtltable1.insert(arraylen, newUsergroup);
  }
  save(){

  }
  onVesselChange(){}
  cancel(){
    this.router.navigate(['/crew/applications/seamans-working-shift/list-seamans-working-shift']);
  }
  removeRowTwo(){
    let count = 0;
    const deleteRow = this.docForm.controls.seamansdtltable1 as FormArray;
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
   shiftOne(){
    let seamansdtltable1 = this.docForm.controls.seamansdtltable1 as FormArray;
    for (let i = this.docForm.controls.seamansdtltable1.value.length - 1; i >= 0; i--) {
      let element = this.docForm.controls.seamansdtltable1.value[i];
      if (element.type == "1") {
        seamansdtltable1.removeAt(i);
      }
    }
    seamansdtltable1.clear();

    
    let arraylen = seamansdtltable1.length;
    
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["18.30"],
      shiftEnd: ["22.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["1"]
    })
    seamansdtltable1.insert(arraylen, newUsergroup);

    let newUsergroupTwo: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["6.30"],
      shiftEnd: ["10.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["1"]
    })
    seamansdtltable1.insert(arraylen, newUsergroupTwo);
  }

  shiftTwo(){
    let seamansdtltable1 = this.docForm.controls.seamansdtltable1 as FormArray;
    for (let i = this.docForm.controls.seamansdtltable1.value.length - 1; i >= 0; i--) {
      let element = this.docForm.controls.seamansdtltable1.value[i];
      if (element.type == "2") {
        seamansdtltable1.removeAt(i);
      }
    }

    let arraylen = seamansdtltable1.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["22.30"],
      shiftEnd: ["02.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["2"]
    })
    seamansdtltable1.insert(arraylen, newUsergroup);

    let newUsergroupTwo: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["10.30"],
      shiftEnd: ["14.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["2"]
    })
    seamansdtltable1.insert(arraylen, newUsergroupTwo);
  }

  shiftThree(){
    let seamansdtltable1 = this.docForm.controls.seamansdtltable1 as FormArray;
    for (let i = this.docForm.controls.seamansdtltable1.value.length - 1; i >= 0; i--) {
      let element = this.docForm.controls.seamansdtltable1.value[i];
      if (element.type == "3") {
        seamansdtltable1.removeAt(i);
      }
    } 

    let arraylen = seamansdtltable1.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["02.30"],
      shiftEnd: ["06.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["3"]
    })
    seamansdtltable1.insert(arraylen, newUsergroup);

    let newUsergroupTwo: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["14.30"],
      shiftEnd: ["18.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["3"]
    })
    seamansdtltable1.insert(arraylen, newUsergroupTwo);
  }
  onSubmit(){
    
  }
  // removeRow(index){
  //   var value;
  //   let dataarray1 = this.docForm.controls.seamansdtltable as FormArray;
  //   dataarray1.removeAt(index);
  // }
  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.seamansdtltable as FormArray;
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
      select: [""],
      startingdate: [""],
      remarks: [""],
      endingDate:[""],
      isChecked:[""],

    })
    seamansdtltableArray.insert(arraylen, newUsergroup);

  }
  incrementTimeSlot() {
    let seamansdtltableArray = this.docForm.controls.seamansdtltable1 as FormArray;
    const numberOfSlots = 4; 
    const currentLength = seamansdtltableArray.length;
    seamansdtltableArray.clear();

   
    let startTime = 8;
    let endTime = 9;

    for (let i = 0; i < numberOfSlots; i++) {
        
        let newUsergroup: FormGroup = this.fb.group({
            shiftstart: [`${startTime}.00`],
            shiftend: [`${endTime}.00`],
            place: [""],
            watchkeeping: [""],
        });

       
        seamansdtltableArray.insert(currentLength + i, newUsergroup);

       
        startTime++;
        endTime++;
    }

   
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
    this.router.navigate(['//crew/applications/seamans-working-shift/list-seamans-working-shift']);
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

