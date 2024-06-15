import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-list-multi-seamen-sign-off',
  templateUrl: './list-multi-seamen-sign-off.component.html',
  styleUrls: ['./list-multi-seamen-sign-off.component.sass'],
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
export class ListMultiSeamenSignOffComponent implements OnInit {
  docForm: FormGroup;
  vesselList:any=[];
  portList:any=[];
  signOffCodeList:any=[];
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.docForm = this.fb.group({
        vessel:["",Validators.required],
        fromDate:[""],
        fromDateObj:["",Validators.required],
        signOffCode:["",Validators.required],
        port:["",Validators.required],
        firstDetailRow: this.fb.array([
          this.fb.group({
            select: [""],
            code: [""],
            seamen:[""],
            rank:[""],
            signOffReason:[""],
            natinality:[""],
            joiningDate:[""],
            joiningDateObj:[""],
            joiningPort:[""],
            signOffDate:[""],
            signOffDateObj:[""],
            SignOffPort:[""],
            estSignOffDate:[""],
            estSignOffDateObj:[""]
          })
        ])
    });
   }

  ngOnInit(): void {
    this.vesselList = [{id:1,text:"GFS JUNO"},{id:2,text:"GFS PEARL"},{id:3,text:"GFS PERFECT"},{id:4,text:"GFS PRIDE"}];
    this.signOffCodeList = [{id:1,text:"Death"},{id:2,text:"Transfer"},{id:3,text:"End Of Contract"}];
    this.portList = [{id:1,text:"Mundra"},{id:2,text:"Incok"}];

    let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
    firstDtl.clear();
  }

  get firstDetailRow() {
    return this.docForm.get('firstDetailRow') as FormArray;
  }

  getDateControl(index: number,name:any) {
    return this.firstDetailRow.at(index).get([name]);
  }

  search(){
    if(this.docForm.valid){
      let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
      firstDtl.clear();
  
      let list = [
        {select:false,code:525,seamen:"John",rank:"Master",reason:"",nationality:"Indian",jDate:this.docForm.value.fromDate,jPort:this.docForm.value.port,sDate:"",sPort:"",estDate:""},
        {select:false,code:251,seamen:"Smith",rank:"Cook",reason:"",nationality:"Others",jDate:this.docForm.value.fromDate,jPort:this.docForm.value.port,sDate:"",sPort:"",estDate:""}
      ];
  
      list.forEach(element => {
        let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
        let arraylen = firstDtl.length;
        let newUsergroup: FormGroup = this.fb.group({
          select: [element.select],
          code: [element.code],
          seamen:[element.seamen],
          rank:[element.rank],
          signOffReason:[{ value: '', disabled: true }],
          natinality:[element.nationality],
          joiningDate:[element.jDate],
          joiningDateObj:[""],
          joiningPort:[element.jPort],
          signOffDate:[""],
          signOffDateObj:[{ value: '', disabled: true }],
          SignOffPort:[element.jPort],
          estSignOffDate:[""],
          estSignOffDateObj:[{ value: '', disabled: true }],
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

  getDateString(event,id,i){
    let cdate = this.commonService.getDate(event.target.value);

    if(id == 'fromDate'){
      this.docForm.patchValue({
        'fromDate' : cdate
      })
    }
  }

  enableEdit(i) {
    let firstDtl = this.firstDetailRow.at(i) as FormGroup;
    const signOffReasonControl = firstDtl.get('signOffReason');
    const signOffDateControl = firstDtl.get('signOffDateObj');
    const SignOffControl = firstDtl.get('SignOffPort');
    const estSignOffDateControl = firstDtl.get('estSignOffDateObj');
    const selectControl = firstDtl.get('select');
    if (selectControl.value) {
      signOffReasonControl.enable();
      signOffDateControl.enable();
      SignOffControl.enable();
      estSignOffDateControl.enable();
    } else {
      signOffReasonControl.disable();
      signOffDateControl.disable();
      SignOffControl.disable();
      estSignOffDateControl.disable();
    }
  }

  selectAll(value){
    let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
    firstDtl.controls.forEach((group: FormGroup,i) => {
      group.get('select').setValue(value.checked);
      this.enableEdit(i);
    });
  }

}
