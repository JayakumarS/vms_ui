import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { WarningPopupComponent } from 'src/app/shared/components/warning-popup/warning-popup.component';

@Component({
  selector: 'app-add-e-commerce-suppliers-reference',
  templateUrl: './add-e-commerce-suppliers-reference.component.html',
  styleUrls: ['./add-e-commerce-suppliers-reference.component.sass']
})
export class AddECommerceSuppliersReferenceComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm:FormGroup;
  
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
      firstDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          showIcon: [false],
          webCode: [""],
          webSupCode: [""],
          webSupName: [""]
        })
      ]),
      secondDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          showIcon: [false],
          shipservCode: [""],
          shipservSupCode: [""],
          shipservSupName: [""],
          shipservContRefer: [""]
        })
      ]),
      thirdDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          showIcon: [false],
          procureshipCode: [""],
          procureSupCode: [""],
          procureSupName: [""],
          procureContRefer: [""]
         
        })
      ]),
      fourthDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          showIcon: [false],
          mespasContRefer: [""],
          mespasSupName: [""],
          mespasSupCode: [""],
          mespasCode: [""]
        
        })
      ]),
      fifthDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          showIcon: [false],
          seaProcCode: [""],
          seaProcSupCode: [""],
          seaProcSupName: [""],
          seaProcContRefer: [""]
        })
      ]),
      
    });
  }

  ngOnInit(): void {

    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    firstDetailRow.removeAt(0);
  }

  save(){
    
  }

  cancel(){
    this.router.navigate(['/supplies/maintain/e-commerce-suppliers-reference/list-e-commerce-suppliers-reference']);
  }

  

  
  

 
  addRow1() {
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
          showIcon: [false],
          webCode: [""],
          webSupCode: [""],
          webSupName: [""]
     
    })
    firstDetailRow.insert(arraylen, newUsergroup);


  }
  removeRow1() {
    let count = 0;
    const deleteRow = this.docForm.controls.firstDetailRow as FormArray;
    let i = 0;

    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if (count == 0) {
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }


  }
 

  addRow2() {
    let secondDetailRow = this.docForm.controls.secondDetailRow as FormArray;
    let arraylen = secondDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
          showIcon: [false],
          shipservCode: [""],
          shipservSupCode: [""],
          shipservSupName: [""],
          shipservContRefer: [""]
     
    })
    secondDetailRow.insert(arraylen, newUsergroup);


  }
  removeRow2() {
    let count = 0;
    const deleteRow = this.docForm.controls.secondDetailRow as FormArray;
    let i = 0;

    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if (count == 0) {
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }


  }
 
  addRow3() {
    let thirdDetailRow = this.docForm.controls.thirdDetailRow as FormArray;
    let arraylen = thirdDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
          showIcon: [false],
          procureshipCode: [""],
          procureSupCode: [""],
          procureSupName: [""],
          procureContRefer: [""]
     
    })
    thirdDetailRow.insert(arraylen, newUsergroup);


  }
  removeRow3() {
    let count = 0;
    const deleteRow = this.docForm.controls.thirdDetailRow as FormArray;
    let i = 0;

    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if (count == 0) {
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }


  }
 
  addRow4() {
    let fourthDetailRow = this.docForm.controls.fourthDetailRow as FormArray;
    let arraylen = fourthDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      showIcon: [false],
      mespasContRefer: [""],
      mespasSupName: [""],
      mespasSupCode: [""],
      mespasCode: [""]
     
    })
    fourthDetailRow.insert(arraylen, newUsergroup);


  }
  removeRow4() {
    let count = 0;
    const deleteRow = this.docForm.controls.fourthDetailRow as FormArray;
    let i = 0;

    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if (count == 0) {
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }


  }
 
  addRow5() {
    let fifthDetailRow = this.docForm.controls.fifthDetailRow as FormArray;
    let arraylen = fifthDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
          showIcon: [false],
          seaProcCode: [""],
          seaProcSupCode: [""],
          seaProcSupName: [""],
          seaProcContRefer: [""]
     
    })
    fifthDetailRow.insert(arraylen, newUsergroup);


  }
  removeRow5() {
    let count = 0;
    const deleteRow = this.docForm.controls.fifthDetailRow as FormArray;
    let i = 0;

    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if (count == 0) {
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

}
