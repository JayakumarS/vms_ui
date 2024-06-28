

import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/service/notification.service';
import { BunkerTanksService } from '../bunker-tanks.service';
import { DeleteComponent } from 'src/app/master/country-master/list-country-master/dialog/delete/delete.component';

@Component({
  selector: 'app-view-bunker-tanks',
  templateUrl: './view-bunker-tanks.component.html',
  styleUrls: ['./view-bunker-tanks.component.sass']
})
export class ViewBunkerTanksComponent implements OnInit {
  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public BunkerTanksService : BunkerTanksService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ,public notificationService:NotificationService
  ) { 
    this.docForm = this.fb.group({
      payTypesBeanDtls: this.fb.array([
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
    this.httpService.get<any>(this.BunkerTanksService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list[0];
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/vessels/maintain/bunker-tanks/list-bunker-tanks']);
  }

}

