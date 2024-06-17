import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-list-update-voyage',
  templateUrl: './list-update-voyage.component.html',
  styleUrls: ['./list-update-voyage.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
      },
  } },CommonService
  ]
})
export class ListUpdateVoyageComponent implements OnInit {
  docForm:FormGroup;
  rankList:any=[];
  portList:any=[];
  currencyList:any=[];
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.docForm = this.fb.group({
      fromDate:[""],
      fromDateObj:["",Validators.required],
      toDate:["",Validators.required],
      toDateObj:["",Validators.required],
      firstDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          code: [""],
          surname:[""],
          name:[""],
          startingDateObj:[""],
          startingDate:[""],
          signOnDateObj:[""],
          signOnDate:[""],
          rank:[""],
          vessel:[""],
          joiningPort:[""],
          currency:[""]
        })
      ])
  });
   }

  ngOnInit(): void {
    this.portList = [{id:1,text:"Mundra"},{id:2,text:"Incok"}];
    this.rankList = [{id:1,text:"Master"},{id:2,text:"Incok"}];
    this.currencyList = [{id:1,text:"USD"},{id:2,text:"INR"},{id:3,text:"AED"}];
    let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
    firstDtl.clear();
  }

  search(){
    if(this.docForm.valid){
      let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
      firstDtl.clear();
  
      let list = [
        {select:false,code:525,surname:"John",name:"Mike",startingDateObj:this.docForm.value.fromDateObj,signOnDateObj:this.docForm.value.fromDateObj,rank:1,vessel:"ABU-SHARH",joiningPort:1,currency:1},
        {select:false,code:85,surname:"smith",name:"Hogg",startingDateObj:this.docForm.value.fromDateObj,signOnDateObj:this.docForm.value.fromDateObj,rank:2,vessel:"GFS",joiningPort:2,currency:2}
      ];
  
      list.forEach(element => {
        let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
        let arraylen = firstDtl.length;
        let newUsergroup: FormGroup = this.fb.group({
          select: [element.select],
          code: [element.code],
          surname:[element.surname],
          name:[element.name],
          startingDateObj:[{ value: element.startingDateObj, disabled: true }],
          signOnDateObj:[{ value: element.signOnDateObj, disabled: true }],
          rank:[element.rank],
          vessel:[element.vessel],
          joiningPort:[element.joiningPort],
          currency:[element.currency]
        });  
        firstDtl.insert(arraylen, newUsergroup);
      });
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill the all required fields",
        "top",
        "right"
      );
    }
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

  save(){}

  get firstDetailRow() {
    return this.docForm.get('firstDetailRow') as FormArray;
  }

  getDateControl(index: number,name:any) {
    return this.firstDetailRow.at(index).get([name]);
  }

  getDateString(event,id,i){
    let cdate = this.commonService.getDate(event.target.value);

    if(id == 'fromDate'){
      this.docForm.patchValue({
        'fromDate' : cdate
      })
    }else if(id == 'toDate'){
      this.docForm.patchValue({
        'toDate' : cdate
      })
    }
  }

  enableEdit(i) {
    let firstDtl = this.firstDetailRow.at(i) as FormGroup;
    const startingDateReasonControl = firstDtl.get('startingDateObj');
    const signOnDateReasonControl = firstDtl.get('signOnDateObj');
    const selectControl = firstDtl.get('select');
    if (selectControl.value) {
      startingDateReasonControl.enable();
      signOnDateReasonControl.enable();
    } else {
      startingDateReasonControl.disable();
      signOnDateReasonControl.disable();
    }
  }

}
