import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-delete-port-master',
  templateUrl: './delete-port-master.component.html',
  styleUrls: ['./delete-port-master.component.sass']
})
export class DeletePortMasterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletePortMasterComponent>,
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
