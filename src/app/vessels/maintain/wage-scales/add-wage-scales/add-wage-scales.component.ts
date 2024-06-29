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
import { WageScalesService } from '../wage-scales.service';
import { wagescale } from '../wage-scale.model';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
@Component({
  selector: 'app-add-wage-scales',
  templateUrl: './add-wage-scales.component.html',
  styleUrls: ['./add-wage-scales.component.sass']
})
export class AddWageScalesComponent implements OnInit {

  
  

  docForm: FormGroup;
  wagescale: wagescale;
  edit:boolean=false;
  requestId: any;
  decryptRequestId: any;
 
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public wageScalesService: WageScalesService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,public matError : MatErrorService,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
  
          code:["",Validators.required],
          description:["",Validators.required],
          wagescaleid:[""]
        });
  }
  
   ngOnInit() {
    
    this.httpService.get<any>(this.wageScalesService.getSequenceCode).subscribe((res: any) => {

      
      this.docForm.patchValue({
        'code':res.code
      })
    })

     this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.decryptRequestId) ;

      }
     });

    }
   addRow(){
    let wageScaleDetailsDtlArray=this.docForm.controls.wageScaleDetails as FormArray;
    let arraylen=wageScaleDetailsDtlArray.length;
    var len = this.docForm.controls["wageScaleDetails"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      sort : 1 + len,
      select: [""],
      code:[""],
      description:[""],
      
    })
    wageScaleDetailsDtlArray.insert(arraylen,newUsergroup);
  }


  cancel(){
    this.router.navigate(['/vessels/maintain/wage-scale/list-wageScale/']);
  }


  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.wageScaleDetails as FormArray;
    let i = 0;
    
    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if(count == 0){
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }
  }
  

  fetchDetails(id: any): void {
    this.httpService.get<any>(this.wageScalesService.editwage+"?id="+id).subscribe({next: (data: any) => {
      this.docForm.patchValue({
        'code': data.list[0].code,
        'description': data.list[0].description,
        'wagescaleid':data.list[0].wagescaleid,
      });
      }
     });

  }
  save(){
    
    if(this.docForm.valid){
    this.wageScalesService.savescale(this.docForm.value, this.router, this.notificationService);
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
      this.wageScalesService.updatescale(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }



  
  reset(){
    if(!this.edit){
      this.docForm = this.fb.group({
       
            sort : 1,
            code:[""],
            description:[""],
            
          
      });
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

