import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-solidarity-tax-contracts',
  templateUrl:'./add-solidarity-tax-contracts.component.html',
  styleUrls: ['./add-solidarity-tax-contracts.component.sass']
})
export class AddSolidarityTaxContractsComponent implements OnInit {



  docForm: FormGroup;

  contractsFlag = true;
  contractsDtlValue  = []; // Assuming this gets populated from a service or similar
  flagForBorDtlRow = true;
  edit = false;
  currencys: string[] = ['USD', 'EUR', 'INR', 'EGP', 'AED','SAR','CAD','CNY'];
  proportionalCalculations:string[]=['YES','NO'];
  items=['ADDITIONAL(TDS)-CURRENT FINANCIAL YEAR','ADDITIONAL(TDS)-PREVIOUS FINANCIAL YEAR',' ADMIN CHARGES FOR PENSION &ANNUITY']
 
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router
  ) { 
    
  }


  ngOnInit(): void {
    this.docForm = this.fb.group({
      contractsDetailBean: this.fb.array([this.createContractsDetail()]),
      solidarityTaxContractsDetailBean: this.fb.array([this.createSolidarityTaxDetail()])
    });
  }

  createContractsDetail(): FormGroup {
    return this.fb.group({
      currency: ['', Validators.required],
      fromDateObj: ['', Validators.required],
      toDateObj: ['', Validators.required],
      item: ['', Validators.required],
      proportionalCalculation: ['', Validators.required]
    });
  }

  createSolidarityTaxDetail(): FormGroup {
    return this.fb.group({
      yearlyIncomeMins: ['', Validators.required],
      yearlyIncomeMaxs: ['', Validators.required],
      percentages: ['', Validators.required]
    });
  }

  get contractsDetailBean(): FormArray {
    return this.docForm.get('contractsDetailBean') as FormArray;
  }

  get solidarityTaxContractsDetailBean(): FormArray {
    return this.docForm.get('solidarityTaxContractsDetailBean') as FormArray;
  }

  addRow4() {
    this.contractsDetailBean.push(this.createContractsDetail());
    this.solidarityTaxContractsDetailBean.push(this.createSolidarityTaxDetail());
  }

  removeRow4(index: number) {
    if (this.contractsDetailBean.length > 1) {
      this.contractsDetailBean.removeAt(index);
      this.solidarityTaxContractsDetailBean.removeAt(index);
    }
  }

  

  getDateString(event: any, type: string) {
    console.log(event, type);
  }

  getAvailability(value: string, index: number) {
    console.log(value, index);
  }

  keyPressNumbersOnly(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  save() {
    console.log(this.docForm.value);
  }

  update() {
    console.log(this.docForm.value);
  }

  reset() {
    this.docForm.reset();
  }

  
  cancel() {
    this.router.navigate(['/crew/maintain/contracts/solidarity-tax-contracts/list-solidarity-tax-contracts']);
  }

 
}
