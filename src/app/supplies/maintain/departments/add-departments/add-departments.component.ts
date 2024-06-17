import { Component,  Inject,  OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartmentsPopUpComponent } from '../departments-pop-up/departments-pop-up.component';
import { DepartmentsPopupComponent } from '../departments-popup/departments-popup.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';



@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrls: ['./add-departments.component.sass']
})
export class AddDepartmentsComponent extends UnsubscribeOnDestroyAdapter  implements OnInit {

  docForm: FormGroup;
  formTypeList:any=[];
  isHovered = false;
  firstDetailRow: any;
  
  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    public dialog: MatDialog
  ) { 
    super();
      this.docForm = this.fb.group({
        firstDetailRow: this.fb.array([
          this.fb.group({
            select: [""],
            code: [""],
            department: [""],
            formType: [""],
            decimals: [""],
            itemsToOrderCommends: [""],
            itemsNotToOrderCommends: [""],
            availableOffice: new FormControl(false),
            availableVessel:new FormControl(false),
            officeUndefinedItemsS: new FormControl(false),
            vesselUndefinedItemsS:new FormControl(false),
            proposedItems:new FormControl(false),
            officeUndefinedItemsL: new FormControl(false),
            vesselUndefinedItemsL:new FormControl(false),
            combinedControl: new FormControl(false),  
            lockSupplyCaseswithinvoicedate: new FormControl(false),
            vesselOrders: new FormControl(false),
            tolerance: [""],
            minimumItems: [""],
            toggleLockValue: new FormControl(false)
          })
        ]),
      });
   
      
   
    }
    
   
  


  ngOnInit(): void {
    
    this.formTypeList = [{id:1,text:"Lubricants"},{id:2,text:"Provision/Stores"},{id:3,text:"Spares"}];
      

  }




  addRow() {
    
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      code: [""],
      department: [""],
      formType: [""],
      decimals: [""],
      itemsToOrderCommends: [""],
      itemsNotToOrderCommends:[""],
      availableOffice: [""],
      availableVessel: [""],
      officeUndefinedItemsS: [""],
      vesselUndefinedItemsS: [""],
      proposedItems: [""],
      officeUndefinedItemsL: [""],
      vesselUndefinedItemsL: [""],
      lockSupplyCaseswithinvoicedate: [""],
      vesselOrders: [""],
      tolerance: [""],
      minimumItems: [""],
      toggleLockValue: new FormControl(false)
     
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
    this.router.navigate(['/supplies/maintain/departments/list-departments']);
  }

 keyPressNumberDouble(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 

  onMouseOver() {
    this.isHovered = true;
  }

  onMouseOut() {
    this.isHovered = false;
  }



  openCommentsPopUp(){

    let tempDirection;
    const dialogRef = this.dialog.open(DepartmentsPopUpComponent, {
      data: "",
      height:"30%",
      width: "30%",
      direction: tempDirection,
    });  

    this.subs.sink = dialogRef.afterClosed().subscribe((res) => {
      if(res.data != 'CANCEL'){
        this.docForm.patchValue({
          itemsToOrderCommends:res.data
        })
      }
    });
  }
  openItemsPopUp(){

    let tempDirection;
    const dialogRef = this.dialog.open(DepartmentsPopupComponent, {
      data: "",
      height:"30%",
      width: "30%",
      direction: tempDirection,
    });  

    this.subs.sink = dialogRef.afterClosed().subscribe((res) => {
      if(res.data != 'CANCEL'){

        this.docForm.patchValue({
          itemsNotToOrderCommends:res.data
        })
      }
    });
  }
 

  toggleValues(index: number) {
    const firstDetailRow = this.docForm.get('firstDetailRow') as FormArray;
    const firstDetailBean = firstDetailRow.at(index) as FormGroup;

    const currentLockValue = firstDetailBean.get('lockSupplyCaseswithinvoicedate').value;
    firstDetailBean.get('lockSupplyCaseswithinvoicedate').setValue(!currentLockValue);

    const currentVesselOrdersValue = firstDetailBean.get('vesselOrders').value;
    firstDetailBean.get('vesselOrders').setValue(!currentVesselOrdersValue);
  }




}