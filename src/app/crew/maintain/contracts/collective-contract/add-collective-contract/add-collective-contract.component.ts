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
    this.rankList = [{id:1,text:"Master"},{id:2,text:"Chief Officer"},{id:3,text:"Second Officer"}];
    this.currencyList = [{id:1,text:"INR"},{id:2,text:"USD"},{id:3,text:"KES"}];
    this.itemList = [{id:1,text:"Item-1"},{id:2,text:"Item-1"},{id:3,text:"Item-3"}];
    this.coEfficientList = [{id:1,text:"Test-1"},{id:2,text:"Test-2"},{id:3,text:"Test-3"}];
  }

  get firstDetailRow() {
    return this.docForm.get('firstDetailRow') as FormArray;
  }

  getDateControl(index: number,name:any) {
    return this.firstDetailRow.at(index).get([name]);
  }

  get secondDetailRow() {
    return this.docForm.get('secondDetailRow') as FormArray;
  }

  validation(index: number,name:any){
    return this.secondDetailRow.at(index).get([name]);
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
