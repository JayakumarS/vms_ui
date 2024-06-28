import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DepartmentMasterService } from '../department-master.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.sass']
})
export class ViewDepartmentComponent implements OnInit {
  docForm:FormGroup;
  deptdtls:any=[];

  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    private deptService: DepartmentMasterService,
    public dialogRef:  MatDialogRef<ViewDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.docForm=this.fb.group({
      code:[""],
      name:[""],
      head:[""],
    })
   }

  ngOnInit(): void {
    this.fetchDetails(this.data);
  }

  fetchDetails(id){
    this.httpService.get<any>(this.deptService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.deptdtls = data.departmentBean;
      }, error: (err) => console.log(err)
     });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
