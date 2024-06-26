import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { WageScalesService } from '../../wage-scales.service';

@Component({
  selector: 'app-delete-wage-scales',
  templateUrl: './delete-wage-scales.component.html',
  styleUrls: ['./delete-wage-scales.component.sass']
})
export class DeleteWageScalesComponent  {

  constructor( public dialogRef: MatDialogRef<DeleteWageScalesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public wageScalesService: WageScalesService,
    private router:Router,public notificationService:NotificationService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
    this.dialogRef.close({ data: true })
    }

}
