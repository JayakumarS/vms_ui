import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UserRightsResultBean } from '../user-rights-result-bean';
import { UserRightsServiceService } from '../user-rights-service.service';
import { UserRights } from '../user-rights.model';

@Component({
  selector: 'app-user-rights-list',
  templateUrl: './user-rights-list.component.html',
  styleUrls: ['./user-rights-list.component.scss']
})
export class UserRightsListComponent implements OnInit {
  @Input() userName: string ;
  @Output() heroChange = new EventEmitter();
  propertyCode: string;
  propertyName:any;
  docForm: FormGroup;
  userRights: UserRights;
  customerOrderNoList = [];
  userList = [];
  companyList = [];
  formuserList = [];
  moduleList =[];
  userformList = [];
  propertyList =[];
  formList =[];
  companyName: string;
  range: any;
  moduleName: string;
  propertyAll= false;
  isUndefinedOrNull: any;


  

  constructor(private fb: FormBuilder,private userRightsService: UserRightsServiceService,
    private httpService: HttpServiceService,)
   { 
  this.docForm = this.fb.group({
    userName: ["", [Validators.required]],
    companyName: ["", [Validators.required]],
    moduleName: ["", [Validators.required]],
    formName: ["", [Validators.required]],
    propertyAll:["", [Validators.required]],
    
  });

 

}


formlist(newValue) {
  this.range = newValue;

  this.getpermission();

  this.getuserCompanyMouduleList();
  

} 



userformlist(formuserList : any) {
  this.range = this.formuserList;

  this.processFormListData();

} 


getuserCompanyMouduleList() {


  this.httpService.get<UserRightsResultBean>(this.userRightsService.propertyList).subscribe(
    (data) => {
      this.propertyList = data.propertyList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
     }
   );
}



getpermission() {

  if(this.userName == null || this.moduleName == ""){
    this.httpService.get<UserRightsResultBean>(this.userRightsService.userpermissionList+"?userId="+this.docForm.value.userName+"&companyCode="+this.docForm.value.companyName+"&moduleCode="+this.docForm.value.moduleName).subscribe(
      (data) => {
        if(data){
                
          this.formuserList = data.lFormMasterBean ;
          this.userformlist(this.formuserList);
  }
      },
      (error: HttpErrorResponse) => {
      }
  
    );

  }

}
  

processFormListData () {

  var propertyRowCnt = 0;
  for (var i = 0; i < this.formuserList.length; i++) {
      var objFormMasterBean = this.formuserList[i];
      objFormMasterBean.propertyRow = true;
      for (var j = 0; j < objFormMasterBean.lFormPropertyBean.length; j++) {
          if (objFormMasterBean.lFormPropertyBean[j].enabled == false && objFormMasterBean.lFormPropertyBean[j].available ) {
              propertyRowCnt = 1;
              objFormMasterBean.propertyRow = false;
          }
      }
  }

  var propertyModCnt = 0;
  for (var i = 0; i < this.propertyList.length; i++) {
      var isModEnabled = true;
      for (var j = 0; j < this.formuserList.length; j++) {
          if (!this.isUndefinedOrNull(this.formuserList[j].lFormPropertyBean[i])) {
              if (this.formuserList[j].lFormPropertyBean[i].enabled == false && this.formuserList[j].lFormPropertyBean[i].available) {
                  propertyModCnt = 1;
                  isModEnabled = false;
              }
          }
      }
      this.propertyList[i].enabled = isModEnabled;
  }
  this.propertyAll = propertyRowCnt == 0 && propertyModCnt == 0;
};


changePropertyMod (value, valueIndex) {
  for (var index = 0; index < this.formuserList.length; index++) {
      if (this.formuserList[index].lFormPropertyBean.length > 0) {
          if(this.formuserList[index].lFormPropertyBean[valueIndex].available ){
          this.formuserList[index].lFormPropertyBean[valueIndex].enabled = value;
          }
      }
  }
};



changePropertyAll() {

  for ( var i = 0 ; i < this.formuserList.length; i++){
   var objFormMasterBean = this.formuserList[i];
  objFormMasterBean.propertyRow = this.propertyAll;
  for(var j = 0; j < objFormMasterBean.lFormPropertyBean.length; j++){
  if( objFormMasterBean.lFormPropertyBean[j].available){
   objFormMasterBean.lFormPropertyBean[j].enabled = this.propertyAll;
  }
  }
  }
  for(var i = 0; i < this.propertyList.length; i++){
  if(this.propertyList[i].available){
              this.propertyList[i].enabled = this.propertyAll;
              }
  }
  };

  changePropertyRow (objFormMasterBean, value) {
    for (var index = 0; index < objFormMasterBean.lFormPropertyBean.length; index++) {
        if(objFormMasterBean.lFormPropertyBean[index].available){
        objFormMasterBean.lFormPropertyBean[index].enabled = value;
        }
    }
};



  ngOnInit(): void {


   



    this.httpService.get<UserRightsResultBean>(this.userRightsService.userList).subscribe(
      (data) => {
        this.userList = data.userList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<UserRightsResultBean>(this.userRightsService.companyList).subscribe(
      (data) => {
        this.companyList = data.companyList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );


    this.httpService.get<UserRightsResultBean>(this.userRightsService.moduleList).subscribe(
      (data) => {
        this.moduleList = data.moduleList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<UserRightsResultBean>(this.userRightsService.userformList).subscribe(
      (data) => {
        this.userformList = data.userFormList;
        
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );


    


  


  }

  
}


