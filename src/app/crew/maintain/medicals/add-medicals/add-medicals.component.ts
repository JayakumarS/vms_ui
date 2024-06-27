import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { MedicalsService } from '../medicals.service';
import { Medicals } from '../medicals-model';

@Component({
  selector: 'app-add-medicals',
  templateUrl: './add-medicals.component.html',
  styleUrls: ['./add-medicals.component.sass']
})
export class AddMedicalsComponent implements OnInit {

  docForm: FormGroup;
  Medicals: Medicals;
  edit:boolean=false;
  
  requestId: any;
  decryptRequestId: any;
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public medicalsService: MedicalsService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,public matError : MatErrorService,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) {

      this.docForm = this.fb.group({
        mcode:["", Validators.required],
        mdescription:["", Validators.required],
        medicalId:[""],
        
      });

  
    }
     

  ngOnInit(): void {
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.decryptRequestId) ;

      }
     });
  }


  cancel(){
    this.router.navigate(['/crew/maintain/Medicals/list-Medicals/']);
  }


  

  

  fetchDetails(id: any) {

    this.httpService.get(this.medicalsService.editmed + "?id=" + id).subscribe((res: any) => {
      console.log(res);
      

      this.docForm.patchValue({
        'mcode': res.list[0].mcode,
        'mdescription': res.list[0].mdescription,
        'medicalId': res.list[0].medicalId,
      });
      
    })
  }



  save(){
    
    if(this.docForm.valid){
    this.medicalsService.savemed(this.docForm.value, this.router, this.notificationService);
  }else{
    this.matError.markFormGroupTouched(this.docForm);
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right");
  }
  }

  update() {
    if(this.docForm.valid){
      this.medicalsService.updatemed(this.docForm.value, this.router, this.notificationService);
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right"
      );
    }
  }

  reset(){
    if(!this.edit){
      this.docForm = this.fb.group({
       
            
            mcode:[""],
            mdescription:[""],
            
          })
       
    }else{
      this.fetchDetails(this.docForm.value.countryCode);
    }
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
