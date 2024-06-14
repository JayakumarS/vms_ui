import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { WarningPopupComponent } from 'src/app/shared/components/warning-popup/warning-popup.component';

@Component({
  selector: 'app-add-landing-properties',
  templateUrl: './add-landing-properties.component.html',
  styleUrls: ['./add-landing-properties.component.sass']
})
export class AddLandingPropertiesComponent extends UnsubscribeOnDestroyAdapter implements OnInit  {

  docForm:FormGroup;
  agentList:any=[];
  vesselList:any=[];
  departmentlist:any=[];
  freightList:any=[];
  approverList:any=[];
  total:number;
  isCodeSelected:boolean=false;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { 
    super();
    this.docForm = this.fb.group({
      vesselCode:[""],
      department:[""],
      lCode:[{ value: '', disabled: true }],
      port:[""],
      dateLandedObj:[""],
      dateLanded:[""],
      landedTo:[""],
      agent:[""],
      landingDesc:[""],
      freight:[""],
      totalWeight:[""],
      noOfParcels:[""],
      approver:[""],
      comments:[""],
      total:[""],
      firstDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          showIcon: [false],
          sNo: [1],
          length: [""],
          width: [""],
          height: [""],
          weight: [""]
        })
      ])
    });
  }

  ngOnInit(): void {
    this.vesselList = [{id:1,text:"GODA-GODAVARI"},{id:2,text:"RJG-RAJIV GANDHI"},{id:3,text:"IDG-INDIRA GANDHI"},{id:4,text:"ARJ-TCI ARJUN"}];
    this.departmentlist = [{id:1,text:"Head"},{id:3,text:"Main"}];
    this.approverList = [{id:1,text:"Admin"},{id:3,text:"Officer"}];

    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    firstDetailRow.removeAt(0);
  }

  save(){
    
  }

  cancel(){
    this.router.navigate(['/supplies/new/landing-properties/list-landing-properties']);
  }

  checkVessel(){
    if(this.isCodeSelected){
      this.getOrderCode();
    }
  }

  getValue(id){
    if(this.docForm.value.firstDetailRow.length > 0){
      if(id == 'totalWeight'){
        this.docForm.patchValue({
          'totalWeight' : this.total
        })
      }else{
        this.docForm.patchValue({
          'noOfParcels' : this.docForm.value.firstDetailRow.length
        })
      }
    }else{
      this.showNotification(
        "snackbar-danger",
         "Please fill the details in parcels tab",
        "top",
        "right"
      );
    }

  }

  getOrderCode(){
    this.isCodeSelected = false;
    if(this.docForm.value.vesselCode != '' && this.docForm.value.department != ''){
      if(this.docForm.value.vesselCode == 1){
        this.docForm.patchValue({
          'lCode' : "OC-515"
        })
        this.isCodeSelected = true;
      }else{
        this.showWarningPopup();
        this.docForm.patchValue({
          'lCode' : ""
        })
      }
    }else{
      let error = "Please select the department";
      if(this.docForm.value.vesselCode == ''){
        error = "Please select the vessel code";
      }
      this.showNotification(
        "snackbar-danger",
         error,
        "top",
        "right"
      );
    }
  }

  showWarningPopup(){
    let tempDirection;
    const dialogRef = this.dialog.open(WarningPopupComponent, {
      data: "No counter defined for vessel",
      height:"30%",
      width: "30%",
      direction: tempDirection,
    });  
  }

  getDateString(event,id){
    let cdate = this.commonService.getDate(event.target.value);

    if(id == 'birthDate'){
      this.docForm.patchValue({
        birthDate : cdate
      })
    }
  }

  addRow(){
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      showIcon: [false],
      sNo: [arraylen+1],
      length: [""],
      width: [""],
      height: [""],
      weight: [""]
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
        this.totalCalculation();
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

  totalCalculation() {
    this.total = this.docForm.controls.firstDetailRow.value.reduce((acc, element) => {
        const weight = parseFloat(element.weight);
        return isNaN(weight) ? acc : acc + weight;
    }, 0).toFixed(2);
  }

  showIcon(index){
    const control = <FormArray>this.docForm.controls['firstDetailRow'];
    for (let i = 0; i < control.length; i++) {
      control.at(i).patchValue({ showIcon: i === index });
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
