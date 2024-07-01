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
import { ApplicationPopupComponent } from '../application-popup/application-popup.component';

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
  vessellist: any = [];
  rankdrop: any = [];
  nationalitylist: any = [];
  decisioncodelist: any = [];
  agentlist: any = [];
  licencedata: any = [];
  enginelist: any = [];
  decryptRequestId:any;

  application:application;
  creditFile: any;
  isReset: boolean = false;
  crewflag: boolean = false; 
  requestId: number;
  edit:boolean=false;
  excel:any = [];
  files:any = [];
  excelfile:[];
  toDay:any;
  tempForm:any = [];
  tempfiles:any = [];
  agentList:any;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  certificateList: any[]=[];
  MedicalcertificateList:any[]=[];
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
      code:[""],
      surname : ["",[Validators.required]],
      name : ["",[Validators.required]],
      midname : [""],
      nation : ["",[Validators.required]],
      rank :["",[Validators.required]],
      dobObj :["",[Validators.required]],
      dob : [""],
      father : [""],
      mother : [""],
      birthplace: [""],
      vessel : [""],
      priormonth : [""],
      decisioncode : [""],
      engine : [""],
      signOffDate : [""],
      signOffDateObj:[""],
      agent :["",[Validators.required]],
      remarks : [""],
      appDate : [""],
      appDateObj: [""],
      recom : [""],
      availfromDate : [""],
      availfromDateObj:[""],
      book : [""],
      issue : [""],
      expiryDateObj : [""],
      expiryDate: [""],
      passport : [""],
      passportissue : [""],
      passportExpiryDateObj : [""],
      passportExpiryDate : [""],
      licence : [""],
      licenceissue : [""],
      licenceExpiryDate : [""],
      licenceExpiryDateObj:[""],
      grade : [""],
      licenceno : [""],
      kin : [""],
      city:[""],
      address1 : [""],
      tel1 : [""],
      address2 : [""],
      tel2 : [""],

      cvOperationsfilePath: [""],
      cvOperationsfileName: [""],
      passBookfilePath: [""],
      passBookfileName: [""],
      sBookfilePath: [""],
      sBookfileName: [""],
      medicalcertificates:[],
      applicantimagePath: [""],
      applicantimageFileName: [""],
      certificates:[],
      rankCode:[""],
      certificatesupdate:[],
      medicalcertificatesupdate:[],
      crewflag:[""]
    })
  

   }

   

  ngOnInit(): void {

    this.rankdropdown();

    this.vessellistdown();

    this.filternationality();

    this.filteragentlist();

    this.licencelist();

    this.licencelist();

   this.enginelistdata()

    this.toDay = new Date();

    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
        this.edit=true;
        this.fetchDetails(this.decryptRequestId) ;
      }
     });



     this.decisioncodelist = [{id:"SEAFARER",text:"SEAFARER APPROVED FOR PROMOTION"},{id:'EMPLOYED',text:"TO BE RE EMPLOYED"},{id:'NOT EMPLOYED',text:"NOT TO BE RE EMPLOYED"}];
 
 
  
  }
  fetchDetails(id: any): void {
    this.httpService.get<any>(this.applicationsService.editUrl+"?id="+parseInt(id)).subscribe({next: (data: any) => {
      
      this.crewflag = data.list[0].crewflag;
      
       let dobnew = this.cmnService.getDateObj( data.list[0].dob);
      
      let signOffDatenew = this.cmnService.getDateObj(data.list[0].signOffDate);

      let appDatenew = this.cmnService.getDateObj(data.list[0].appDate);

      let availfromDatenew = this.cmnService.getDateObj(data.list[0].availfromDate);

      let passportExpiryDatenew = this.cmnService.getDateObj(data.list[0].passportExpiryDate);

      let licenceExpiryDatenew = this.cmnService.getDateObj(data.list[0].licenceExpiryDate);

      let expiryDatenew = this.cmnService.getDateObj(data.list[0].expiryDate);
      if(data.list[0].engine==null){
        this.docForm.patchValue({
          'engine' : ''
          })
      }
      else{
        this.docForm.patchValue({
        'engine' : data.list[0].engine.toString()
        })
      }

      if(data.list[0].licence==null){
        this.docForm.patchValue({
          'licence' : ''
          })
      }
      else{
        this.docForm.patchValue({
          'licence' : data.list[0].licence.toString(),
        })
      }
      if(data.list[0].nation==null){
        this.docForm.patchValue({
          'nation' : ''
          })
      }
      else{
        this.docForm.patchValue({
          'nation' :  data.list[0].nation.toString(),
        })
      }
      if(data.list[0].rank==null){
        this.docForm.patchValue({
          'rank' : ''
          })
      }
      else{
        this.docForm.patchValue({
          'rank' : data.list[0].rank.toString(),
        })
      }
      if(data.list[0].agent==null){
        this.docForm.patchValue({
          'agent' : ''
          })
      }
      else{
        this.docForm.patchValue({
          'agent' : data.list[0].agent.toString(),
        })
      }
      this.docForm.patchValue({
        'code': data.list[0].code,
        'surname' :  data.list[0].surname,
        'name' :  data.list[0].name,
        'midname' : data.list[0].midname,
        'dobObj' :dobnew,
        'dob' : data.list[0].dob,
        'father' : data.list[0].father,
        'mother' : data.list[0].mother,
        'birthplace': data.list[0].birthplace,
        'vessel' : data.list[0].vessel,
        'priormonth' : data.list[0].priormonth,
        'decisioncode' : data.list[0].decisioncode,
        
        'signOffDate' : data.list[0].signOffDate,
        'signOffDateObj':signOffDatenew,
        'remarks' : data.list[0].remarks,
        'appDate' : data.list[0].appDate,
        'appDateObj': appDatenew,
        'recom' : data.list[0].recom,
        'availfromDate' : data.list[0].availfromDate,
        'availfromDateObj':availfromDatenew,
        'book' : data.list[0].book,
        'issue' : data.list[0].issue,
        'expiryDateObj' : expiryDatenew,
        'expiryDate': data.list[0].expiryDate,
        'passport' : data.list[0].passport,
        'passportissue' : data.list[0].passportissue,
        'passportExpiryDateObj' :passportExpiryDatenew,
        'passportExpiryDate' : data.list[0].passportExpiryDate,
        'licenceissue' : data.list[0].licenceissue,
        'licenceExpiryDate' : data.list[0].licenceExpiryDate,
        'licenceExpiryDateObj':licenceExpiryDatenew,
        'grade' : data.list[0].grade,
        'licenceno' : data.list[0].licenceno,
        'kin' : data.list[0].kin,
        'city':data.list[0].city,
        'address1' : data.list[0].address1,
        'tel1' : data.list[0].tel1,
        'address2' : data.list[0].address2,
        'tel2' :data.list[0].tel2,

        'cvOperationsfilePath':data.list[0].cvOperationsfilePath,
        'cvOperationsfileName':data.list[0].cvOperationsfileName,
        'passBookfilePath':data.list[0].passBookfilePath,
        'passBookfileName':data.list[0].passBookfileName,
        'sBookfilePath':data.list[0].sBookfilePath,
        'sBookfileName':data.list[0].sBookfileName,
        'applicantimagePath':data.list[0].applicantimagePath,
        'applicantimageFileName':data.list[0].applicantimageFileName,



      });
      this.applicationsService.setPopArr(data.listpopup);
      // if (data.listpopup && data.listpopup.length > 0) {
  
      //   this.openPopup(data.listpopup);
      // }
    
    }

  });
}

  openPopup(data: any) {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(ApplicationPopupComponent, {
      height: "",
      width: "",
      data: {
        action: data,
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subdetailsPatch(result);
      }
    });
  }


  rankdropdown(){
  this.httpService.get<any>(this.applicationsService.getrank).subscribe((res: any) => {

    this.rankdrop = res.lCommonUtilityBean;
    // this.rankListFilteredOptions.next(this.ranklist.slice());

      });
 }
 
 vessellistdown(){  
  this.httpService.get<any>(this.applicationsService.getvessel).subscribe((res: any) => {

 this.vessellist = res.lCommonUtilityBean;


});
 }
