import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-collective-contract',
  templateUrl: './add-collective-contract.component.html',
  styleUrls: ['./add-collective-contract.component.sass']
})
export class AddCollectiveContractComponent implements OnInit {
  docForm: FormGroup;
  nationalityList:any=[];
  rankList:any=[];
  wageList:any=[];
  currencyList:any=[];
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

}
