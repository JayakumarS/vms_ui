import { Component, OnInit } from '@angular/core';
import { IceClassService } from '../ice-class.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-ice-class',
  templateUrl: './add-ice-class.component.html',
  styleUrls: ['./add-ice-class.component.sass']
})
export class AddIceClassComponent implements OnInit {

  docForm:FormGroup
  edit:boolean=false;
  requestId: any;

  constructor(
    private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public iceservice: IceClassService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar,
    public matError : MatErrorService
  ) { 

    this.docForm = this.fb.group({
      
      iceId:[],
      code: [""],
      desc:["",[Validators.required]],
   
});
  }

  ngOnInit(): void {
    if(this.edit!=true){
      this.httpService.get<any>(this.iceservice.getSequenceCode).subscribe((res: any) => {
        this.docForm.patchValue({
          'code':res.code
        })
      })
    }
    else{
      //
    }

     this.route.queryParams.subscribe(queryParams => {
       if (queryParams.code !== undefined) {
         this.docForm.patchValue({
          'code':queryParams.code
        })
         this.docForm.value.code = queryParams.code;
      }
     });

    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        // this.decryptRequestId = params.id;
        this.requestId = params.id;
        this.edit = true;
        this.fetchDetails(this.requestId);
      }
    });

  }


  save(){
    if(this.docForm.valid){
      this.iceservice.saveIceClass(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }

  update(){
    this.docForm.value.iceId = this.requestId;
    if(this.docForm.valid){
      this.iceservice.updateIceClass(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }

  }

  cancel(){
    this.router.navigate(['/vessels/maintain/ice-class/list-ice-class']);
  }

  fetchDetails(id:any){
    this.httpService.get<any>(this.iceservice.editUrl+"?id="+id).subscribe({next: (res: any) => {
      this.docForm.patchValue({
     
        'code': res.iceClassBean.code,
        'desc':res.iceClassBean.desc
      });

    }
  });

  }
  }
