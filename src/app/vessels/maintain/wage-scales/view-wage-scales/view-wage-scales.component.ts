import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { WageScalesService } from '../wage-scales.service';

@Component({
  selector: 'app-view-wage-scales',
  templateUrl: './view-wage-scales.component.html',
  styleUrls: ['./view-wage-scales.component.sass']
})
export class ViewWageScalesComponent implements OnInit {


  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public wageScalesService: WageScalesService,
  ) { 
    this.docForm = this.fb.group({
  
      wageScaleDetails: this.fb.array([
        this.fb.group({
       
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
    this.httpService.get<any>(this.wageScalesService.editwage+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list;
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/vessels/maintain/wage-scale/list-wageScale/']);
  }

}
