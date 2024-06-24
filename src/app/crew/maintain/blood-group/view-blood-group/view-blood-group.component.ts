import { Component, OnInit } from '@angular/core';
import { BloodGroupService } from '../blood-group.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Component({
  selector: 'app-view-blood-group',
  templateUrl: './view-blood-group.component.html',
  styleUrls: ['./view-blood-group.component.sass']
})
export class ViewBloodGroupComponent implements OnInit {

  docForm:FormGroup;
  bloodGroupdtls:any=[];

  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    private bloodGroupService : BloodGroupService
  ) {
    this.docForm=this.fb.group({
      bloodGroupCode:[""],
      name:[""]
     
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
    this.httpService.get<any>(this.bloodGroupService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.bloodGroupdtls = data.bloodGroupBean;
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/crew/maintain/blood-group/list-blood-group']);
  }

}
