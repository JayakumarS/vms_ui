import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { VesselsParticularsService } from '../vessel-particulars.service';

@Component({
  selector: 'app-view-vessel-particulars',
  templateUrl: './view-vessel-particulars.component.html',
  styleUrls: ['./view-vessel-particulars.component.sass']
})
export class ViewVesselParticularsComponent implements OnInit {
  viewDtl:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public vesselsParticularsService: VesselsParticularsService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){
      // this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.fetchDetails(params.id) ;
      }
     });
  }

  fetchDetails(id){
    this.httpService.get<any>(this.vesselsParticularsService.editUrl+"?id="+id).subscribe({next: (res: any) => {
      this.viewDtl = res;
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/vessels/vessel-particulars/list-vessel-particulars']);
  }

}
