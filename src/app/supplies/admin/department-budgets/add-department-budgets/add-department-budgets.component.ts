import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-department-budgets',
  templateUrl: './add-department-budgets.component.html',
  styleUrls: ['./add-department-budgets.component.sass']
})
export class AddDepartmentBudgetsComponent implements OnInit {

  docForm:FormGroup;
  departmentList:any=[];
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    public dialog: MatDialog
  ) { 
    this.docForm = this.fb.group({
      department:[""],
      desc:[""],
      alert:[""]
    });
  }

  ngOnInit(): void {
    this.departmentList = [{id:1,text:"AGENCY FEES"},{id:2,text:"BILAGE WATER"},{id:3,text:"CHARTS & PUB"},{id:4,text:"CLAIM FILE"}];
  }

  save(){}

  cancel(){
    this.router.navigate(['/supplies/admin/department-budgets/list-department-budgets']);
  }

}
