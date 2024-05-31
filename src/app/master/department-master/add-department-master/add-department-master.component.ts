import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DepartmentMaster } from '../department-master.model';
import { DepartmentMasterResultBean } from '../department-master-result-bean';
import { DepartmentMasterService } from '../department-master.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { map, Observable, startWith } from 'rxjs';
import { AutoComplete } from 'src/app/common-service/AutoComplete';



@Component({
  selector: 'app-add-department-master',
  templateUrl: './add-department-master.component.html',
  styleUrls: ['./add-department-master.component.sass']
})
export class AddDepartmentMasterComponent implements OnInit {
  docForm: FormGroup;
  departmentMaster: DepartmentMaster;
  edit:boolean=false;
  userList: AutoComplete[]=[];
  // For Encryption
  requestId: any;
  decryptRequestId: any;

  userFilterOptions: Observable<AutoComplete[]>;
  myControlUser = new FormControl(undefined, [Validators.required, this.requireMatch.bind(this)]);

  constructor(private fb: FormBuilder,
    private departmentMasterService : DepartmentMasterService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,
    public notificationService:NotificationService,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService
    ) { 

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      departmentName: ["", [Validators.required]],
      deptCode: [""],
      departmentHead: [""],
      remarks:[""],
      isActive:["true"],
      deptStatus:["true"]
    });

  }

  valueForForm ={
    user: "",
  }

  ngOnInit(): void {
    
    this.userList1();

    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
      // setTimeout(() => {
        this.fetchDetails(this.requestId) ;
      // }, 500);
       
      }
     });


  }

  userList1(){
    this.httpService.get<any>(this.departmentMasterService.userMasterList).subscribe((res: any) => {
      this.userList = res.userList;
      this.userFilterOptions = this.myControlUser.valueChanges.pipe(
        startWith(''),
        map(value => this._filterForUser(value || '')),
      );
    });
  }

  onSubmit(){
    this.docForm.value.departmentHead = this.myControlUser.value;
    if(this.docForm.valid){
      this.departmentMaster = this.docForm.value;
      // console.log(this.departmentMaster);
      this.departmentMasterService.addDepartment(this.departmentMaster, this.router, this.notificationService);
      // this.showNotification(
      //   "snackbar-success",
      //   "Add Record Successfully...!!!",
      //   "bottom",
      //   "center"
      // );
      // this.router.navigate(['/master/department-Master/list-department']);
    }
    else {
      this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
    }
  }

  fetchDeptHead(deptCode: any) {
    this.httpService.get(this.departmentMasterService.fetchDeptHead + "?deptCode=" + deptCode).subscribe((res: any) => {
      setTimeout(() => {this.valueForForm.user = res.departmentMasterBean.id},500);
    },
      (err: HttpErrorResponse) => {
      }
    );
  }

  fetchDetails(deptCode: any): void {
    this.httpService.get(this.departmentMasterService.editDepartment+"?departmentMaster="+encodeURIComponent(this.encryptionService.encryptAesToString(deptCode, this.serverUrl.secretKey).toString())).subscribe((res: any)=> {
      this.docForm.patchValue({
        'departmentName': res.departmentMasterBean.departmentName,
        'remarks' : res.departmentMasterBean.remarks,
        'deptCode': res.departmentMasterBean.deptCode,
        'deptStatus': res.departmentMasterBean.deptStatus,
     })
     var head = res.departmentMasterBean.departmentHead+"";
      // this.myControlUser.patchValue(head);
    // this.valueForForm.user = res.departmentMasterBean.departmentHead;
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    this.fetchDeptHead(deptCode);
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }

  update(){
    this.docForm.value.departmentHead = this.valueForForm.user;
    this.departmentMaster = this.docForm.value;
    this.departmentMasterService.departmentUpdate(this.departmentMaster, this.router, this.notificationService);
    this.notificationService.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/department-Master/list-department']);
  }

  onCancel(){
    this.router.navigate(['/master/department-Master/list-department']);
  }
  
  reset(){
    if(!this.edit){
      this.docForm = this.fb.group({
        departmentName: [""],
        deptCode: [""],
        departmentHead: [""],
        remarks:[""],
        deptStatus:["true"]
      });
    }else{
      this.fetchDetails(this.docForm.value.deptCode);
    }

  }

  validateDepartment(event){
    this.httpService.get<any>(this.departmentMasterService.validateDepartment+ "?tableName=" +"department"+"&columnName="+"dept_name"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['departmentName'].setErrors({ Department: true });
      }else{
        this.docForm.controls['departmentName'].setErrors(null);
      }
    });
  }

  
  keyPressText(event: any) {
    const pattern = /^[A -Za-z]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  private _filterForUser(value) {
   if(value!=null && value!="" && value!=undefined){
    const filterValue = value.toLowerCase();
  
    return this.userList.filter(obj => obj.text.toLowerCase().includes(filterValue));
   }
   
  }
  
   getUser(custId) {
    var value;
    if(custId!="" && custId!=null){
      this.userList.forEach(element => {
        if(element.id===custId){
          value =  element.text;
        }
      });
    }
    
    return value;
  }
  
  getUserId(userId) {
    var id;
    this.userList.forEach(element => {
      if(element.id===userId){
        id = element.id;
      }
    });
    return id;
  }
  
  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    var userValue = this.getUserId(control.value);
    if(userValue===control.value){
      return null;
    }
    else {
      return { requireMatch: true };
    }
  }


}
