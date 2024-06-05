import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-collective-contract',
  templateUrl: './add-collective-contract.component.html',
  styleUrls: ['./add-collective-contract.component.sass'],
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
export class AddCollectiveContractComponent implements OnInit {
  docForm: FormGroup;
  nationalityList:any=[];
  rankList:any=[];
  wageList:any=[];
  currencyList:any=[];
  itemList:any=[];
  coEfficientList:any=[];
  parameterList:any=[];
  retroList:any=[];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router
  ) { 
    this.docForm = this.fb.group({
      firstDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          nationality: [""],
          rank: [""],
          wageScale: [""],
          currency: [""],
          validFrom: [""],
          validFromObj: [""],
          validTo: [""],
          validToObj: [""]
        })
      ]),

      secondDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          item: [""],
          amount: [""],
          coEfficient: [""],
          parameter: [""],
          fixedOT: [""],
          retro: [""],
          remarks: [""],
          additionalRemarks: [""]
        })
      ])
    });
  }

  ngOnInit(): void {
    this.nationalityList = [{id:1,text:"Indian"},{id:2,text:"Others"}];
  }

  addRow() {
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      nationality: [""],
      rank: [""],
      wageScale: [""],
      currency: [""],
      validFrom: [""],
      validFromObj: [""],
      validTo: [""],
      validToObj: [""]
    })
    firstDetailRow.insert(arraylen, newUsergroup);
  }

  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.firstDetailRow as FormArray;
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
      item: [""],
      amount: [""],
      coEfficient: [""],
      parameter: [""],
      fixedOT: [""],
      retro: [""],
      remarks: [""],
      additionalRemarks: [""]
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

  save(){}

  cancel(){
    this.router.navigate(['/crew/maintain/contracts/collective-contracts/list-collective-contract']);
  }

  getDateString(event,id){
    let cdate = this.commonService.getDate(event.target.value);

    if(id == 'birthDate'){
      this.docForm.patchValue({
        birthDate : cdate
      })
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

}
