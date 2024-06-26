
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { ExpEngineService } from '../exp-engine.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DeleteComponent } from '../../health-status/list-health-status/delete/delete.component';
@Component({
  selector: 'app-view-exp-engine',
  templateUrl: './view-exp-engine.component.html',
  styleUrls: ['./view-exp-engine.component.sass']
})
export class ViewExpEngineComponent implements OnInit {
  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public ExpEngineService : ExpEngineService,
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

  ngOnInit(): void {
    this.fetchDetails(this.data);
  
}
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchDetails(id){
    this.httpService.get<any>(this.ExpEngineService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list[0];
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/crew/maintain/exp-engine/list-exp-engine']);

  }

}


