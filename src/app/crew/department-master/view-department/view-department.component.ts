import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DepartmentMasterService } from '../department-master.service';


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
    private deptService: DepartmentMasterService
  ) {
    this.docForm=this.fb.group({
      code:[""],
      name:[""],
      head:[""],
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){ 
        this.fetchDetails(params.id) ;
      }
     });
  }

  fetchDetails(id){
    this.httpService.get<any>(this.deptService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.deptdtls = data.departmentBean;
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/crew/department-master/list-department']);
  }

}
