import { Component, Inject , OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DepartmentMasterService } from '../../department-master.service';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.sass']
})
export class DeleteDepartmentComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public departmentMasterService: DepartmentMasterService,
    private router:Router,public notificationService:NotificationService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
    this.dialogRef.close({ data: true })
    }

}
