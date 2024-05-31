import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UserMasterResultBean } from '../user-master-result-bean';
import { UserMaster } from '../user-master.model';
import { UserMasterService } from '../user-master.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-user-master',
  templateUrl: './add-user-master.component.html',
  styleUrls: ['./add-user-master.component.sass']
})
export class AddUserMasterComponent implements OnInit {

  myControlDesignation = new FormControl(undefined, [Validators.required, this.requireMatch.bind(this)]);
  myControlDepartment = new FormControl(undefined, [Validators.required, this.requireMatch1.bind(this)]);
  myControlLocation = new FormControl(undefined, [Validators.required, this.requireMatch2.bind(this)]);
  myControlReportingManager = new FormControl(undefined, [Validators.required, this.requireMatch3.bind(this)]);



  docForm: FormGroup;
  userMaster: UserMaster;
  locationList = [];
  designationList = [];
  departmentList = [];
  usernameList = [];


  // For Encryption
  requestId: any;
  decryptRequestId: any;
  edit: boolean = false;
  desigtmpList: any[];
  depttmpList: any[];
  loctmpList: any[];
  usrtmpList: any[];
  createdby: any;

  constructor(
    private fb: FormBuilder,
    private userMasterService: UserMasterService,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private router: Router, private spinner: NgxSpinnerService,
    public route: ActivatedRoute,
    public notificationService: NotificationService,
    public EncrDecr: EncrDecrService,
    public token: TokenStorageService,

    private serverUrl: serverLocations,
    private encryptionService: EncryptionService,
    public dialog: MatDialog) {
    this.docForm = this.fb.group({
      fullName: ["", [Validators.required]],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      contactNumber: [""],
      designation: [""],
      department: [""],
      company: ["BITUTECH"],
      status: ["true"],
      address: [""],
      location: [""],
      reportingmngr: [""],
      usertype: [""],
      userId: [""],
      loginName: ["", [Validators.required]],
      empId: ["", [Validators.required]],
      createdby: [""]
    });
  }

