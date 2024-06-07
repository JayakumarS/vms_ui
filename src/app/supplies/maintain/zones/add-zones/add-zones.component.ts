import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { debounce } from 'lodash';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ReplaySubject, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Zones } from '../zones.model';
import { ZonesService } from '../zones.service';

@Component({
  selector: 'app-add-zones',
  templateUrl: './add-zones.component.html',
  styleUrls: ['./add-zones.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
        },
      }
    }, CommonService
  ]
})

export class AddZonesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  Zones:Zones;
  isReset: boolean = false;
  requestId: number;
  edit:boolean=false;

  constructor(

    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private zonesService:ZonesService ,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private encryptionService: EncryptionService,
    private serverUrl: serverLocations,
    public notificationService: NotificationService,
    private cmnService: CommonService, private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private authService: AuthService, 
    private EncrDecr: EncrDecrService,

  ) { 
    super();
    
   }
  
  ngOnInit(): void {

    this.docForm = this.fb.group({
      ZonesDetailTable: this.fb.array([
        this.fb.group({
          select: [""],
          dtlcode :  [""],
          dtldescription :  [""],
        })
      ]),
      
    })
  

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
      }
     });
  }

   //save 
onSubmit() {
  if (this.docForm.valid) {
    this.Zones = this.docForm.value;
    this.zonesService.add(this.Zones, this.router,this.notificationService, this.spinner);
} else {
  this.showNotification(
    "snackbar-danger",
    "Please fill all details",
    "bottom",
    "center"
  );
}
}
onUpdate(){
  if (this.docForm.valid) {
    this.Zones = this.docForm.value;
    this.zonesService.Update(this.Zones, this.router, this.notificationService);
  }
  else {
    this.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
}

}

showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 3000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}


addRow(){

  let ZonesDetailTableArray=this.docForm.controls.ZonesDetailTable as FormArray;
  let arraylen=ZonesDetailTableArray.length;
  let newUsergroup:FormGroup = this.fb.group({
    select: [""],
    dtlcode : '',
    dtldescription : '',
   
  })
  ZonesDetailTableArray.insert(arraylen,newUsergroup);

}
removeRow(){
  let count = 0;
    const deleteRow = this.docForm.controls.ZonesDetailTable as FormArray;
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

  onCancel(){
    this.router.navigate(['/supplies/maintain/zones/list-zones']);

  }
}
