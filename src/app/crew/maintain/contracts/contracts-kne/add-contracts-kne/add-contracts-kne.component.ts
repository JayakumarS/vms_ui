import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-contracts-kne',
  templateUrl: './add-contracts-kne.component.html',
  styleUrls: ['./add-contracts-kne.component.sass']
})
export class AddContractsKNEComponent implements OnInit {
  docForm: FormGroup;
  wageList:any=[];
  currencyList:any=[];

  public wageScaleFilterCtrl: FormControl = new FormControl();
  wageScaleFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('contractsWageScale', { static: true }) contractsWageScale: MatSelect;
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
            fromGrt: [""],
            ToGrt: [""],
            amount: [""],
          })
        ])
      });
    }

  ngOnInit(): void {
    this.wageList = [{id:1,text:"Test Wage Scale"},{id:2,text:"Simatech Agreement"},{id:3,text:"Interworld Agreement"},{id:4,text:"Sima Marine India Agreement"}];
    this.wageScaleFilteredOptions.next(this.wageList.slice());

    this.wageScaleFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterwageScale();
      });


    this.currencyList = [{id:1,text:"INR"},{id:2,text:"USD"},{id:3,text:"AED"}];
    this.currencyFilteredOptions.next(this.currencyList.slice());
    
    this.currencyFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterCurrency();
      });


  }

  filterwageScale(){
    if (!this.wageList) {
      return;
    }
    let search = this.wageScaleFilterCtrl.value;
    if (!search) {
      this.wageScaleFilteredOptions.next(this.wageList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.wageScaleFilteredOptions.next(
      this.wageList.filter(title => title.text.toLowerCase().includes(search))
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
  }


  addRow1() {
    let secondDetailRow = this.docForm.controls.secondDetailRow as FormArray;
    let arraylen = secondDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      fromGrt: [""],
      ToGrt: [""],
      amount: [""],
    })
    secondDetailRow.insert(arraylen, newUsergroup);
  }

  removeRow1(){
    let count = 0;
    const deleteRow = this.docForm.controls.secondDetailRow as FormArray;
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
    this.router.navigate(['crew/maintain/contracts/contract-kne/list-contracts-kne']);
  }

  keyPressNumberDouble(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
