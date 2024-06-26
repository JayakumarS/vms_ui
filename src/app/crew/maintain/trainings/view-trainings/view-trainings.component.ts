
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TrainingsService } from '../trainings.service';
import { DeleteComponent } from '../../work-license/list-work-license/delete/delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-view-trainings',
  templateUrl: './view-trainings.component.html',
  styleUrls: ['./view-trainings.component.sass']
})
export class ViewTrainingsComponent implements OnInit {
  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public trainingsService : TrainingsService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ,public notificationService:NotificationService
  ) { 
    this.docForm = this.fb.group({
      trainingsBeanDtls: this.fb.array([
        this.fb.group({
          sort : 1,
          select:[""],
          code:[""],
          description:[""],
        })
      ]),
    });
  }

  ngOnInit(): void {
    this.fetchDetails(this.data);
  
}
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchDetails(id){
    this.httpService.get<any>(this.trainingsService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list[0];
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/crew/maintain/trainings/list-trainings']);
  }

}
