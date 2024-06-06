import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-solidarity-tax-contracts',
  templateUrl:'./add-solidarity-tax-contracts.component.html',
  styleUrls: ['./add-solidarity-tax-contracts.component.sass']
})
export class AddSolidarityTaxContractsComponent implements OnInit {
  docForm: FormGroup;
  itemList:any=[];
  currencyList:any=[];
  proportionalCalculations:string[]=['YES','NO'];
  public itemFilterCtrl: FormControl = new FormControl();
  itemFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('contractsitem', { static: true }) contractsitem: MatSelect;
  protected onDestroy = new Subject<void>();

  public currencyFilterCtrl: FormControl = new FormControl();
  currencyFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('contractscurrency', { static: true }) contractscurrency: MatSelect;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router) { 
      this.docForm = this.fb.group({
        firstDetailRow: this.fb.array([
          this.fb.group({
            select: [""],
            item: [""],
            currency: [""],
            validFrom: [""],
            validFromObj: [""],
            validTo: [""],
            validToObj: [""],
            proportionalCalculation: [""]
          })
        ]),
  
        secondDetailRow: this.fb.array([
          this.fb.group({
            select: [""],
            yearlyIncomeMins: [""],
          yearlyIncomeMaxs: [""],
          percentages: [""]
          })
        ])
      });
    }

  ngOnInit(): void {
    this.itemList = [{id:1,text:"ADDITIONAL(TDS)-CURRENT FINANCIAL YEAR"},{id:2,text:"ADDITIONAL(TDS)-PREVIOUS FINANCIAL YEAR"},{id:3,text:"ADMIN CHARGES FOR PENSION &ANNUITY"}];
    this.itemFilteredOptions.next(this.itemList.slice());

    this.itemFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filteritem();
      });


    this.currencyList = [{id:1,text:"INR"},{id:2,text:"USD"},{id:3,text:"AED"}];
    this.currencyFilteredOptions.next(this.currencyList.slice());
    
    this.currencyFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterCurrency();
      });
  }

  filteritem(){
    if (!this.itemList) {
      return;
    }
    let search = this.itemFilterCtrl.value;
    if (!search) {
      this.itemFilteredOptions.next(this.itemList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.itemFilteredOptions.next(
      this.itemList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filterCurrency(){
    if (!this.currencyList) {
      return;
    }
    let search = this.currencyFilterCtrl.value;
    if (!search) {
      this.currencyFilteredOptions.next(this.currencyList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.currencyFilteredOptions.next(
      this.currencyList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

  addRow() {
    
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      item: [""],
      currency: [""],
      validFrom: [""],
      validFromObj: [""],
      validTo: [""],
      validToObj: [""],
      proportionalCalculation: [""]
    })
    firstDetailRow.insert(arraylen, newUsergroup);
  
  
  let secondDetailRow = this.docForm.controls.secondDetailRow as FormArray;
  let arraylen1 = secondDetailRow.length;
  let newUsergroup1: FormGroup = this.fb.group({
    select: [""],
    yearlyIncomeMins: [""],
    yearlyIncomeMaxs: [""],
    percentages: [""]
    
  })
  secondDetailRow.insert(arraylen1, newUsergroup1);
  
  }

  removeRow(){
    
    let count = 0;
    const deleteRow = this.docForm.controls.firstDetailRow as FormArray;
    let i=0;

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

  

  let count1 = 0;
  const deleteRow1 = this.docForm.controls.secondDetailRow as FormArray;
  let j=0;

  while (j < deleteRow1.length) {
    if (deleteRow1.at(j).value.select) {
      deleteRow1.removeAt(j);
      count1++;
    } else {
      j++;
    }
  }

  if(count1 == 0){
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
    this.router.navigate(['crew/maintain/contracts/solidarity-tax-contracts/list-solidarity-tax-contracts']);
  }

  keyPressNumberDouble(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