  ngOnInit(): void {
    this.createdby = this.token.getUsername()
    this.docForm.patchValue({
      'createdby': this.createdby
    });
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.decryptRequestId = params.id;
        this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
        this.edit = true;
        //For User login Editable mode
        this.fetchDetails(this.requestId);
      }
    });


    if (!this.edit) {
      this.docForm.get('designation').setValidators(this.requireMatch.bind(this));
      this.docForm.get('designation').updateValueAndValidity();

      this.docForm.get('department').setValidators(this.requireMatch1.bind(this));
      this.docForm.get('department').updateValueAndValidity();
      
      this.docForm.get('location').setValidators(this.requireMatch2.bind(this));
      this.docForm.get('location').updateValueAndValidity();

      this.docForm.get('reportingmngr').setValidators(this.requireMatch3.bind(this));
      this.docForm.get('reportingmngr').updateValueAndValidity();
    }

    //location List
    this.httpService.get<UserMasterResultBean>(this.userMasterService.locationList).subscribe(
      (data) => {
        this.locationList = data.locationList;
        this.loctmpList = data.locationList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    //designation List
    this.httpService.get<UserMasterResultBean>(this.userMasterService.designation).subscribe(
      (data) => {
        this.designationList = data.designationList;
        this.desigtmpList = data.designationList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    //department List
    this.httpService.get<UserMasterResultBean>(this.userMasterService.department).subscribe(
      (data) => {
        this.departmentList = data.departmentList;
        this.depttmpList = data.departmentList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );


    //UserName List
    this.httpService.get<UserMasterResultBean>(this.userMasterService.username).subscribe(
      (data: any) => {
        this.usernameList = data.userNameList;
        this.usrtmpList = data.userNameList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }




  onSubmit() {
    if (this.docForm.valid) {
      this.spinner.show();
      this.userMaster = this.docForm.value;
      console.log(this.userMaster);
      this.userMasterService.addUserMaster(this.userMaster, this.router, this.notificationService, this.dialog);
      this.spinner.hide();
    }
    else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  }

  fetchDetails(id: any): void {
    this.httpService.get(this.userMasterService.editUser + "?userId=" + encodeURIComponent(this.encryptionService.encryptAesToString(id, this.serverUrl.secretKey).toString())).subscribe((res: any) => {
      console.log(id);
      this.docForm.get('designation').clearValidators();
      this.docForm.patchValue({
        'fullName': res.userMasterBean.fullName,
        'UserName': res.userMasterBean.username,
        'loginName': res.userMasterBean.loginName,
        'emailId': res.userMasterBean.emailId,
        'contactNumber': res.userMasterBean.contactNumber,
        'department': res.userMasterBean.department,
        'designation': res.userMasterBean.designation,
        'address': res.userMasterBean.address,
        'company': res.userMasterBean.company,
        'location': res.userMasterBean.location + "",
        'reportingmngr': res.userMasterBean.reportingmngr,
        'usertype': res.userMasterBean.usertype,
        'status': res.userMasterBean.status,
        'userId': res.userMasterBean.userId,
        'empId': res.userMasterBean.empId
      })
      // if (res.userMasterBean.designation !=""||res.userMasterBean.designation ==null||res.userMasterBean.designation ==undefined) {
      //   this.docForm.get('designation').setValidators(this.requireMatch.bind(this));
      //   this.docForm.get('designation').updateValueAndValidity();
      // } 
      
      // if (res.userMasterBean.department ==""||res.userMasterBean.department ==null||res.userMasterBean.department ==undefined) {
      //   this.docForm.get('department').setValidators(this.requireMatch1.bind(this));
      //   this.docForm.get('department').updateValueAndValidity();
      // } 
      
      // if (res.userMasterBean.location ==""||res.userMasterBean.location ==null||res.userMasterBean.location ==undefined) {
      //   this.docForm.get('location').setValidators(this.requireMatch2.bind(this));
      //   this.docForm.get('location').updateValueAndValidity();
      // } 
      
      // if (res.userMasterBean.reportingmngr ==""||res.userMasterBean.reportingmngr ==null||res.userMasterBean.reportingmngr ==undefined) {
      //   this.docForm.get('reportingmngr').setValidators(this.requireMatch3.bind(this));
      //   this.docForm.get('reportingmngr').updateValueAndValidity();
      // }



    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  update() {
    if (this.docForm.valid) {
    this.spinner.show();
    this.userMaster = this.docForm.value;
    this.userMasterService.updateUserMaster(this.userMaster, this.router, this.notificationService);
    }else{
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  }


  onCancel() {
    this.router.navigate(['/admin/userMaster/list-user-master']);
  }

  validateCountry(event) {
    this.httpService.get<any>(this.userMasterService.validateFullNameUrl + "?tableName=" + "user_master" + "&columnName=" + "user_name" + "&columnValue=" + event).subscribe((res: any) => {
      if (res) {
        this.docForm.controls['fullName'].setErrors({ country: true });
      } else {
        this.docForm.controls['fullName'].setErrors(null);
      }
    });
  }


  validateFullName(event) {
    if (event != undefined && event != null && event != "") {

      this.httpService.get<any>(this.userMasterService.validateFullNameUrl + "?userId=" + event).subscribe((res: any) => {
        if (res) {
          this.docForm.controls['userId'].setErrors({ userId: true });
        }
      });
    }
  }

  validateLoginName(event) {
    this.httpService.get<any>(this.userMasterService.validateLoginNameUrl + "?tableName=" + "auth.app_user" + "&columnName=" + "user_id" + "&columnValue=" + event).subscribe((res: any) => {
      if (res) {
        this.docForm.controls['loginName'].setErrors({ login: true });
      } else {
        this.docForm.controls['loginName'].setErrors(null);
      }
    });
  }
  validateempId(event) {
    this.httpService.get<any>(this.userMasterService.validateLoginidUrl + "?tableName=" + "auth.app_user" + "&columnName=" + "refference_id" + "&columnValue=" + event).subscribe((res: any) => {
      if (res) {
        this.docForm.controls['empId'].setErrors({ empid: true });
      } else {
        this.docForm.controls['empId'].setErrors(null);
      }
    });
  }

  getdsgnation() {
    this.httpService.get<UserMasterResultBean>(this.userMasterService.designation).subscribe(
      (data) => {
        this.designationList = data.designationList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }


  getdsgnation1(desigid) {
    var value;
    var value1;
    this.designationList.forEach(element => {
      if (element.id === desigid) {
        value = element.text;
        value1 = element.id;
      }
    });
    return value;
  }

  onKey(value) {
    if (value == "") {
      this.designationList = this.desigtmpList;
    } else {
      this.designationList = this.desigtmpList;
      this.designationList = this.search(value);
    }
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.desigtmpList.filter(option =>
      option.item.toLowerCase().startsWith(filter)
    );
  }

  getdprtmnt() {
    this.httpService.get<UserMasterResultBean>(this.userMasterService.department).subscribe(
      (data) => {
        this.departmentList = data.departmentList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }


  getdprtmnt1(deptid) {
    var value;
    var value1;
    this.departmentList.forEach(element => {
      if (element.id === deptid) {
        value = element.text;
        value1 = element.id;
      }
    });
    return value;
  }

  onKey1(value) {
    if (value == "") {
      this.departmentList = this.depttmpList;
    } else {
      this.departmentList = this.depttmpList;
      this.departmentList = this.search1(value);
    }
  }

  search1(value: string) {
    let filter = value.toLowerCase();
    return this.depttmpList.filter(option =>
      option.item.toLowerCase().startsWith(filter)
    );
  }

  getloc() {
    this.httpService.get<UserMasterResultBean>(this.userMasterService.locationList).subscribe(
      (data) => {
        this.locationList = data.locationList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }


  getloc1(currid) {
    var value;
    var value1;
    this.locationList.forEach(element => {
      if (element.id === currid) {
        value = element.text;
        value1 = element.id;
      }
    });
    return value;
  }

  onKey2(value) {
    if (value == "") {
      this.locationList = this.loctmpList;
    } else {
      this.locationList = this.loctmpList;
      this.locationList = this.search2(value);
    }
  }

  search2(value: string) {
    let filter = value.toLowerCase();
    return this.loctmpList.filter(option =>
      option.item.toLowerCase().startsWith(filter)
    );
  }

  getrptngmngr() {
    this.httpService.get<UserMasterResultBean>(this.userMasterService.username).subscribe(
      (data: any) => {
        this.usernameList = data.userNameList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }


  getrptngmngr1(usrid) {
    var value;
    var value1;
    this.usernameList.forEach(element => {
      if (element.id === usrid) {
        value = element.text;
        value1 = element.id;
      }
    });
    return value;
  }

  onKey3(value) {
    if (value == "") {
      this.usernameList = this.usrtmpList;
    } else {
      this.usernameList = this.usrtmpList;
      this.usernameList = this.search3(value);
    }
  }

  search3(value: string) {
    let filter = value.toLowerCase();
    return this.usrtmpList.filter(option =>
      option.item.toLowerCase().startsWith(filter)
    );
  }

  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    var custValue = this.getdesignation(control.value);
    if (control.value === '') {
      return null; 
         }
    if (custValue === control.value) {
      return null;
    }
    else {
      return { requireMatch: true };
    }
  }
  
  getdesignation(des) {
    var value;
    var value1;
    if(this.designationList != undefined){
      this.designationList.forEach(element => {
        if (element.id === des) {
          value1 = element.id;
          value = element.text;
        }
      });
    }
  
    return value1;
  }

  private requireMatch1(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    var custValue = this.getdepartment(control.value);
    if (control.value === '') {
      return null; 
         }
    if (custValue === control.value) {
      return null;
    }
    else {
      return { requireMatch1: true };
    }
  }
  
  getdepartment(des) {
    var value;
    var value1;
    if(this.departmentList != undefined){
      this.departmentList.forEach(element => {
        if (element.id === des) {
          value1 = element.id;
          value = element.text;
        }
      });
    }
  
    return value1;
  }

  private requireMatch2(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    var custValue = this.getlocation(control.value);
    if (control.value === '') {
      return null; 
         }
    if (custValue === control.value) {
      return null;
    }
    else {
      return { requireMatch2: true };
    }
  }
  
  getlocation(des) {
    var value;
    var value1;
    if(this.locationList != undefined){
      this.locationList.forEach(element => {
        if (element.id === des) {
          value1 = element.id;
          value = element.text;
        }
      });
    }
  
    return value1;
  }

  
  private requireMatch3(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    var custValue = this.getrptmanager(control.value);
    if (control.value === '') {
      return null; 
         }
    if (custValue === control.value) {
      return null;
    }
    else {
      return { requireMatch3: true };
    }
  }
  
  getrptmanager(des) {
    var value;
    var value1;
    if(this.usernameList != undefined){
      this.usernameList.forEach(element => {
        if (element.id === des) {
          value1 = element.id;
          value = element.text;
        }
      });
    }
  
    return value1;
  }


  reset() {
    if (!this.edit) {
      this.docForm = this.fb.group({
        fullName: [""],
        emailId: [""],
        contactNumber: [""],
        designation: [""],
        department: [""],
        company: ["BITUTECH"],
        status: ["true"],
        address: [""],
        location: [""],
        reportingmngr: [""],
        usertype: [""],
        loginName: [""]
      });
    } else {
      this.fetchDetails(this.docForm.value.userId);
    }
  }

}
function fetchDetails(id: any, any: any) {
  throw new Error('Function not implemented.');
}

