import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { CompanyDepartmentService } from '../company-department.service';

@Component({
  selector: 'app-add-company-department',
  templateUrl: './add-company-department.component.html',
  styleUrls: ['./add-company-department.component.sass']
})
export class AddCompanyDepartmentComponent implements OnInit {

  docForm: FormGroup;
  constructor( private fb: FormBuilder,
    private commonService: CommonService,
    public companyDepartmentService: CompanyDepartmentService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router) { }

  ngOnInit(): void {
    this.docForm = this.fb.group({
      code: [""],
      description: [""],
      sorting: [""]  
    });
  }
  save(){
    
  }
  
  cancel(){
    this.router.navigate(['/crew/application-properties/company-department/list-company-department']);
  }

}
