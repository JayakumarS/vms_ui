import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-popup',
  templateUrl: './warning-popup.component.html',
  styleUrls: ['./warning-popup.component.sass']
})
export class WarningPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WarningPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public res: any,
  ) { }

  ngOnInit(): void {
  }

  closePopup(){

  }

  cancel(): void {
    this.dialogRef.close({ data: 'CANCEL' });
  }

}
