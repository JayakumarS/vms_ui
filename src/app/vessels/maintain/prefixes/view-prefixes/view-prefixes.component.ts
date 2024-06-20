import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { VesselTypesService } from '../../vessel-types/vessel-types.service';
import { PrefixesService } from '../prefixes.service';

@Component({
  selector: 'app-view-prefixes',
  templateUrl: './view-prefixes.component.html',
  styleUrls: ['./view-prefixes.component.sass']
})
export class ViewPrefixesComponent implements OnInit {

  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public prefixesService : PrefixesService
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
    this.httpService.get<any>(this.prefixesService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list;
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/vessels/maintain/prefixes/list-prefixes']);
  }

}
