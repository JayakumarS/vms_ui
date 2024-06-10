import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import { DescriptionPopupComponent } from '../description-popup/description-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

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
      rCode:[""],
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
      approver:[""]
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


  onMouseOver() {
    this.isHovered = true;
  }

  onMouseOut() {
    this.isHovered = false;
  }

  save(){

  }

  cancel(){}

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
