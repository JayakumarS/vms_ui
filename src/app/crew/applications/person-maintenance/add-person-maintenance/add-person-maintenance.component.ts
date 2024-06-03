import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

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
export class AddPersonMaintenanceComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router
  ) { 
    this.docForm = this.fb.group({
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
      status:[""],
      religion :[""],
      agent: [""],
      expMonth: [""],
      noVoyage: [""],
      ProposedType: [""],
      signedOff: [""],
      availableFrom: [""],
      remarksOne: [""],
      remarksTwo: [""],
      reCom: [""],
      passport: [""],
      issueOne: [""],
      expiryOne: [""],
      issuePlaceOne: [""],
      sBook: [""],
      issueTwo: [""],
      expiryTwo: [""],
      issuePlaceTwo: [""],
      usVisa: [""],
      sid: [""],
      issueThree: [""],
      expiryThree: [""],
      active: ["yes"],
      usPassport: [""],
      pan: [""],
      adhar: [""],
      files: [[]],
      sidFiles: [[]]

    });
  }

  ngOnInit(): void {
    this.toDay = new Date();
    this.nationalityList = [{id:1,text:"Indian"},{id:2,text:"Others"}];

    this.remarksList = [
      {id:1,text:"BLACK LIST"},
      {id:2,text:"DEPORTED"},
      {id:3,text:"DESERTER"},
      {id:4,text:"ON BOARD"},
      {id:5,text:"ON LEAVE"},
      {id:6,text:"STAND BY"}
    ];

    this.religionList = [
      {id:1,text:"ATHEIST"},
      {id:2,text:"BUDDHIST"},
      {id:3,text:"CHRISTIAN"},
      {id:4,text:"HINDU"},
      {id:5,text:"ZOROASTRAN"}
    ]

    this.healthList = [
      {id:1,text:"FIT FOR SEA SERVICES"},
      {id:2,text:"MEDICAL UNFIT"},
    ]
  }

  getDateString(event,id){
    let cdate = this.commonService.getDate(event.target.value);

    if(id == 'birthDate'){
      this.docForm.patchValue({
        birthDate : cdate
      })
     
     let currentYear = new Date().getFullYear();  
     let birthyear = this.commonService.getYear(event.target.value);
     this.age = currentYear - parseInt(birthyear);
    }
  }

  uploadFile(event) {
    for(let i=0; i < event.target.files.length; i++){
      var excelfile = event.target.files[i];
      this.excel = event.target.files[i];
      this.uploadFileList.push(this.excel);
      var fileExtension = excelfile.name;
      var frmData: FormData = new FormData();
      frmData.append("file", excelfile);
      frmData.append("fileName", fileExtension);
    }
  }

  addFile() {
      let obj = [];
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
          }
        }
      }
      this.uploadFileList = [];
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
            }
          }
        }
        this.sidUploadFileList = [];
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

  save(){}

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

}
