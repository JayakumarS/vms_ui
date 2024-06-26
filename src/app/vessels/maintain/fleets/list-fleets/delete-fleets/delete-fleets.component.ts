import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { FleetsService } from '../../fleets.service';

@Component({
  selector: 'app-delete-fleets',
  templateUrl: './delete-fleets.component.html',
  styleUrls: ['./delete-fleets.component.sass']
})
export class DeleteFleetsComponent {

  constructor( public dialogRef: MatDialogRef<DeleteFleetsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fleetsService: FleetsService,
    private router:Router,public notificationService:NotificationService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
    this.dialogRef.close({ data: true })
    }

}
