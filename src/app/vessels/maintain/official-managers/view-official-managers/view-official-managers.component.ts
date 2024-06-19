
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { OfficialManagersService } from '../official-managers.service';

@Component({
  selector: 'app-view-official-managers',
  templateUrl: './view-official-managers.component.html',
  styleUrls: ['./view-official-managers.component.sass']
})
export class ViewOfficialManagersComponent implements OnInit {
  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  officialManagersBeanDtls:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public officialManagersService : OfficialManagersService
  ) { 
    this.docForm = this.fb.group({
      officialManagersBeanDtls: this.fb.array([
        this.fb.group({
          sort : 1,
          select: [""],
          code: [""],
          description: [""],
          city: [""],
          address: [""],
          poscode: [""],
          phone: [""],
          // remarks: [""],
          // blogo: [""],
          // plogo: [""]
        })
      ]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      // this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.fetchDetails(this.decryptRequestId) ;
      }
     });
  }

  fetchDetails(id){
    this.httpService.get<any>(this.officialManagersService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.officialManagersBeanDtls = data.list;
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/vessels/maintain/official-managers/list-official-managers']);
  }

}
