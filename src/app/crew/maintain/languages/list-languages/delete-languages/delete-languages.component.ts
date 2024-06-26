import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { LanguagesService } from '../../languages.service';

@Component({
  selector: 'app-delete-languages',
  templateUrl: './delete-languages.component.html',
  styleUrls: ['./delete-languages.component.sass']
})
export class DeleteLanguagesComponent {

  constructor( public dialogRef: MatDialogRef<DeleteLanguagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public languagesService: LanguagesService,
    private router:Router,public notificationService:NotificationService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
    this.dialogRef.close({ data: true })
    }

}
