import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-delete-country-master',
  templateUrl: './delete-country-master.component.html',
  styleUrls: ['./delete-country-master.component.sass']
})
export class DeleteCountryMasterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteCountryMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router:Router,public notificationService:NotificationService) { }

  ngOnInit(): void {
    
  }

  
  onNoClick(): void {
    this.dialogRef.close({ data: 'CANCEL' });
  }
  confirmDelete(): void {
  this.dialogRef.close({ data: true })
  }

}