filternationality(){
  this.httpService.get<any>(this.applicationsService.getnation).subscribe((res: any) => {

    this.nationalitylist = res.lCommonUtilityBean;

  });
}
filteragentlist(){
  this.httpService.get<any>(this.applicationsService.getagent).subscribe((res: any) => {

    this.agentlist = res.lCommonUtilityBean;

  });
}
enginelistdata(){
  this.httpService.get<any>(this.applicationsService.getenginelist).subscribe((res: any) => {

    this.enginelist = res.lCommonUtilityBean;

  });
}
licencelist(){
  this.httpService.get<any>(this.applicationsService.getlicence).subscribe((res: any) => {

    this.licencedata = res.lCommonUtilityBean;

  });
}

fileValidation() {
  if (this.docForm.value.passport == "") {
    this.showNotification(
      "snackbar-danger",
      "Please fill the passport",
      "top",
      "right"
    );
    return false;
  }
  return true;
}
uploadFileDoc2(event) {

    var excelfile = event.target.files[0];
  var blob = excelfile.slice(0, excelfile.size, ''); 
  excelfile = new File([blob], excelfile.name.replaceAll("#","_"), {type: ''});
  console.log(excelfile);

  this.excel = excelfile;

    var fileExtension = excelfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", excelfile);
    frmData.append("fileName", fileExtension);
    this.httpService.post<any>(this.applicationsService.uploadFilePI,frmData).subscribe((data) => {
      console.log(data);
      this.docForm.value.passBookfileName=fileExtension
      this.docForm.value.passBookfilePath=data.path
      this.docForm.patchValue({
        'passBookfileName':fileExtension,
        'passBookfilePath':data.path
      })
    });
 

    console.log(frmData);
    this.tempForm.push(frmData);
 

    
}
fileValidation1(){
  if (this.docForm.value.book == "") {
    this.showNotification(
      "snackbar-danger",
      "Please fill the S.Book",
      "top",
      "right"
    );
    return false;
  }
  return true;
}

