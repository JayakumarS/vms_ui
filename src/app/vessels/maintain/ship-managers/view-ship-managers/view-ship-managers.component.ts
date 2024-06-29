
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { ShipManagersService } from '../ship-managers.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-view-ship-managers',
  templateUrl: './view-ship-managers.component.html',
  styleUrls: ['./view-ship-managers.component.sass']
})
export class ViewShipManagersComponent implements OnInit {
  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  shipManagersBeanDtls:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public shipManagersService : ShipManagersService,
    public dialogRef: MatDialogRef<ViewShipManagersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ,public notificationService:NotificationService
  ) { 
    this.docForm = this.fb.group({
      shipManagersBeanDtls: this.fb.array([
        this.fb.group({
          sort : 1,
          select:[''],
          shipman:[""],
          name:[""],
          remarks:[""],
          vatreg:[""]
        })
      ]),
    });
  }

  ngOnInit(): void {
       this.fetchDetails(this.data) ;
     
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchDetails(id){
    this.httpService.get<any>(this.shipManagersService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.shipManagersBeanDtls = data.list[0];
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/vessels/maintain/ship-managers/list-ship-managers']);
  }

}
