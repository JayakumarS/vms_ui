import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-description-popup',
  templateUrl: './description-popup.component.html',
  styleUrls: ['./description-popup.component.sass']
})
export class DescriptionPopupComponent implements OnInit {

  docForm: FormGroup;
  dialog: any;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DescriptionPopupComponent>,
  ) { 
    this.docForm = this.fb.group({
      desc:[""],
    });
  }

  ngOnInit(): void {
  }

  descCall(){
    this.dialogRef.close({ data: this.docForm.value.desc });
  }

  cancel(){
    this.dialogRef.close({ data: 'CANCEL' });
  }

  onClick(): void {
    
  }
}
