import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-add-fleet-managers',
  templateUrl: './add-fleet-managers.component.html',
  styleUrls: ['./add-fleet-managers.component.sass']
})
export class AddFleetManagersComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  docForm: FormGroup;
  fleetlist:any=[];
  opmanagerlist:any=[];
  techmanagerlist:any=[];

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { 
    super();
    this.docForm=this.formbuilder.group({
      firstDetailRow: this.formbuilder.array([
        this.formbuilder.group({
          select: [""],
          fleet:["",Validators.required],
          opmanager:["",Validators.required],
          techmanager:["",Validators.required],


        })
      ]),
    })
  }

  ngOnInit(): void {
    this.fleetlist = [
      {id:1,text:"Shipping"},
      {id:2,text:"Management"}];

    this.opmanagerlist=[
      { id:1,text:"Mohammed"},
      {id:2,text:"Attar"}];
    
      this.techmanagerlist=[
      { id:1,text:"Reza"},
      {id:2,text:"Abdul"}]

  }

  save(){

  }
  
  cancel(){
    this.router.navigate(['/vessels/fleet-managers/list-fleet-managers']);
    
  }

  addRow() {
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.formbuilder.group({
          select: [''],
          fleet:[''],
          opmanager:[''],
          techmanager:['']
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

}
