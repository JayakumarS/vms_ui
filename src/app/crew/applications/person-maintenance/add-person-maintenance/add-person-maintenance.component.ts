import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import { PersonMaintenanceService } from '../person-maintenance.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ApplicantListPopupComponent } from '../applicant-list-popup/applicant-list-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { serverLocations } from 'src/app/auth/serverLocations';
import { ViewChecklistPopupComponent } from '../view-checklist-popup/view-checklist-popup.component';

@Component({
  selector: 'app-add-person-maintenance',
  templateUrl: './add-person-maintenance.component.html',
  styleUrls: ['./add-person-maintenance.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
      },
  } },CommonService
  ]
})
export class AddPersonMaintenanceComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  docForm: FormGroup;
  nationalityList:any=[];
  rankList:any=[];
  code:any;
  uploadFileList:any=[];
  excel:any;
  tempForm:any=[];
  files:any=[];
  age:any;
  toDay:any;
  sidExcel:any;
  sidUploadFileList:any=[];
  remarksList:any=[];
  religionList:any=[];
  healthList:any=[];
  licenceList:any=[];
  cList:any=[];
  statusList:any=[];
  agentList:any=[];
  proposeTypeList:any=[];
  seaServiceYear:any;
  edit:boolean = false;
  uploadImage:any;
  file_upload:any;
  cvFile:any;
  cvFileName:any;
  sidFile:any;
  sidFileName:any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    private httpService: HttpServiceService,
    private personMaintenanceService : PersonMaintenanceService,
    private notificationService: NotificationService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private serverUrl: serverLocations
  ) { 
    super();
    this.docForm = this.fb.group({
      code: [""],
      applCode: [""],
      surname: [""],
      name: [""],
      middle: [""],
      nationality: [""],
      rank: [""],
      birthDate: [""],
      birthDateObj: [""],
      gender: [""],
      father: [""],
      mother: [""],
      place: [""],
      licence: [""],
      health: [""],
      decision: [""],
      workStatus:[""],
      religion :[""],
      agent: [""],
      expMonth: [""],
      noVoyage: [""],
      proposedType: [""],
      signedOff: [""],
      signedOffObj: [""],
      availableFrom: [""],
      availableFromObj: [""],
      remarksOne: [""],
      remarksTwo: [""],
      reCom: [""],
      passport: [""],
      pIssue: [""],
      pIssueObj: [""],
      pExpiryObj: [""],
      pExpiry: [""],
      pIssuePlace: [""],
      sBook: [""],
      sIssueObj: [""],
      sIssue: [""],
      sExpiryObj: [""],
      sExpiry: [""],
      sIssuePlace: [""],
      usVisa: [false],
      usVisaNo: [""],
      usExpiry: [""],
      usExpiryObj: [""],
      sid: [""],
      sidIssueObj: [""],
      sidIssue: [""],
      sidExpiryObj: [""],
      sidExpiry: [""],
      active: ["yes"],
      usPassport: [""],
      pan: [""],
      adhar: [""],
      indos:[""],
      files: [[]],
      sidFiles: [[]],
      cvFileName:[""],
      cvFilePath:[""],
      sidFilePath:[""],
      sidFileName:[""],
      age:[null],
      compService:[null],
      seaService:[null],
      yearsInRank:[null],
      crewMasterImg:[""],
      crewMasterFilePath:[""],
      imgName:[""],
      imgPath:[""]

    });
  }

  ngOnInit(): void {
    this.toDay = new Date();
    this.getCountryList();
    this.getRankList();
    this.getAgentList();
    this.getReligionList();
    this.getLicenseList();
    this.getHealthStatusList();
    this.getWorkStatusList();
    this.getVesselTypeList();
    this.getCrewCode();

    this.cList = [{id:1,text:"Decision-1"},{id:2,text:"Decision-1"},{id:3,text:"Decision-1"}];
    this.remarksList = [
      {id:1,text:"BLACK LIST"},
      {id:2,text:"DEPORTED"},
      {id:3,text:"DESERTER"},
      {id:4,text:"ON BOARD"},
      {id:5,text:"ON LEAVE"},
      {id:6,text:"STAND BY"}
    ];

    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ 
       this.edit=true;
       this.fetchDetails(params.id) ;
      }
     });
  }

  getCountryList(){
      this.httpService.get(this.personMaintenanceService.countryUrl).subscribe({next: (res: any) => {
        this.nationalityList = res.lCommonUtilityBean;
      }, error: (err) => console.log(err)
    });
  }

  getRankList(){
    this.httpService.get(this.personMaintenanceService.rankListUrl).subscribe({next: (res: any) => {
        this.rankList = res.lCommonUtilityBean;
      }, error: (err) => console.log(err)
    });
  }

  getAgentList(){
    this.httpService.get(this.personMaintenanceService.agentListUrl).subscribe({next: (res: any) => {
        this.agentList = res.lCommonUtilityBean;
      }, error: (err) => console.log(err)
    });
  }

  getReligionList(){
    this.httpService.get(this.personMaintenanceService.religionListUrl).subscribe({next: (res: any) => {
        this.religionList = res.lCommonUtilityBean;
      }, error: (err) => console.log(err)
    });
  }

  getLicenseList(){
    this.httpService.get(this.personMaintenanceService.licenseUrl).subscribe({next: (res: any) => {
        this.licenceList = res.lCommonUtilityBean;
      }, error: (err) => console.log(err)
    });
  }

  getWorkStatusList(){
    this.httpService.get(this.personMaintenanceService.workStatusUrl).subscribe({next: (res: any) => {
      this.statusList = res.lCommonUtilityBean;
    }, error: (err) => console.log(err)
  });
  }

  getHealthStatusList(){
    this.httpService.get(this.personMaintenanceService.healthStatusUrl).subscribe({next: (res: any) => {
        this.healthList = res.lCommonUtilityBean;
      }, error: (err) => console.log(err)
    });
  }

  getVesselTypeList(){
    this.httpService.get(this.personMaintenanceService.vesselTypeUrl).subscribe({next: (res: any) => {
        this.proposeTypeList = res.lCommonUtilityBean;
      }, error: (err) => console.log(err)
    });
  }

  getCrewCode(){
    if(!this.edit){
      this.httpService.get(this.personMaintenanceService.generateCodeUrl).subscribe({next: (res: any) => {
        console.log(res);
          this.docForm.patchValue({
            'code':res.code
          })
      }, error: (err) => console.log(err)
    });
    }
  }

  fetchDetails(id){
    this.httpService.get<any>(this.personMaintenanceService.editUrl+"?id="+id).subscribe({next: (res: any) => {
      let bDate = this.commonService.getDateObj(res.crewMasterDtls.birthDate == null ? "" : res.crewMasterDtls.birthDate);
      let avail = this.commonService.getDateObj(res.crewMasterDtls.availableFrom == null ? "" : res.crewMasterDtls.availableFrom);
      let signedOff = this.commonService.getDateObj(res.crewMasterDtls.signedOff == null ? "" : res.crewMasterDtls.signedOff);

      let pIssue = this.commonService.getDateObj(res.crewMasterDocDtls.pIssue == null ? "" : res.crewMasterDocDtls.pIssue);
      let pExpiry = this.commonService.getDateObj(res.crewMasterDocDtls.pExpiry == null ? "" : res.crewMasterDocDtls.pExpiry);

      let sIssue = this.commonService.getDateObj(res.crewMasterDocDtls.sIssue == null ? "" : res.crewMasterDocDtls.sIssue);
      let sExpiry = this.commonService.getDateObj(res.crewMasterDocDtls.sExpiry == null ? "" : res.crewMasterDocDtls.sExpiry);

      let sidIssue = this.commonService.getDateObj(res.crewMasterDocDtls.sidIssue == null ? "" : res.crewMasterDocDtls.sidIssue);
      let sidExpiry = this.commonService.getDateObj(res.crewMasterDocDtls.sidExpiry == null ? "" : res.crewMasterDocDtls.sidExpiry);

      let usExpiry = this.commonService.getDateObj(res.crewMasterDocDtls.usExpiry == null ? "" : res.crewMasterDocDtls.usExpiry);

      this.docForm.patchValue({
        'code':res.crewMasterDtls.code,
        'surname':res.crewMasterDtls.surname,
        'name':res.crewMasterDtls.name,
        'middle':res.crewMasterDtls.middle,
        'nationality':res.crewMasterDtls.nationality,
        'rank':res.crewMasterDtls.rank,
        'birthDate':res.crewMasterDtls.birthDate,
        'birthDateObj':bDate,
        'gender':res.crewMasterDtls.gender,
        'father':res.crewMasterDtls.father,
        'mother':res.crewMasterDtls.mother,
        'place':res.crewMasterDtls.place,
        'licence':res.crewMasterDtls.licence,
        'health':res.crewMasterDtls.health,
        'decision':parseInt(res.crewMasterDtls.decision),
        'workStatus':res.crewMasterDtls.workStatus,
        'religion':res.crewMasterDtls.religion,
        'agent':res.crewMasterDtls.agent,
        'expMonth':res.crewMasterDtls.expMonth,
        'noVoyage':res.crewMasterDtls.noVoyage,
        'proposedType':res.crewMasterDtls.proposedType,
        'signedOff':res.crewMasterDtls.signedOff,
        'signedOffObj':signedOff,
        'availableFrom':res.crewMasterDtls.availableFrom,
        'availableFromObj':avail,
        'remarksOne':parseInt(res.crewMasterDtls.remarksOne),
        'remarksTwo':parseInt(res.crewMasterDtls.remarksTwo),
        'reCom':res.crewMasterDtls.reCom,
        'active':res.crewMasterDtls.active == "Y" ? 'yes' : 'no',

        'passport':res.crewMasterDocDtls.passport,
        'pIssue':res.crewMasterDocDtls.pIssue,
        'pIssueObj':pIssue,
        'pExpiry':res.crewMasterDocDtls.pExpiry,
        'pExpiryObj':pExpiry,
        'pIssuePlace':res.crewMasterDocDtls.pIssuePlace,
        'sBook':res.crewMasterDocDtls.sBook,
        'sIssue':res.crewMasterDocDtls.sIssue,
        'sIssueObj':sIssue,
        'sExpiry':res.crewMasterDocDtls.sExpiry,
        'sExpiryObj':sExpiry,
        'sIssuePlace':res.crewMasterDocDtls.sIssuePlace,
        'usVisa':res.crewMasterDocDtls.usVisa,
        'sid':res.crewMasterDocDtls.sid,
        'sidIssue':res.crewMasterDocDtls.sidIssue,
        'sidIssueObj':sidIssue,
        'sidExpiry':res.crewMasterDocDtls.sidExpiry, 
        'sidExpiryObj':sidExpiry,
        'usPassport':res.crewMasterDocDtls.usPassport,
        'pan':res.crewMasterDocDtls.pan,
        'adhar':res.crewMasterDocDtls.adhar,
        'indos':res.crewMasterDocDtls.indos,
        'usVisaNo':res.crewMasterDocDtls.usVisaNo,
        'usExpiry':res.crewMasterDocDtls.usExpiry,
        'usExpiryObj':usExpiry,
        'imgName':res.crewMasterDocDtls.imgName,
        'imgPath':res.crewMasterDocDtls.imgPath,
        'cvFileName':res.crewMasterDocDtls.cvFileName,
        'cvFilePath':res.crewMasterDocDtls.cvFilePath,
        'sidFileName':res.crewMasterDocDtls.sidFileName,
        'sidFilePath':res.crewMasterDocDtls.sidFilePath
      })

      this.uploadImage = this.serverUrl.apiServerAddress + "file_upload/" + res.crewMasterDocDtls.imgName;
      this.cvFile = this.serverUrl.apiServerAddress + "file_upload/" + res.crewMasterDocDtls.cvFileName;
      this.cvFileName = res.crewMasterDocDtls.cvFileName;

      this.sidFile = this.serverUrl.apiServerAddress + "file_upload/" + res.crewMasterDocDtls.sidFileName;
      this.sidFileName = res.crewMasterDocDtls.sidFileName;

      this.calculateSeaService();
      let currentYear = new Date().getFullYear();  
      let birthyear = this.commonService.getYear(this.docForm.value.birthDateObj);
      this.age = currentYear - parseInt(birthyear);
      isNaN(this.age) ? this.docForm.patchValue({'age':null}) : this.docForm.patchValue({'age':this.age});

      if(this.docForm.value.availableFrom != null){
        const givenDateParts = this.docForm.value.availableFrom.split('/');
        let currentDate = new Date();
        const givenDate = new Date(parseInt(givenDateParts[2]), parseInt(givenDateParts[1]) - 1, parseInt(givenDateParts[0]));
        const differenceInMonths = this.monthsDifference(givenDate, currentDate);
        isNaN(differenceInMonths) ? this.docForm.patchValue({'compService':null}) : this.docForm.patchValue({'compService':(differenceInMonths/12).toFixed(1)});
      }
      // let availableYear = this.commonService.getYear(this.docForm.value.availableFromObj);
      // let compExp = currentYear - parseInt(availableYear);
      // isNaN(compExp) ? this.docForm.patchValue({'compService':null}) : this.docForm.patchValue({'compService':compExp});

      if(res.crewMasterDtls.rankDate != null){
        let rankExpYear = res.crewMasterDtls.rankDate.split('/');
        let currentDate = new Date();
        const givenDate = new Date(parseInt(rankExpYear[2]), parseInt(rankExpYear[1]) - 1, parseInt(rankExpYear[0]));
        const differenceInMonths = this.monthsDifference(givenDate, currentDate);
        isNaN(differenceInMonths) ? this.docForm.patchValue({'yearsInRank':null}) : this.docForm.patchValue({'yearsInRank':(differenceInMonths/12).toFixed(1)});
      }
      }, error: (err) => console.log(err)
     });
  }

  save(){
    if(this.docForm.valid){
      this.personMaintenanceService.save(this.docForm.value, this.router, this.notificationService);
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right"
      );
    }
  }

  update(){
    if(this.docForm.valid){
      this.personMaintenanceService.update(this.docForm.value, this.router, this.notificationService);
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right"
      );
    }
  }

  monthsDifference(vDate: Date, curr: Date): number {
    const yearsDiff = curr.getFullYear() - vDate.getFullYear();
    const monthsDiff = curr.getMonth() - vDate.getMonth();
    return yearsDiff * 12 + monthsDiff;
  }

  calculateSeaService(){
      const years = this.docForm.value.expMonth / 12;
      this.seaServiceYear = years.toFixed(1);
      this.docForm.patchValue({
        'seaService':this.seaServiceYear
       })
      console.log(years);
  }

  calculateCompanyService(){
    const years = this.docForm.value.expMonth / 12;
    this.seaServiceYear = years.toFixed(1);
    this.docForm.patchValue({
      'seaService':this.seaServiceYear
     })
    console.log(years);
}

  getDateString(event,id){
    let cdate = this.commonService.getDate(event.target.value);

    if(id == 'birthDate'){
     this.docForm.patchValue({birthDate : cdate});
     let currentYear = new Date().getFullYear();  
     let birthyear = this.commonService.getYear(event.target.value);
     this.age = currentYear - parseInt(birthyear);
     this.docForm.patchValue({
      'age':this.age
     })

    }else if(id == 'signedOff'){
      this.docForm.patchValue({signedOff : cdate});
    }else if(id == 'availableFrom'){
      this.docForm.patchValue({availableFrom : cdate});
      let currentYear = new Date().getFullYear();  
      let availableYear = this.commonService.getYear(event.target.value);
      let compExp = currentYear - parseInt(availableYear);
      this.docForm.patchValue({
       'compService':compExp
      })
    }else if(id == 'pIssue'){
      this.docForm.patchValue({pIssue : cdate});
    }else if(id == 'pExpiry'){
      this.docForm.patchValue({pExpiry : cdate});
    }else if(id == 'sIssue'){
      this.docForm.patchValue({sIssue : cdate});
    }else if(id == 'sExpiry'){
      this.docForm.patchValue({sExpiry : cdate});
    }else if(id == 'usExpiry'){
      this.docForm.patchValue({usExpiry : cdate});
    }else if(id == 'sidIssue'){
      this.docForm.patchValue({sidIssue : cdate});
    }else if(id == 'sidExpiry'){
      this.docForm.patchValue({sidExpiry : cdate});
    }
  }

  uploadFileCv(event) {
    for(let i=0; i < event.target.files.length; i++){
      var excelfile = event.target.files[i];
      this.excel = event.target.files[i];
      this.uploadFileList.push(this.excel);
      var fileExtension = excelfile.name;
      var frmData: FormData = new FormData();
      frmData.append("file", excelfile);
      frmData.append("fileName", fileExtension);
    }

    this.httpService.post<any>(this.personMaintenanceService.uploadFileUrl,frmData).subscribe({next: (res: any) => {
      this.docForm.patchValue({'cvFilePath':res.filePath,'cvFileName':res.fileName});
      }, error: (err) => console.log(err)
    });
  }

  openApplicantOpenUp(){
    let tempDirection;
    if (localStorage.getItem("isRtl") == "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    const dialogRef = this.dialog.open(ApplicantListPopupComponent, {
      data: "",
      height:"80%",
      width: "100%",
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((res) => {
    if (res.data != 'CANCEL') {
      let bDate = this.commonService.getDateObj(res.data[0].birthDate == null ? "" : res.data[0].birthDate);
      let avail = this.commonService.getDateObj(res.data[0].availableFrom == null ? "" : res.data[0].availableFrom);
      let signedOff = this.commonService.getDateObj(res.data[0].signedOff == null ? "" : res.data[0].signedOff);

      let pIssue = this.commonService.getDateObj(res.data[0].pIssue == null ? "" : res.data[0].pIssue);
      let pExpiry = this.commonService.getDateObj(res.data[0].pExpiry == null ? "" : res.data[0].pExpiry);

      let sIssue = this.commonService.getDateObj(res.data[0].sIssue == null ? "" : res.data[0].sIssue);
      let sExpiry = this.commonService.getDateObj(res.data[0].sExpiry == null ? "" : res.data[0].sExpiry);

      let sidIssue = this.commonService.getDateObj(res.data[0].sidIssue == null ? "" : res.data[0].sidIssue);
      let sidExpiry = this.commonService.getDateObj(res.data[0].sidExpiry == null ? "" : res.data[0].sidExpiry);

      let usExpiry = this.commonService.getDateObj(res.data[0].usExpiry == null ? "" : res.data[0].usExpiry);
      this.docForm.patchValue({
        'applCode':res.data[0].applCode,
        'surname':res.data[0].surname,
        'name':res.data[0].name,
        'middle':res.data[0].middle,
        'nationality':res.data[0].nationality,
        'rank':res.data[0].rank,
        'birthDate':res.data[0].birthDate,
        'birthDateObj':bDate,
        'gender':res.data[0].gender,
        'father':res.data[0].father,
        'mother':res.data[0].mother,
        'place':res.data[0].place,
        'licence':res.data[0].licence,
        'health':res.data[0].health,
        'decision':parseInt(res.data[0].decision),
        'workStatus':res.data[0].workStatus,
        'religion':res.data[0].religion,
        'agent':res.data[0].agent,
        'expMonth':res.data[0].expMonth,
        'noVoyage':res.data[0].noVoyage,
        'proposedType':res.data[0].proposedType,
        'signedOff':res.data[0].signedOff,
        'signedOffObj':signedOff,
        'availableFrom':res.data[0].availableFrom,
        'availableFromObj':avail,
        'remarksOne':parseInt(res.data[0].remarksOne),
        'remarksTwo':parseInt(res.data[0].remarksTwo),
        'reCom':res.data[0].reCom,
        // 'active':res.data[0].active == "Y" ? 'yes' : 'no',

        'passport':res.data[0].passport,
        'pIssue':res.data[0].pIssue,
        'pIssueObj':pIssue,
        'pExpiry':res.data[0].pExpiry,
        'pExpiryObj':pExpiry,
        'pIssuePlace':res.data[0].pIssuePlace,
        'sBook':res.data[0].sBook,
        'sIssue':res.data[0].sIssue,
        'sIssueObj':sIssue,
        'sExpiry':res.data[0].sExpiry,
        'sExpiryObj':sExpiry,
        'sIssuePlace':res.data[0].sIssuePlace,
        'usVisa':res.data[0].usVisa,
        'sid':res.data[0].sid,
        'sidIssue':res.data[0].sidIssue,
        'sidIssueObj':sidIssue,
        'sidExpiry':res.data[0].sidExpiry, 
        'sidExpiryObj':sidExpiry,
        'usPassport':res.data[0].usPassport,
        'pan':res.data[0].pan,
        'adhar':res.data[0].adhar,
        'indos':res.data[0].indos,
        'usVisaNo':res.data[0].usVisaNo,
        'usExpiry':res.data[0].usExpiry,
        'usExpiryObj':usExpiry,
        'imgName':res.data[0].imgName,
        'imgPath':res.data[0].imgPath
      })

      this.uploadImage = this.serverUrl.apiServerAddress+"file_upload/"+res.data[0].imgName;

      let currentYear = new Date().getFullYear();  
      let birthyear = this.commonService.getYear(this.docForm.value.birthDateObj);
      this.age = currentYear - parseInt(birthyear);
      this.docForm.patchValue({
        'age':this.age
       })
    }
    })
  }

  addFile() {
      let obj = [];
      if(this.uploadFileList.length > 0){
        for(let i=0;i < this.uploadFileList.length;i++){
          this.excel = this.uploadFileList[i];
          if (this.checkUndefined(this.excel)) {
            this.showNotification(
              "snackbar-danger",
              "Please select the file",
              "top",
              "right"
            ); 
          }else {
             obj = this.docForm.value.files.filter((file: any) => {return file.name === this.excel.name});
    
             if (obj != undefined && obj.length > 0) {
              this.showNotification(
                "snackbar-danger",
                this.excel.name + " file already added",
                "top",
                "right"
              );
            } else {
              this.docForm.value.files.push(this.excel);
              this.uploadFileList = [];
            }
          }
        }
      }else{
        this.showNotification(
          "snackbar-danger",
          "Please upload atleast one file",
          "top",
          "right"
        );
      }
  }

  deleteFile(i){
    this.docForm.value.files.splice(i, 1);
  }

  sidFileUpload(event){
      for(let i=0; i < event.target.files.length; i++){
        var excelfile = event.target.files[i];
        this.sidExcel = event.target.files[i];
        this.sidUploadFileList.push(this.sidExcel);
        var fileExtension = excelfile.name;
        var frmData: FormData = new FormData();
        frmData.append("file", excelfile);
        frmData.append("fileName", fileExtension);
      }

      this.httpService.post<any>(this.personMaintenanceService.uploadFileUrl,frmData).subscribe({next: (res: any) => {
        this.docForm.patchValue({'sidFilePath':res.filePath,'sidFileName':res.fileName});
        }, error: (err) => console.log(err)
      });
  }

  addSidFile() {
      let obj = [];
      if(this.sidUploadFileList.length > 0){
        for(let i=0;i < this.sidUploadFileList.length;i++){
          if (this.checkUndefined(this.sidExcel)) {
            this.showNotification(
              "snackbar-danger",
              "Please select the file",
              "top",
              "right"
            ); 
          }else {
             obj = this.docForm.value.sidFiles.filter((file: any) => {return file.name === this.sidExcel.name});
    
             if (obj != undefined && obj.length > 0) {
              this.showNotification(
                "snackbar-danger",
                this.sidExcel.name + " file already added",
                "top",
                "right"
              );
            } else {
              this.docForm.value.sidFiles.push(this.sidExcel);
              this.sidUploadFileList = [];
            }
          }
        }
      }else{
        this.showNotification(
          "snackbar-danger",
          "Please upload atleast one file",
          "top",
          "right"
        );
      }

  }

  deleteSidFile(i){
    this.docForm.value.sidFiles.splice(i, 1);
  }

  cancel(){
    this.router.navigate(['/crew/applications/person-maintenance/list-person-maintenance']);
  }

  checkUndefined(value) {
    var invalid = false;
    if (value == undefined || value == 'undefined' || value == null || value == 'null' || value == '') {
       invalid = true;
    }
    return invalid;
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: [colorName, 'snackbar-text'],
      data: {
        html: true
      }
    });
  }

  fileValidation() {
    if (this.docForm.value.sid == "") {
      this.showNotification(
        "snackbar-danger",
        "Please fill the SID",
        "top",
        "right"
      );
      return false;
    }
    return true;
  }

  onFileChange(event: any) {
    if(this.fileValidation()) {
      this.sidFileUpload(event);
    }
  }

  openViewCheckListPopUp(){
    let tempDirection;
    const dialogRef = this.dialog.open(ViewChecklistPopupComponent, {
      data: this.docForm.value.applCode,
      height:"",
      width: "30%",
      direction: tempDirection,
    });  
  }

}
