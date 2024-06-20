import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MaintainRankService } from '../maintain-rank.service';
@Component({
  selector: 'app-view-maintain-rank',
  templateUrl: './view-maintain-rank.component.html',
  styleUrls: ['./view-maintain-rank.component.sass']
})
export class ViewMaintainRankComponent implements OnInit {
  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public MaintainRankService : MaintainRankService
  ) { 
    this.docForm = this.fb.group({
      maintainRankBeanDtls: this.fb.array([
        this.fb.group({
      select: [""],
      code: [""],
      description: [""],
      groupage: [""],
      oAndt: [""],
      department: [""],
      sno:[""],
      remarks:[""],
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
    this.httpService.get<any>(this.MaintainRankService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list;
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/crew/maintain/maintain-rank/list-maintain-rank']);

}
}
