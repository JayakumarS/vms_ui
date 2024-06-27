import { Component, Inject,  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { MedicalsService } from '../../medicals.service';

@Component({
  selector: 'app-delete-medicals',
  templateUrl: './delete-medicals.component.html',
  styleUrls: ['./delete-medicals.component.sass']
})
export class DeleteMedicalsComponent  {

  constructor( public dialogRef: MatDialogRef<DeleteMedicalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public medicalsService: MedicalsService,
    private router:Router,public notificationService:NotificationService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
    this.dialogRef.close({ data: true })
    }

}
