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
import { language } from '../languages.model';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { LanguagesService } from '../languages.service';

@Component({
  selector: 'app-add-languages',
  templateUrl: './add-languages.component.html',
  styleUrls: ['./add-languages.component.sass']
})
export class AddLanguagesComponent implements OnInit {

  docForm: FormGroup;
  language: language;
  edit:boolean=false;
  
  requestId: any;
  decryptRequestId: any;
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public languagesService: LanguagesService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,public matError : MatErrorService,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) {

      this.docForm = this.fb.group({
        code:["", Validators.required],
        description:["", Validators.required],
        languageid:[""],
        active: [true]
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
    this.router.navigate(['/crew/maintain/language/list-language/']);
  }


  

  

  fetchDetails(id: any) {

    this.httpService.get(this.languagesService.editlanguage + "?id=" + id).subscribe((res: any) => {
      console.log(res);
      if (res.languagesBean.active == 'Y') {
        this.docForm.patchValue({ 'active': true })
      }
      else {
        this.docForm.patchValue({ 'active': false })
      }

      this.docForm.patchValue({
        'code': res.list[0].code,
        'description': res.list[0].description,
        'languageid': res.list[0].languageid,
      });
      // this.docForm.get('code').disable();

    })
  }



  save(){
    
    if(this.docForm.valid){
    this.languagesService.savelanguage(this.docForm.value, this.router, this.notificationService);
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
      this.languagesService.updatelanguage(this.docForm.value, this.router, this.notificationService);
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
        wageScaleDetails: this.fb.array([
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