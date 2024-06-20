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
  isChecked: boolean = false;
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
  
        languageDetails: this.fb.array([
          this.fb.group({
         
            select:[""],
            code:[""],
            description:[""],
            
          })
        ]),
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

  addRow(){
    let LanguageDetailsDtlArray=this.docForm.controls.languageDetails as FormArray;
    let arraylen=LanguageDetailsDtlArray.length;
    var len = this.docForm.controls["languageDetails"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      sort : 1 + len,
      select: [""],
      code:[""],
      description:[""],
      
    })
    LanguageDetailsDtlArray.insert(arraylen,newUsergroup);
  }


  cancel(){
    this.router.navigate(['/crew/maintain/language/list-language/']);
  }


  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.languageDetails as FormArray;
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
    this.httpService.get<any>(this.languagesService.editlanguage+"?id="+id).subscribe({next: (data: any) => {
      let dtlArray = this.docForm.controls.languageDetails as FormArray;
      dtlArray.clear();
      data.list.forEach((element, index) => {
        let arraylen = dtlArray.length;
        let newUsergroup: FormGroup = this.fb.group({
          select:[""],
          code: [element.code],
          description:[element.description + ""]
        })
        dtlArray.insert(arraylen, newUsergroup);
        newUsergroup.get('code').disable();
      });
      }, error: (err) => console.log(err)
     });

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
    const dtlArray = this.docForm.get('languageDetails') as FormArray;
    dtlArray.controls.forEach(control => {
      control.get('code').enable();
    });
    if(this.docForm.valid){
      this.languagesService.updatelanguage(this.docForm.value, this.router, this.notificationService);
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
