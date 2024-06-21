

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ExpEngineService } from '../../exp-engine.service';
import { DeleteComponent } from '../../../maintain-rank/list-maintain-rank/delete/delete.component';
@Component({
  selector: 'app-delete-exp-engine',
  templateUrl: './delete-exp-engine.component.html',
  styleUrls: ['./delete-exp-engine.component.sass']
})
export class DeleteExpEngineComponent {

  constructor( public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ExpEngineService: ExpEngineService,
    private router:Router,public notificationService:NotificationService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
    this.dialogRef.close({ data: true })
    }

}

