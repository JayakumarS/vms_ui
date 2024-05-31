import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CountryMasterService } from '../../../country-master.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent {

  constructor( public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public countryMasterService: CountryMasterService,
    private router:Router,public notificationService:NotificationService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
    this.dialogRef.close({ data: true })
    }

}
