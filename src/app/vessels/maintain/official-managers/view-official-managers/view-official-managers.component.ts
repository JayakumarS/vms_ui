
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
    private serverUrl: serverLocations,
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
          remarks: [""],
          blogofileName: [""],
          plogofileName: [""]
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
      this.officialManagersBeanDtls = data.list[0];
      this.docForm.patchValue({
        'files' :data.files,
   }
  
      )

      }, error: (err) => console.log(err)
     });
  }
  downloadblogo(filename){
 
    const fileURL = this.serverUrl.apiServerAddress+"file_upload/"+filename;
 
    const a = document.createElement('a');
    a.href = this.serverUrl.apiServerAddress+"file_upload/"+filename;
 

// a.href = fileURL;
a.download = filename;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
}
downloadplogo(filename){
 
  const fileURL = this.serverUrl.apiServerAddress+"file_upload/"+filename;

  const a = document.createElement('a');
  a.href = this.serverUrl.apiServerAddress+"file_upload/"+filename;


// a.href = fileURL;
a.download = filename;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
}

  onCancel(){
    this.router.navigate(['/vessels/maintain/official-managers/list-official-managers']);
  }

}
