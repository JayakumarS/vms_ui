import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-add-crew-promotion',
  templateUrl: './add-crew-promotion.component.html',
  styleUrls: ['./add-crew-promotion.component.sass']
})
export class AddCrewPromotionComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  promotinglist:any=[];
  currentranklist:any=[];
  vesseltypelist:any=[];
  nationalitylist:any=[];

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
          currank:["",Validators.required],
          prorank:["",Validators.required],
          nationality:["",Validators.required],
          vesseltype:["",Validators.required],
          promoyrs:["",Validators.required]


        })
      ]),
    })
  }

  ngOnInit(): void {

    this.currentranklist = [
      {id:1,text:"First Officer"},
      {id:2,text:"Second Officer"}];

    this.promotinglist=[
      { id:1,text:"Second Officer"},
      {id:2,text:"Third Officer"},
      {id:2,text:"Chief Officer"}];
    
      this.nationalitylist=[
      { id:1,text:"India"},
      {id:2,text:"Dubai"},
      {id:2,text:"Singapore"}]

      this.vesseltypelist=[
        {id:1,text:"All types"},
        {id:2,text:"Bulk Carrier"}];
  }

  keyPressNumber(event: any) {
    const pattern = /[0-9()+\-\.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  save(){

  }
  cancel(){
    this.router.navigate(['/crew/application-properties/crew-promotion/list-crew-promotion']);
    
  }
  addRow() {
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.formbuilder.group({
          select: [''],
          currank:[''],
          prorank:[''],
          nationality:[''],
          vesseltype:[''],
          promoyrs:['']
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
