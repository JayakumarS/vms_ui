import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import { AddVesselBudgetsPopupComponent } from '../add-vessel-budgets-popup/add-vessel-budgets-popup.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BudgetInformationPopupComponent } from 'src/app/supplies/new/spot-order/budget-information-popup/budget-information-popup.component';

@Component({
  selector: 'app-list-vessel-budgets',
  templateUrl: './list-vessel-budgets.component.html',
  styleUrls: ['./list-vessel-budgets.component.sass']
})
export class ListVesselBudgetsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm:FormGroup;
  vesselList:any=[];
  yearList:any=[];
  dtlList:any=[];
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    public dialog: MatDialog
  ) { 
    super();
    this.docForm = this.fb.group({
      vessel:[""],
      year:[2023],    
      grandTotalAllocation:[""],
      grandTotalFirstQ:[""],
      grandTotalSecondQ:[""],
      grandTotalThirdQ:[""],
      grandTotalFourthQ:[""],
     firstDetailRow: this.fb.array([
        this.fb.group({
          typeHeader: [""],
          totalAllocation:[""],
          totalFirstQ:[""],
          totalSecondQ:[""],
          totalThirdQ:[""],
          totalFourthQ:[""],
        subDetailRow: this.fb.array([
            this.fb.group({
              select:[false],
              code:[""],
              budget: [""],
              fromDate: [""],
              toDate: [""],
              allocated: [""],
              firstQ: [""],
              secondQ: [""],
              thirdQ: [""],
              fourthQ: [""],
              comments: [""]
            })
          ])
        })
      ])
    });
  }

  ngOnInit(): void {
    this.vesselList = [{id:1,text:"GFS JUNO"},{id:2,text:"GFS PEARL"},{id:3,text:"GFS PERFECT"},{id:4,text:"GFS PRIDE"}];
    this.initializeYearList();
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    firstDetailRow.removeAt(0);
  }

  initializeYearList() {
    for (let year = 2000; year <= 2030; year++) {
      this.yearList.push({ id: year, text: year.toString() });
    }
  }

  getDtlsByVessel(){
    if(this.docForm.value.year != ''){
      this.dtlList = [];
      let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
      firstDtl.clear();
      this.getDtlsByDate();
    }
  }

  getDtlsByDate(){
    if(this.docForm.value.vessel != ''){
      if(this.docForm.value.vessel == '1'){
        this.dtlList = [{id:1,text:"Commerical Dept",subList:[{code:"CM20",desc:"Bunker",select:true}]}];
        let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
        firstDtl.clear();
        this.dtlList.forEach(element => {
          let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
          let arraylen = firstDtl.length;
          let newUsergroup: FormGroup = this.fb.group({
              typeHeader: [element.text],
              totalAllocation:[""],
              totalFirstQ:[""],
              totalSecondQ:[""],
              totalThirdQ:[""],
              totalFourthQ:[""],
              subDetailRow: this.fb.array([])
          });
      
          element.subList.forEach(subElement => {
              let subFormGroup: FormGroup = this.fb.group({
                select:[true],
                code:[subElement.code],
                budget: [subElement.desc],
                fromDate: ["01/04/"+this.docForm.value.year],
                toDate: ["31/03/"+(this.docForm.value.year+1)],
                allocated: [""],
                firstQ: [""],
                secondQ: [""],
                thirdQ: [""],
                fourthQ: [""],
                comments: [""]      
              });
               (newUsergroup.get('subDetailRow') as FormArray).push(subFormGroup);
          });      
          firstDtl.insert(arraylen, newUsergroup);
        });
      }else{
        this.showNotification(
          "snackbar-danger",
          "No vessel budgets for year "+this.docForm.value.year,
          "top",
          "right"
        );
      }
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please select the vessel",
        "top",
        "right"
      );
    }
  }

  // cancel(){
  //   this.dtlList = [];
  //   this.docForm = this.fb.group({
  //     vessel:[""],
  //     year:[""],    
  //     grandTotalAllocation:[""],
  //     grandTotalFirstQ:[""],
  //     grandTotalSecondQ:[""],
  //     grandTotalThirdQ:[""],
  //     grandTotalFourthQ:[""]
  //   });
  //   let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
  //   firstDtl.clear();
  // }

  save(){}

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

  openBudgetPopUp(){
    let tempDirection;
    const dialogRef = this.dialog.open(BudgetInformationPopupComponent, {
      data: "",
      height:"85%",
      width: "30%",
      direction: tempDirection,
    });  
  }

  quartercalculation(i,j){
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let subDetailRow = firstDetailRow.at(i).get('subDetailRow') as FormArray;
    
    let allocatedAmount = subDetailRow.at(j).get('allocated').value;
    let splitedAmount = allocatedAmount / 4;
    
    subDetailRow.at(j).patchValue({
      'firstQ': splitedAmount.toFixed(2),
      'secondQ': splitedAmount.toFixed(2),
      'thirdQ': splitedAmount.toFixed(2),
      'fourthQ': splitedAmount.toFixed(2)
    });

    this.totalCalculation(i,j);
  }

  allocationCalculated(i,j){
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let subDetailRow = firstDetailRow.at(i).get('subDetailRow') as FormArray;
    
    let totalQuarterAmount = 0;
    
    totalQuarterAmount += parseFloat(subDetailRow.at(j).get('firstQ').value) || 0;
    totalQuarterAmount += parseFloat(subDetailRow.at(j).get('secondQ').value) || 0;
    totalQuarterAmount += parseFloat(subDetailRow.at(j).get('thirdQ').value) || 0;
    totalQuarterAmount += parseFloat(subDetailRow.at(j).get('fourthQ').value) || 0;
    
    subDetailRow.at(j).patchValue({
      'allocated': totalQuarterAmount.toFixed(2)
    });

    this.totalCalculation(i,j);
  }

  totalCalculation(i,j){
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let subDetailRow = firstDetailRow.at(i).get('subDetailRow') as FormArray;

    let totalAllocation = 0,totalFirstQ = 0,totalSecondQ = 0,totalThirdQ = 0,totalFourthQ = 0;

    subDetailRow.controls.forEach((subGroup: FormGroup) => {
      totalAllocation += parseFloat(subGroup.get('allocated').value) || 0;
      totalFirstQ += parseFloat(subGroup.get('firstQ').value) || 0;
      totalSecondQ += parseFloat(subGroup.get('secondQ').value) || 0;
      totalThirdQ += parseFloat(subGroup.get('thirdQ').value) || 0;
      totalFourthQ += parseFloat(subGroup.get('fourthQ').value) || 0;
    });

    firstDetailRow.at(i).patchValue({
      'totalAllocation': totalAllocation.toFixed(2),
      'totalFirstQ': totalFirstQ.toFixed(2),
      'totalSecondQ': totalSecondQ.toFixed(2),
      'totalThirdQ': totalThirdQ.toFixed(2),
      'totalFourthQ': totalFourthQ.toFixed(2),
    });

    this.grandTotalCalculation();
  }

  grandTotalCalculation(){
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;

    let grandTotalAllocation = 0,grandTotalFirstQ = 0,grandTotalSecondQ = 0,grandTotalThirdQ = 0,grandTotalFourthQ = 0;

    firstDetailRow.controls.forEach((subGroup: FormGroup) => {
      grandTotalAllocation += parseFloat(subGroup.get('totalAllocation').value) || 0;
      grandTotalFirstQ += parseFloat(subGroup.get('totalFirstQ').value) || 0;
      grandTotalSecondQ += parseFloat(subGroup.get('totalSecondQ').value) || 0;
      grandTotalThirdQ += parseFloat(subGroup.get('totalThirdQ').value) || 0;
      grandTotalFourthQ += parseFloat(subGroup.get('totalFourthQ').value) || 0;
    });

    this.docForm.patchValue({
      'grandTotalAllocation':grandTotalAllocation.toFixed(2),
      'grandTotalFirstQ':grandTotalFirstQ.toFixed(2),
      'grandTotalSecondQ':grandTotalSecondQ.toFixed(2),
      'grandTotalThirdQ':grandTotalThirdQ.toFixed(2),
      'grandTotalFourthQ':grandTotalFourthQ.toFixed(2),
    })
  }

  removeRow(){

  }

  addVesselPopUp(){
    if(this.docForm.value.vessel != '' && this.docForm.value.year != ''){
      let tempDirection;
      const dialogRef = this.dialog.open(AddVesselBudgetsPopupComponent, {
        data: this.dtlList,
        height:"85%",
        width: "30%",
        direction: tempDirection
      }); 
      
      this.subs.sink = dialogRef.afterClosed().subscribe((res) => {
        if(res.data != 'CANCEL'){
          //if(this.dtlList.length > 0){
            res.data.forEach(listItem => {
              const dtlItem = this.dtlList.find(dtl => dtl.id === listItem.id);
              if (dtlItem) {
                listItem.subList.forEach(subItem => {
                  const exists = dtlItem.subList.some(dtlSubItem => dtlSubItem.code === subItem.code);
                  if (!exists) {
                    dtlItem.subList.push(subItem);
                  }
                });
              } else {
                const filteredSubList = listItem.subList.filter(subItem => subItem.select);
                if (filteredSubList.length > 0) {
                  this.dtlList.push({ ...listItem, subList: filteredSubList });
                }
              }
            });
          //}
          let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
          firstDtl.clear();
          this.dtlList.forEach(element => {
            let firstDtl = this.docForm.controls.firstDetailRow as FormArray;
            let arraylen = firstDtl.length;
            let newUsergroup: FormGroup = this.fb.group({
                typeHeader: [element.text],
                totalAllocation:[""],
                totalFirstQ:[""],
                totalSecondQ:[""],
                totalThirdQ:[""],
                totalFourthQ:[""],
                subDetailRow: this.fb.array([])
            });
        
            element.subList.forEach(subElement => {
              if(subElement.select){
                let subFormGroup: FormGroup = this.fb.group({
                  select:[false],
                  code:[subElement.code],
                  budget: [subElement.desc],
                  fromDate: ["01/04/"+this.docForm.value.year],
                  toDate: ["31/03/"+(this.docForm.value.year+1)],
                  allocated: [""],
                  firstQ: [""],
                  secondQ: [""],
                  thirdQ: [""],
                  fourthQ: [""],
                  comments: [""]      
                });
                 (newUsergroup.get('subDetailRow') as FormArray).push(subFormGroup);
              }
            });      
            firstDtl.insert(arraylen, newUsergroup);
          });
        }
      });
    }else{
      if(this.docForm.value.vessel == ''){
        this.showNotification(
          "snackbar-danger",
          "Please select the vessel",
          "top",
          "right"
        );
      }else{
        this.showNotification(
          "snackbar-danger",
          "Please select the year",
          "top",
          "right"
        );
      }
    }
  }
}
