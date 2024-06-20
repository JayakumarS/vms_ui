import { Component, OnInit } from '@angular/core';
import { UomMasterService } from '../uom-master.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UOMMaster } from '../uom-master.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-uom',
  templateUrl: './add-uom.component.html',
  styleUrls: ['./add-uom.component.sass']
})
export class AddUomComponent implements OnInit {
  docForm: FormGroup;
  requestId: any;
  edit : boolean=false;
  uomMaster: UOMMaster;


  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public uomMasterService: UomMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      uomCode: ["", [Validators.required]],
      uomName: ["", [Validators.required]]
   
    });

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ 
      this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId) ;

      }
     }); 
  }


  save(){
    if(this.docForm.valid){
      this.uomMaster = this.docForm.value;
      // console.log(this.countryMaster);
      this.uomMasterService.addUom(this.uomMaster,this.router,this.notificationService);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }
  fetchDetails(uomCode: any): void {
    this.httpService.get(this.uomMasterService.editUomMaster + "?id="+uomCode).subscribe((res: any) => {
      // console.log(countryCode);

      this.docForm.patchValue({
        'uomCode': res.list[0].uomCode,
        'uomName': res.list[0].uomName
      })
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
  
  update() {

    this.uomMaster = this.docForm.value;
    this.uomMasterService.UomUpdate(this.uomMaster,this.router,this.notificationService);

  }

  cancel(){
    this.router.navigate(['/vessels/master/uom-Master/add-uom']);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
