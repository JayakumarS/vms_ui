import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-contracts-nee',
  templateUrl: './add-contracts-nee.component.html',
  styleUrls: ['./add-contracts-nee.component.sass']
})
export class AddContractsNEEComponent implements OnInit {
  docForm: FormGroup;
  wageList:any=[];
  currencyList:any=[];

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router) { 
      this.docForm = this.fb.group({
        firstDetailRow: this.fb.array([
          this.fb.group({
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
            fromGst: [""],
            ToGst: [""],
            fixedAmount: [""],
            amount: [""],
          })
        ])
      });
    }

  ngOnInit(): void {
    this.wageList = [{id:1,text:"Test Wage Scale"},{id:2,text:"Simatech Agreement"},{id:3,text:"Interworld Agreement"},{id:4,text:"Sima Marine India Agreement"}];
    this.currencyList = [{id:1,text:"INR"},{id:2,text:"USD"},{id:3,text:"AED"}];

  }

  addRow() {
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
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
    this.docForm.controls.firstDetailRow.value.forEach((element,i) => {
      if(element.select){
        let deleteRow = this.docForm.controls.firstDetailRow as FormArray;
        deleteRow.removeAt(i);
        count++;
      }
    });

    if(count == 0){
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }
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

  save(){}

  cancel(){
    this.router.navigate(['crew/maintain/contracts/contract-nee/list-contracts-nee']);
  }

}
