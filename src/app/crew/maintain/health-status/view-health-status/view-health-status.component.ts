import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HealthStatusService } from '../health-status.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DeleteComponent } from '../list-health-status/delete/delete.component';
@Component({
  selector: 'app-view-health-status',
  templateUrl: './view-health-status.component.html',
  styleUrls: ['./view-health-status.component.sass']
})
export class ViewHealthStatusComponent implements OnInit {
  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public HealthStatusService : HealthStatusService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ,public notificationService:NotificationService
  ) { 
    this.docForm = this.fb.group({
      vesselTypeDtls: this.fb.array([
        this.fb.group({
          sort : 1,
          select:[""],
          code:[""],
          description:[""],
        })
      ]),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
       this.fetchDetails(this.data);
     
  }

  fetchDetails(id){
    this.httpService.get<any>(this.HealthStatusService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list[0];
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/crew/maintain/health-status/list-health-status']);

  }

}

