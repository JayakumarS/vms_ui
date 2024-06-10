import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-log-popup',
  templateUrl: './user-log-popup.component.html',
  styleUrls: ['./user-log-popup.component.sass']
})
export class UserLogPopupComponent implements OnInit {

  constructor(public router: Router,public dialogRef: MatDialogRef<UserLogPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  copy(){

  }


  exit(): void {
       this.dialogRef.close();
   }

}