uploadFileDoc1(event) {

    var excelfile = event.target.files[0];
  var blob = excelfile.slice(0, excelfile.size, ''); 
  excelfile = new File([blob], excelfile.name.replaceAll("#","_"), {type: ''});
  console.log(excelfile);

  this.excel = excelfile;

    var fileExtension = excelfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", excelfile);
    frmData.append("fileName", fileExtension);
    this.httpService.post<any>(this.applicationsService.uploadFilePI,frmData).subscribe((data) => {
      console.log(data);
      this.docForm.value.sBookfileName=fileExtension
      this.docForm.value.sBookfilePath=data.path

      this.docForm.patchValue({
        'sBookfileName':fileExtension,
        'sBookfilePath':data.path
      })
    });
 

    console.log(frmData);
    this.tempForm.push(frmData);


    
}
  uploadFile(event) {

      var excelfile = event.target.files[0];
    var blob = excelfile.slice(0, excelfile.size, ''); 
    excelfile = new File([blob], excelfile.name.replaceAll("#","_"), {type: ''});
    console.log(excelfile);
  
    this.excel = excelfile;
  
      var fileExtension = excelfile.name;
      var frmData: FormData = new FormData();
      frmData.append("file", excelfile);
      frmData.append("fileName", fileExtension);
      this.httpService.post<any>(this.applicationsService.uploadFilePI,frmData).subscribe((data) => {
        console.log(data);
        this.docForm.value.cvOperationsfileName=fileExtension
        this.docForm.value.cvOperationsfilePath=data.path

        this.docForm.patchValue({
          'cvOperationsfileName':fileExtension,
          'cvOperationsfilePath':data.path
        })
      });
   

      console.log(frmData);
      this.tempForm.push(frmData);

  
      
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
  update(){
    if(this.docForm.valid){
      this.applicationsService.update(this.docForm.value, this.router, this.notificationService);
    }else{
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }  }
  onSubmit(){
    if(this.docForm.valid){
      this.applicationsService.save(this.docForm.value, this.router, this.notificationService);
    }else{
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
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

    var excelfile = event.target.files[0];
    var blob = excelfile.slice(0, excelfile.size, ''); 
    excelfile = new File([blob], excelfile.name.replaceAll("#","_"), {type: ''});
    console.log(excelfile);
  
    this.excel = excelfile;
  
      var fileExtension = excelfile.name;
      var frmData: FormData = new FormData();
      frmData.append("file", excelfile);
      frmData.append("fileName", fileExtension);
      this.httpService.post<any>(this.applicationsService.uploadFilePI,frmData).subscribe((data) => {
        console.log(data);
        this.docForm.value.applicantimageFileName=fileExtension
        this.docForm.value.applicantimagePath=data.path
        this.docForm.patchValue({
          'applicantimageFileName':fileExtension,
          'applicantimagePath':data.path
        })
      });
   


  }

  getDateString(event, inputFlag, index) {
    let cdate = this.cmnService.getDate(event.target.value);
    if (inputFlag == "passportExpiryDate") {
      this.docForm.patchValue({ passportExpiryDate: cdate });
    }
    if (inputFlag == "expiryDate") {
      this.docForm.patchValue({ expiryDate: cdate });
    }
    if (inputFlag == "availfromDate") {
      this.docForm.patchValue({ availfromDate: cdate });
    }
    if (inputFlag == "appDate") {
      this.docForm.patchValue({ appDate: cdate });
    }
    if (inputFlag == "signOffDate") {
      this.docForm.patchValue({ signOffDate: cdate });
    }
    if (inputFlag == "dob") {
      this.docForm.patchValue({ dob: cdate });
    }
    if (inputFlag == "licenceExpiryDate") {
      this.docForm.patchValue({ licenceExpiryDate: cdate });
    }
    
  }

  onCancel(){
    this.router.navigate(['/crew/applications/applications/list-applications']);

  }
  checkList(){
    if(this.docForm.valid){
      let rankCode = this.docForm.value.rank;
      let edit = this.edit;
      let templist = [
        ...this.certificateList,
        ...this.MedicalcertificateList
      ];
      let templistsave = [
        ...this.certificateList,
        ...this.MedicalcertificateList
      ];
          let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const obj = {
      rankCode,
      edit,
     templist,
     templistsave,
  }
    const dialogRef = this.dialog.open(ApplicationPopupComponent, {
      height: "",
      width: "",
      data: {
        action: obj,
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      debugger
      console.log(result);

      this.subdetailsPatch(result.data);
      
    });     
  }
}

// subdetailsPatch(value) {

//   this.docForm.patchValue({
//     rankCode: value.rankCode,
//     certifiCode: value.certifiCode,
//     certificates: value.certificates,
//     mCertificatecode: value.mCertificatecode,
//     medicalcertificates:value.medicalcertificates,
//   });
// }
subdetailsPatch(value) {
  this.docForm.patchValue({
    rankCode: value.rankCode,
    certifiCode: value.certifiCode,
    mCertificatecode: value.mCertificatecode,
    certificates: value.certificates,
    medicalcertificates: value.medicalcertificates,
  });

  // Update certificateList based on selected certificates
  if (value.certificates && value.certificates.length > 0) {
    this.certificateList = value.certificates.map((certificate, index) => ({
      sno: index + 1,
      CertifiCode: certificate.certifiCode,
      splitCertificateNames: certificate.splitCertificateNames.map(nameObj => ({
        name: nameObj.name,
        mandatoryFlag: nameObj.mandatoryValid,
        mandatoryInvalidFlag: nameObj.mandatoryInvalid,
        optionalFlag: nameObj.optionalInvalid
      }))
    }));
  } else {
    this.certificateList = []; // Clear the list if no certificates selected
  }

  // Update MedicalcertificateList based on selected medical certificates
  if (value.medicalcertificates && value.medicalcertificates.length > 0) {
    this.MedicalcertificateList = value.medicalcertificates.map((certificate, index) => ({
      sno: index + 1,
      mcertificateCode: certificate.mcertificateCode,
      splitCertificateMedicalNames: certificate.splitCertificateMedicalNames.map(mnameObj => ({
        mname: mnameObj.mname,
        mmandatoryFlag: mnameObj.mmandatoryValid,
        mmandatoryInvalidFlag: mnameObj.mmandatoryInvalid,
        moptionalFlag: mnameObj.moptionalInvalid
      }))
    }));
  } else {
    this.MedicalcertificateList = []; // Clear the list if no medical certificates selected
  }
}


}