
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { ExpEngineService } from '../exp-engine.service';
@Component({
  selector: 'app-view-exp-engine',
  templateUrl: './view-exp-engine.component.html',
  styleUrls: ['./view-exp-engine.component.sass']
})
export class ViewExpEngineComponent implements OnInit {
  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public ExpEngineService : ExpEngineService
  ) { 
    this.docForm = this.fb.group({
      vesselTypeDtls: this.fb.array([
        this.fb.group({
          sort : 1,
          select:[""],
          code:[""],
          description:[""],
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
    this.httpService.get<any>(this.ExpEngineService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list;
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/crew/maintain/exp-engine/list-exp-engine']);

  }

}


