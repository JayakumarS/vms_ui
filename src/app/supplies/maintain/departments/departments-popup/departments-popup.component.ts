import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-departments-popup',
  templateUrl: './departments-popup.component.html',
  styleUrls: ['./departments-popup.component.sass']
})
export class DepartmentsPopupComponent implements OnInit {
  docForm: FormGroup;
  dialog: any;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DepartmentsPopupComponent>,
  ) { 
    this.docForm = this.fb.group({
      itemsNotToOrderCommends:[""]
    });
  }

  ngOnInit(): void {

    this.docForm = this.fb.group({
      itemsNotToOrderCommends:[""]
    });
  }

  itemsNotToOrderCommendsCall(){
    this.dialogRef.close({ data: this.docForm.value.itemsNotToOrderCommends });
  }


  cancel(){
    this.dialogRef.close({ data: 'CANCEL' });

  }

  onClick(): void {
    
  }
}
