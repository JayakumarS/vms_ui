import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-req-popup',
  templateUrl: './change-req-popup.component.html',
  styleUrls: ['./change-req-popup.component.sass']
})
export class ChangeReqPopupComponent implements OnInit {
  docForm:FormGroup;
  deptlist:any[];
  budglist:any[];

  constructor(
    public dialogRef:MatDialogRef<ChangeReqPopupComponent>,
    public formbuilder:FormBuilder
  ) { 
    this.docForm=this.formbuilder.group({
      fromdept:[""],
      frombudg:[""],
      todept:[""],
      tobudg:[""],
      code:[1]


    })
  }

  ngOnInit(): void {
    this.deptlist=[{id:1,text:'AGENCY FEES'},{id:2,text:'BERTH CHARGES'},{id:3,text:'CABIN STORES'},{id:4,text:'CREW AGENCY'}];
    this.budglist=[{id:1,text:'AGENCY FEES'},{id:2,text:'CABIN STORES'},{id:3,text:'BERTH CHARGES'},{id:4,text:'CREW AGENCY'}];
  }
save(){

}
cancel(){
  this.dialogRef.close();

}

getcode() {
}

}
