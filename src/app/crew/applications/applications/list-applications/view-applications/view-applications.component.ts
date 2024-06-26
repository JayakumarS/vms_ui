import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { ApplicationsService } from '../../applications.service';
@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.sass']
})
export class ViewApplicationsComponent implements OnInit {
  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any;
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,  private serverUrl: serverLocations,
    private fb: FormBuilder,
    public ApplicationsService : ApplicationsService
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
    this.httpService.get<any>(this.ApplicationsService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list[0];
      console.log(this.viewDtl);
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/crew/applications/applications/list-applications']);

}
downloadapplicantimageFileName(filename){
 
  const fileURL = this.serverUrl.apiServerAddress+"file_upload/"+filename;
 
  const a = document.createElement('a');
  a.href = this.serverUrl.apiServerAddress+"file_upload/"+filename;


// a.href = fileURL;
a.download = filename;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
}
downloadcvOperations(filename){
 
    const fileURL = this.serverUrl.apiServerAddress+"file_upload/"+filename;
 
    const a = document.createElement('a');
    a.href = this.serverUrl.apiServerAddress+"file_upload/"+filename;
 

// a.href = fileURL;
a.download = filename;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
}
downloadpassBookfileName(filename){
 
  const fileURL = this.serverUrl.apiServerAddress+"file_upload/"+filename;

  const a = document.createElement('a');
  a.href = this.serverUrl.apiServerAddress+"file_upload/"+filename;


// a.href = fileURL;
a.download = filename;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
}

downloadsBookfileName(filename){
 
  const fileURL = this.serverUrl.apiServerAddress+"file_upload/"+filename;

  const a = document.createElement('a');
  a.href = this.serverUrl.apiServerAddress+"file_upload/"+filename;


// a.href = fileURL;
a.download = filename;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
}

}
