
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { RankShiftService } from '../rank-shift.service';

@Component({
  selector: 'app-view-rank-shift',
  templateUrl: './view-rank-shift.component.html',
  styleUrls: ['./view-rank-shift.component.sass']
})
export class ViewRankShiftComponent implements OnInit {
  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  secondDetailRow:[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public RankShiftService : RankShiftService
  ) { 
    this.docForm = this.fb.group({
      sort : 1,
      select: [""],
      rankshiftid:[""],
      vessel: [""],
      rankcode: [""],
      sDate: [""],
      sDateObj: [""],
      eDate: [""],
      eDateObj: [""],
      remarks: [""],
      watchkeepers:[""],
      validToObj: [""],
 

  secondDetailRow: this.fb.array([
    this.fb.group({
      select: [""],
      shiftStart: [""],
      shiftEnd: [""],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:[""]
    })
  ])
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
    this.httpService.get<any>(this.RankShiftService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list[0];
      this.secondDetailRow = data.tables

      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/crew/application-properties/define-preferences-for-working-hours/define-rank-shift/list-define-rank-shift']);
  }

}
