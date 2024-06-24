

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
import { Class } from '../class.model';
import { ClassService } from '../class.service';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.sass']
})
export class AddClassComponent implements OnInit {

  docForm: FormGroup;
  class: Class;
  edit:boolean=false;
  requestId: any;
  decryptRequestId: any;

  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public classService: ClassService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,public matError : MatErrorService,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
  
          code:[""],
          description:[""],
          
        });
     
  }
  
   ngOnInit() {
    

     this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.decryptRequestId) ;

      }
     });

    }
   addRow(){
    let payitemsDetailsDtlArray=this.docForm.controls.classDetails as FormArray;
    let arraylen=payitemsDetailsDtlArray.length;
    var len = this.docForm.controls["classDetails"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      sort : 1 + len,
      select: [""],
      code:[""],
      description:[""],
      
    })
    payitemsDetailsDtlArray.insert(arraylen,newUsergroup);
  }

  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.classDetails as FormArray;
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
  save(){
    
    if(this.docForm.valid){
    this.classService.saveclass(this.docForm.value, this.router, this.notificationService);
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
    this.docForm.get('code').enable();

    if(this.docForm.valid){
      this.classService.updateclass(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }

  fetchDetails(id: any): void {
    this.httpService.get<any>(this.classService.editclass+"?id="+id).subscribe({next: (data: any) => {
      this.docForm.patchValue({
        'code': data.list.code,
        'description': data.list.description
      });
      this.docForm.get('code').disable();
    }
  });
  }

  cancel(){
    this.router.navigate(['/vessels/maintain/class/list-class']);
  }


  

  
  reset(){
    if(!this.edit){
      this.docForm = this.fb.group({
        payitemsDetails: this.fb.array([
          this.fb.group({
            sort : 1,
            code:[""],
            description:[""],
            
          })
        ]),
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

