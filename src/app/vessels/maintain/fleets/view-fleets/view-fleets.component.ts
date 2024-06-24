import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { FleetsService } from '../fleets.service';

@Component({
  selector: 'app-view-fleets',
  templateUrl: './view-fleets.component.html',
  styleUrls: ['./view-fleets.component.sass']
})
export class ViewFleetsComponent implements OnInit {

  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public fleetsService : FleetsService
  ) { 
    this.docForm = this.fb.group({
  
          code:[""],
          description:[""],
          fleetid:[""]
        })
      
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      // this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.fetchDetails(this.decryptRequestId) ;
      }
     });
  }

  fetchDetails(id){
    this.httpService.get<any>(this.fleetsService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list;
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/vessels/maintain/fleets/list-fleets/']);
  }

}
