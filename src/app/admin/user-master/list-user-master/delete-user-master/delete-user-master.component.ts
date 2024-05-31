import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UserMasterService } from '../../user-master.service';

@Component({
  selector: 'app-delete-user-master',
  templateUrl: './delete-user-master.component.html',
  styleUrls: ['./delete-user-master.component.sass']
})
export class DeleteUserMasterComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userMasterService: UserMasterService,
    private router:Router,
    public notificationService:NotificationService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
    this.dialogRef.close({ data: true })
    }
}
