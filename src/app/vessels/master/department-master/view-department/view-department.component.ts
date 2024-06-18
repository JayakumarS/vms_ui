import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { DepartmentMaster } from '../department-master.model';
import { DepartmentMasterService } from '../department-master.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.sass']
})
export class ViewDepartmentComponent implements OnInit {
  docForm: FormGroup;
  departmentMaster: DepartmentMaster;
  edit:boolean=false;

  // For Encrypt and Decrypt
  decryptRequestId: any;
  requestId: any;


  constructor(private fb: FormBuilder,
    private departmentMasterService : DepartmentMasterService,
    private httpService: HttpServiceService,
    private router:Router,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService
    ) { 

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      departmentName: ["", [Validators.required]],
      deptCode: [""],
      departmentHead: ["", [Validators.required]],
      remarks:[""],
      isActive:["t"]
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
  }

  

  fetchDetails(deptCode: any): void {
    this.httpService.get(this.departmentMasterService.editDepartment+"?departmentMaster="+encodeURIComponent(this.encryptionService.encryptAesToString(deptCode, this.serverUrl.secretKey).toString())).subscribe((res: any)=> {
      // console.log(deptCode);

      // console.log(this.docForm);
      this.departmentMaster = res.departmentMasterBean;
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
   
  }

 

  onCancel(){
    this.router.navigate(['/master/department-Master/list-department']);
  
  }
  

}
