import { Component, OnInit,ViewChild } from '@angular/core';
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
import { application } from '../applications.model';
import { ApplicationsService } from '../applications.service';

@Component({
  selector: 'app-add-applications',
  templateUrl: './add-applications.component.html',
  styleUrls: ['./add-applications.component.sass'],
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
export class AddApplicationsComponent extends UnsubscribeOnDestroyAdapter implements OnInit  {


  public nationalityListFilterCtrl: FormControl = new FormControl();
  nationalityListFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('nation', { static: true }) nation: MatSelect;

  public rankListFilterCtrl: FormControl = new FormControl();
  rankListFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('rank', { static: true }) rank: MatSelect;

  public vesselFilterCtrl: FormControl = new FormControl();
  vesselNoFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vessel', { static: true }) vessel: MatSelect;

  public decisioncodeFilterCtrl: FormControl = new FormControl();
  decisioncodeNoFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('decisioncode', { static: true }) decisioncode: MatSelect;

  public expengineFilterCtrl: FormControl = new FormControl();
  expengineNoFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('engine', { static: true }) engine: MatSelect;

  public agentFilterCtrl: FormControl = new FormControl();
  agentListNoFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('agent', { static: true }) agent: MatSelect;


  protected onDestroy = new Subject<void>();
  
  docForm: FormGroup;
  application:application;
  creditFile: any;
  isReset: boolean = false;
  requestId: number;
  edit:boolean=false;
  excel:any = [];
  files:any = [];
  excelfile:[];
  toDay:any;
  tempForm:any = [];
  tempfiles:any = [];
  nationalityList:any;
  agentList:any;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private applicationsService: ApplicationsService,
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

      surname : [""],
      name : [""],
      midname : [""],
      nation : [""],
      rank : [""],
      DOBObj : [""],
      DOB : [""],
      father : [""],
      mother : [""],
      birthplace : [""],
      vessel : [""],
      decisioncode : [""],
      engine : [""],
      SignOffDate : [""],
      agent : [""],
      remarks : [""],
      AppDate : [""],
      recom : [""],
      availfromDate : [""],
      SignOffDateObj:[""],
      AppDateObj:[""],
      ExpiryDateObj:[""],
      PassportExpiryDateObj:[""],
      book : [""],
      issue : [""],
      ExpiryDate : [""],
      passport : [""],
      passportissue : [""],
      PassportExpiryDate : [""],
      availfromDateObj:[""],
      city:[""],
      licenceExpiryDateObj:[""],
      licence : [""],
      licenceissue : [""],
      licenceExpiryDate : [""],
      grade : [""],
      licenceno : [""],
      kin : [""],
      address1 : [""],
      tel1 : [""],
      address2 : [""],
      tel2 : [""],
    })
  

   }

  ngOnInit(): void {
    this.toDay = new Date();
    this.nationalityList = [{id:1,text:"Indian"},{id:2,text:"Others"}];
    this.nationalityListFilteredOptions.next(this.nationalityList.slice());

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
      }
     });


     this.agentList = [{id:1,text:"INTERNATIONAL AGENCIES CO LTD"},{id:2,text:"UNICON LOGISTICS"}];
     this.agentListNoFilteredOptions.next(this.agentList.slice());
 


     this.nationalityListFilterCtrl.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
      this.filternationality();
    });

    this.agentFilterCtrl.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
      this.filteragent();
    });
  }


 

  uploadFile(event) {
    // Check if the 'S.Book' field has a value
    if (this.docForm.get('book')?.value) {
      var excelfile = event.target.files[0];
    var blob = excelfile.slice(0, excelfile.size, ''); 
    excelfile = new File([blob], excelfile.name.replaceAll("#","_"), {type: ''});
    console.log(excelfile);
  
    this.excel = excelfile;
  
      var fileExtension = excelfile.name;
      var frmData: FormData = new FormData();
      frmData.append("file", excelfile);
      frmData.append("fileName", fileExtension);
      console.log(frmData);
      this.tempForm.push(frmData);
    } else {
      this.showNotification(
        "snackbar-danger",
        "Please enter a value in the S.Book field before uploading a file",
        "bottom",
        "center"
      );
    }
  
      
  }

  filternationality(){
    if (!this.nationalityList || !this.nationalityListFilterCtrl) {
      return;
    }
  
    // get the search keyword
    let search = this.nationalityListFilterCtrl.value;
    if (!search) {
      this.nationalityListFilteredOptions.next(this.nationalityList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    // filter the banks
    this.nationalityListFilteredOptions.next(
      this.nationalityList.filter(title => title.text && title.text.toLowerCase().includes(search))
    );
  }


  filteragent(){

    if (!this.agentList || !this.agentFilterCtrl) {
      return;
    }
  
    // get the search keyword
    let search = this.agentFilterCtrl.value;
    if (!search) {
      this.agentListNoFilteredOptions.next(this.agentList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    // filter the banks
    this.agentListNoFilteredOptions.next(
      this.agentList.filter(title => title.text && title.text.toLowerCase().includes(search))
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
  
  checkundefined = function(value) {
    var invalid = false;
    if (value == undefined || value == 'undefined' || value == null || value == 'null' || value == '') {
        invalid = true;
    }
    return invalid;
  
  }
  
  addFile(){
  
    var obj = []
    
        if (this.checkundefined(this.excel)) {
            this.showNotification(
              "snackbar-danger",
              "Please select the file",
              "bottom",
              "center"
            );return false;
        } else {
            obj = this.docForm.value.files.filter((file: any) => {
              return file.fileName === this.excel.name;
            }, true);
    }
  
    if (obj != undefined && obj.length > 0) {
      this.showNotification(
        "snackbar-danger",
        this.excel.name + "same file already added",
        "bottom",
        "center"
      );
    } else {
      if(!this.edit){
        this.files.push(this.excel);
        this.docForm.value.files.push(this.excel.name);
      } else {
  
        this.files.push(this.excel); 
        this.docForm.value.files.push({
                fileName : this.excel.name,
                filepath : '',
                agentCorrectionId : ''
        });
  
      }
    } 
  }
  
  downloadNewFile(fileName: any) {
    var a = document.createElement("a");
          a.href = this.serverUrl.apiServerAddress+"file_upload/"+this.docForm.value.agentCorrectionId+"/"+fileName;
          // a.target = '_blank';
          a.download = fileName;
          a.click();
  }
  
  deleteuploadfiles(id) {
  
    this.tempfiles = this.docForm.value.files;
    this.docForm.value.files.splice(id,1);    
  } 

  selectFiles(event: any): void {
   
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
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
    this.router.navigate(['/crew/applications/applications/list-applications']);

  }
}


