import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InterviewSetupService } from '../interview-setup.service';

@Component({
  selector: 'app-view-interview-setup',
  templateUrl: './view-interview-setup.component.html',
  styleUrls: ['./view-interview-setup.component.sass']
})
export class ViewInterviewSetupComponent implements OnInit {

  docForm:FormGroup;
  interviewdtls:any=[];

  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    private interviewSetupService : InterviewSetupService
  ) {
    this.docForm=this.fb.group({
      rank:[""],
      description:[""]
     
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){ 
        this.fetchDetails(params.id) ;
      }
     });
  }

  fetchDetails(id){
    this.httpService.get<any>(this.interviewSetupService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.interviewdtls = data.interviewSetupBean;
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/crew/maintain/interview-setup/list-interview']);
  }

}
