import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-immigration-summary-popup',
  templateUrl: './immigration-summary-popup.component.html',
  styleUrls: ['./immigration-summary-popup.component.sass']
})
export class ImmigrationSummaryPopupComponent implements OnInit {

  list:any=[];
  constructor(
    public dialogRef: MatDialogRef<ImmigrationSummaryPopupComponent>
  ) { }

  ngOnInit(): void {
    this.list = [{nationality:"Indian",count:4},{nationality:"Indian",count:4}];
  }

  cancel(){
    this.dialogRef.close({ data: 'CANCEL' });
  }

}
