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
import { ofcevaluation } from '../office-evaluations.model';
import { OfficeEvaluationsService } from '../office-evaluations.service';

@Component({
  selector: 'app-add-office-evaluations',
  templateUrl: './add-office-evaluations.component.html',
  styleUrls: ['./add-office-evaluations.component.sass'],
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
export class AddOfficeEvaluationsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {


  public nameFilterCtrl: FormControl = new FormControl();
  nameFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('name', { static: true }) name: MatSelect;

  public rankListFilterCtrl: FormControl = new FormControl();
  rankListFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('rank', { static: true }) rank: MatSelect;

  public vesselListFilterCtrl: FormControl = new FormControl();
  vesselListFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vessel', { static: true }) vessel: MatSelect;

  


  protected onDestroy = new Subject<void>();
  
  docForm: FormGroup;
  ofcevaluation:ofcevaluation;
  creditFile: any;
  isReset: boolean = false;
  requestId: number;
  edit:boolean=false;
  nameList:any;
  vesselList:any;

  constructor(

    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private officeEvaluationsService: OfficeEvaluationsService,
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
    this.docForm = this.fb.group({

      vessel : [""],
      evaluationDate : [""],
      evaluationDateObj : [""],
      name : [""],
      rank : [""],
      SignonDate : [""],
      SignoffDateObj : [""],
      SignonDateObj : [""],
      SignoffDate : [""],
      evaluate : [""],
      specify : [""],
      
    })
  

   }
  

  ngOnInit(): void {

    this.nameList = [{id:1,text:"SRI"},{id:2,text:"SAI"}];
    this.nameFilteredOptions.next(this.nameList.slice());

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
      }
     });


     this.vesselList = [{id:1,text:"BEIJING BRIDGE"},{id:2,text:"MTT SEMPORNA"}];
     this.vesselListFilteredOptions.next(this.vesselList.slice());
 
     this.nameFilterCtrl.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
      this.filtername();
    });

    this.vesselListFilterCtrl.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
      this.filtervessel();
    });
    
  }
  filtername(){
    if (!this.nameList || !this.nameFilterCtrl) {
      return;
    }
  
    // get the search keyword
    let search = this.nameFilterCtrl.value;
    if (!search) {
      this.nameFilteredOptions.next(this.nameList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    // filter the banks
    this.nameFilteredOptions.next(
      this.nameList.filter(title => title.text && title.text.toLowerCase().includes(search))
    );
  }


  filtervessel(){

    if (!this.vesselList || !this.vesselListFilterCtrl) {
      return;
    }
  
    // get the search keyword
    let search = this.vesselListFilterCtrl.value;
    if (!search) {
      this.vesselListFilteredOptions.next(this.vesselList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    // filter the banks
    this.vesselListFilteredOptions.next(
      this.vesselList.filter(title => title.text && title.text.toLowerCase().includes(search))
    );
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getDateString(event, inputFlag, index) {
    let cdate = this.cmnService.getDateObj(event.target.value);
    if (inputFlag == "PassportExpiryDate") {
      this.docForm.patchValue({ PassportExpiryDate: cdate });
    }
    if (inputFlag == "ExpiryDate") {
      this.docForm.patchValue({ ExpiryDate: cdate });
    }
    if (inputFlag == "availfromDate") {
      this.docForm.patchValue({ availfromDate: cdate });
    }
    if (inputFlag == "AppDate") {
      this.docForm.patchValue({ AppDate: cdate });
    }
    if (inputFlag == "SignOffDate") {
      this.docForm.patchValue({ SignOffDate: cdate });
    }
    if (inputFlag == "DOB") {
      this.docForm.patchValue({ DOB: cdate });
    }
    
  }

  onCancel(){
    this.router.navigate(['/crew/application-properties/office-evaluation/list-officeevaluation']);

  }
}