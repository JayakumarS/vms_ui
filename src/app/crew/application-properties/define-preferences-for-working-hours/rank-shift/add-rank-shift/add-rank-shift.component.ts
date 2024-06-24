import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import { RankShiftService } from '../rank-shift.service';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-add-rank-shift',
  templateUrl: './add-rank-shift.component.html',
  styleUrls: ['./add-rank-shift.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
        },
      }
    }, CommonService
  ]
})
export class AddRankShiftComponent implements OnInit {

  docForm: FormGroup;
  edit:boolean=false;
  timingList:any=[];
  vesselList:any=[];
  rankList:any=[];
  placeList:any=[];
  requestId: any;
  isChecked: boolean = false;
  getvessel:any;
  decryptRequestId: any;
  constructor(
    private fb: FormBuilder,
    private cmnService: CommonService,
    private snackBar: MatSnackBar,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private commonService: CommonService,
    private RankShiftService: RankShiftService,

    private notificationService: NotificationService,

    public router: Router,
    public matError : MatErrorService
  ) { 
    this.docForm = this.fb.group({
          select: [""],
          code:[""],
          vessel: [""],
          rank: [""],
          sDate: [""],
          sDateObj: [""],
          eDate: [""],
          eDateObj: [""],
          remarks: [""],
          watchkeepers:[""],
          validToObj: [""],
     

      secondDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          shiftStart: [""],
          shiftEnd: [""],
          place: [""],
          watchKeeping: [true],
          readOnly: [true],
          type:[""]
        })
      ])
    });
  }

  // ngOnInit(): void {
  //   const deleteRow = this.docForm.controls.secondDetailRow as FormArray;
  //   deleteRow.removeAt(0);
  //   let id = 0;
  //   for (let hour = 0; hour < 24; hour++) {
  //     for (let minutes = 0; minutes < 60; minutes += 30) {
  //       const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  //       this.timingList.push({ id: id++, text: timeString });
  //     }
  //   }
  //   this.rankList = [{id:1,text:"Master"},{id:2,text:"Chief Officer"},{id:3,text:"Second Officer"}];
  //   this.vesselList = [{id:1,text:"GODA-GODAVARI"},{id:2,text:"RJG-RAJIV GANDHI"},{id:3,text:"IDG-INDIRA GANDHI"},{id:4,text:"ARJ-TCI ARJUN"}];
  //   this.placeList = [{id:1,text:"PORT"},{id:2,text:"SEA"}];


  // }
  ngOnInit() {
    this.getvesselList();
    this.getrankList();
    const deleteRow = this.docForm.controls.secondDetailRow as FormArray;
     deleteRow.removeAt(0);
     let id = 0;
     for (let hour = 0; hour < 24; hour++) {
       for (let minutes = 0; minutes < 60; minutes += 30) {
         const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        this.timingList.push({ id: id++, text: timeString });
      }
    }
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
     this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       this.fetchDetails(this.decryptRequestId) ;
     }
    });
   
    // this.httpService.get<any>(this.RankShiftService.getvessel ).subscribe((res: any) => {

    //   this.vesselList = res;
    // });



   }

  addRow(){
    let secondDetailRowDtls = this.docForm.controls.secondDetailRow as FormArray;
    let arraylen = secondDetailRowDtls.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: [""],
      shiftEnd: [""],
      place: [""],
      watchKeeping: [""],
      
    })
    secondDetailRowDtls.insert(arraylen, newUsergroup);
  }
  getvesselList(){
    this.httpService.get(this.RankShiftService.getvessel).subscribe({next: (res: any) => {
      this.vesselList = res.lCommonUtilityBean;
   
    }, error: (err) => console.log(err)
    });
  }

  getrankList(){
    this.httpService.get(this.RankShiftService.getrank).subscribe({next: (res: any) => {
      this.rankList = res;
    }, error: (err) => console.log(err)
    });
  }
  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.secondDetailRowDtls as FormArray;
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

  addRowTwo(){
    let secondDetailRow = this.docForm.controls.secondDetailRow as FormArray;
    let arraylen = secondDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: [""],
      shiftEnd: [""],
      place: [""],
      watchKeeping: [true],
      readOnly: [false],
      type:[""]
    })
    secondDetailRow.insert(arraylen, newUsergroup);
  }

  removeRowTwo(){
    let count = 0;
    const deleteRow = this.docForm.controls.secondDetailRow as FormArray;
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
    let secondDetailRow = this.docForm.controls.secondDetailRow as FormArray;
    for (let i = this.docForm.controls.secondDetailRow.value.length - 1; i >= 0; i--) {
      let element = this.docForm.controls.secondDetailRow.value[i];
      if (element.type == "1") {
          secondDetailRow.removeAt(i);
      }
    }
    
    let arraylen = secondDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["18.30"],
      shiftEnd: ["22.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["1"]
    })
    secondDetailRow.insert(arraylen, newUsergroup);

    let newUsergroupTwo: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["6.30"],
      shiftEnd: ["10.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["1"]
    })
    secondDetailRow.insert(arraylen, newUsergroupTwo);
  }

  shiftTwo(){
    let secondDetailRow = this.docForm.controls.secondDetailRow as FormArray;
    for (let i = this.docForm.controls.secondDetailRow.value.length - 1; i >= 0; i--) {
      let element = this.docForm.controls.secondDetailRow.value[i];
      if (element.type == "2") {
          secondDetailRow.removeAt(i);
      }
    }

    let arraylen = secondDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["22.30"],
      shiftEnd: ["02.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["2"]
    })
    secondDetailRow.insert(arraylen, newUsergroup);

    let newUsergroupTwo: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["10.30"],
      shiftEnd: ["14.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["2"]
    })
    secondDetailRow.insert(arraylen, newUsergroupTwo);
  }

  shiftThree(){
    let secondDetailRow = this.docForm.controls.secondDetailRow as FormArray;
    for (let i = this.docForm.controls.secondDetailRow.value.length - 1; i >= 0; i--) {
      let element = this.docForm.controls.secondDetailRow.value[i];
      if (element.type == "3") {
          secondDetailRow.removeAt(i);
      }
    } 

    let arraylen = secondDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["02.30"],
      shiftEnd: ["06.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["3"]
    })
    secondDetailRow.insert(arraylen, newUsergroup);

    let newUsergroupTwo: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["14.30"],
      shiftEnd: ["18.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["3"]
    })
    secondDetailRow.insert(arraylen, newUsergroupTwo);
  }

  // isReadOnly(i): boolean {
  //   return this.docForm.controls.secondDetailRow.value[i].readOnly;
  // }

  save(){
    if(this.docForm.valid){
      this.RankShiftService.saveRankShift(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }
  update() {
   
    if(this.docForm.valid){
      this.RankShiftService.updateRankShift(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }
  fetchDetails(id){
    this.httpService.get<any>(this.RankShiftService.editUrl+"?id="+parseInt(id)).subscribe({next: (data: any) => {
      
      console.log(data);

        let sDate = this.commonService.getDateObj(data.list[0].sDate);

        let eDate = this.commonService.getDateObj(data.list[0].eDate);

     
      this.docForm.patchValue({
        'vessel' : data.list[0].vessel,
        'rank' : data.list[0].rank,
        'sDateObj' : sDate,
        'sDate' : data.list[0].sDate,
        'eDateObj' :eDate,
        'eDate' : data.list[0].eDate,
        'remarks' : data.list[0].remarks,
        'watchkeepers' : data.list[0].watchkeepers
      })

      }
     });
  }

  getDateString(event, inputFlag, index) {
    let cdate = this.cmnService.getDate(event.target.value);
    
    if (inputFlag == "sDate") {
      this.docForm.patchValue({ sDate: cdate });
    }
    if (inputFlag == "eDate") {
      this.docForm.patchValue({ eDate: cdate });
    }
    
    
  }
  onDateInput(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    if(inputValue!=""){
      if (dateFormat.test(inputValue)) {
        let fdate = this.RankShiftService.getDateObj(inputValue);
        if (inputFlag == "eDate") {
          this.docForm.patchValue({
            'eDate': inputValue,
            'eDateObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'eDate': "",
        'eDateObj':""
       });
    }
    
  }

  // onDateInput2(inputValue: any, inputFlag: any, index: number) {
  //   // Check if the input value matches the expected date format
  //   const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
  //   if(inputValue!=""){
  //     if (dateFormat.test(inputValue)) {
  //       let fdate = this.RankShiftService.getDateObj(inputValue);
  //       if (inputFlag == "sDate") {
  //         this.docForm.patchValue({
  //           'sDate': inputValue,
  //           'sDateObj':fdate
  //          });
  //       }
  //     }
  //   }else{
  //     this.docForm.patchValue({
  //       'sDate': "",
  //       'sDateObj':""
  //      });
  //   }
    
  // }
  onDateChange(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.RankShiftService.getDate(event.target.value);
      if (inputFlag == "eDate") {
        this.docForm.patchValue({ eDate: cdate });
      }
    
    }
  
    // if(this.docForm.value.dueDate!=null){
    //   this.check(this.docForm.value.dueDate);
    // }
  }
  onDateChange2(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.RankShiftService.getDate(event.target.value);
      if (inputFlag == "sDate") {
        this.docForm.patchValue({ sDate: cdate });
      }
    
    }
  
    // if(this.docForm.value.dueDate!=null){
    //   this.check(this.docForm.value.dueDate);
    // }
  }
  cancel(){
    this.router.navigate(['/crew/application-properties/define-preferences-for-working-hours/define-rank-shift/list-define-rank-shift']);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: [colorName, 'snackbar-text'],
      data: {
        html: true
      }
    });
  }

}
