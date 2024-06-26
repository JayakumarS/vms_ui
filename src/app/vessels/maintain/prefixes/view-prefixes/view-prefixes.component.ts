import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { VesselTypesService } from '../../vessel-types/vessel-types.service';
import { PrefixesService } from '../prefixes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-view-prefixes',
  templateUrl: './view-prefixes.component.html',
  styleUrls: ['./view-prefixes.component.sass']
})
export class ViewPrefixesComponent implements OnInit {

  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public prefixesService : PrefixesService,
    public dialogRef: MatDialogRef<ViewPrefixesComponent>,
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
       this.fetchDetails(this.data) ;
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchDetails(id){
    this.httpService.get<any>(this.prefixesService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list[0];
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/vessels/maintain/prefixes/list-prefixes']);
  }

}
