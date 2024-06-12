import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import { DescriptionPopupComponent } from '../description-popup/description-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { WarningPopupComponent } from 'src/app/shared/components/warning-popup/warning-popup.component';
import { BudgetInformationPopupComponent } from '../../spot-order/budget-information-popup/budget-information-popup.component';

@Component({
  selector: 'app-add-requisition',
  templateUrl: './add-requisition.component.html',
  styleUrls: ['./add-requisition.component.sass']
})
export class AddRequisitionComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm : FormGroup;
  urgencyList:any=[];
  vesselList:any=[];
  departmentlist:any=[];
  budgetList:any=[];
  descriptionList:any=[];
  dryDockingList:any=[];
  operationList:any=[];
  approverList:any=[];
  isHovered = false;
  isPopupOpened = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    public dialog: MatDialog
  ) { 
    super();
    this.docForm = this.fb.group({
      dCode:[""],
      urgent:[""],
      vesselCode:[""],
      department:[""],
      rCode:[{ value: '', disabled: true }],
      budget:[""],
      rPort:[""],
      srPort:[""],
      rrDateObj:[""],
      rrDate:[""],
      rDateObj:[""],
      rDate:[""],
      vesselEta:[""],
      desc:[""],
      estDateObj:[""],
      estDate:[""],
      deliveryPort:[""],
      voyageId:[""],
      officeReference:[""],
      operation:[""],
      dryDocking:[""],
      vesselEtd:[""],
      approver:[""],
      comments:[""]
    });
  }
  ngOnInit(): void {
    this.urgencyList = [{id:1,text:"Normal"},{id:3,text:"Medium"},{id:3,text:"Important"}];
    this.vesselList = [{id:1,text:"GODA-GODAVARI"},{id:2,text:"RJG-RAJIV GANDHI"},{id:3,text:"IDG-INDIRA GANDHI"},{id:4,text:"ARJ-TCI ARJUN"}];
    this.departmentlist = [{id:1,text:"Head"},{id:3,text:"Main"}];
    this.budgetList = [{id:1,text:"Budget-1"},{id:3,text:"Budget-2"}];
    this.approverList = [{id:1,text:"Admin"},{id:3,text:"Officer"}];
    this.operationList = [{id:1,text:"Operation-1"},{id:3,text:"Operation-2"}];
    this.dryDockingList = [{id:1,text:"Drydocking-1"},{id:3,text:"Drydocking-2"}];
  }

  getDateString(event,id){
    let cdate = this.commonService.getDate(event.target.value);

    if(id == 'birthDate'){
      this.docForm.patchValue({
        birthDate : cdate
      })
    }
  }

  getOrderCode(){
    if(this.docForm.value.vesselCode != '' && this.docForm.value.department != ''){
      if(this.docForm.value.vesselCode == 1){
        this.docForm.patchValue({
          'rCode' : "OC-515"
        })
      }else{
        this.showWarningPopup();
        this.docForm.patchValue({
          'rCode' : ""
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

  openBudgetPopUp(){
    let tempDirection;
    const dialogRef = this.dialog.open(BudgetInformationPopupComponent, {
      data: "",
      height:"85%",
      width: "30%",
      direction: tempDirection,
    });  
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

  onMouseOver() {
    this.isHovered = true;
  }

  onMouseOut() {
    this.isHovered = false;
  }

  save(){

  }

  cancel(){
    this.router.navigate(['/supplies/new/requisition/list-requisition']);
  }

  openDescPopUp(){
    let tempDirection;
    const dialogRef = this.dialog.open(DescriptionPopupComponent, {
      data: "",
      height:"30%",
      width: "30%",
      direction: tempDirection,
    });  

    this.subs.sink = dialogRef.afterClosed().subscribe((res) => {
      if(res.data != 'CANCEL'){
        this.isPopupOpened = true;
        this.docForm.patchValue({
          desc:res.data
        })
      }
    });
  }

}
