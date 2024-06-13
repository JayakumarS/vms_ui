import { Component,ElementRef, OnInit,ViewChild } from '@angular/core';
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
import { BehaviorSubject, Observable, ReplaySubject, Subject, debounceTime, distinctUntilChanged, fromEvent, map, merge, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSort } from '@angular/material/sort';
import { supplycycle } from '../supplycycle-controlpanel.model';
import { SuppliesService } from '../../supplies.service';


@Component({
  selector: 'app-add-supplycycle-controlpanel',
  templateUrl: './add-supplycycle-controlpanel.component.html',
  styleUrls: ['./add-supplycycle-controlpanel.component.sass']
})
export class AddSupplycycleControlpanelComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  supplycycle:supplycycle;
  isReset: boolean = false;
  requestId: number;
  edit:boolean=false;
  exampleDatabase: SuppliesService | null;

  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private suppliesService:SuppliesService ,
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
      vesseltable: this.fb.array([
          this.fb.group({
  
            vessel:[""],
            department:[""],
            document:[""],
            date:[""],
            urgent:[""],
            budget:[""],
          })
        ]),
     
        supplycycletab: this.fb.array([
          this.fb.group({
            type :[""],
            code : [""],
            date:[""],
            supplier : [""],
            info:[""],
            items:[""],
            itemstatus:[""],
            comminfo:[""],
            attachinfo:[""],
            port:[""],
            infogate:[""],
            grouplink:[""],
            vendoreval:[""],
            techlinks:[""],
            accinfo:[""],
            ecomm:[""],
            ihminfo:[""],
            interfaceinfo:[""],
          })
        ]),
      
    });
  

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
    this.supplycycle = this.docForm.value;
    // this.suppliesService.add(this.supplycycle, this.router,this.notificationService, this.spinner);
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
    this.supplycycle = this.docForm.value;
    // this.suppliesService.Update(this.supplycycle, this.router, this.notificationService);
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

onCancel(){
  this.router.navigate(['/supplies/zones/list-zones']);

}
  Requisition(){
    this.router.navigate(['/supplies/new/requisition/add-requisition/0']);
  }
  refresh(){
 
  }
  search(){

  }
  spotorder(){
    this.router.navigate(['/supplies/new/spot-order/add-spot-order/0']);
  }
  excel(){

  }
}
