import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InterviewSetupService } from '../interview-setup.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-interview-setup',
  templateUrl: './view-interview-setup.component.html',
  styleUrls: ['./view-interview-setup.component.sass']
})
export class ViewInterviewSetupComponent implements OnInit {

  docForm:FormGroup;
  interviewdtls:any=[];
  interviewhdrs:any=[];

  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    private interviewSetupService : InterviewSetupService,
    public dialogRef: MatDialogRef<ViewInterviewSetupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.docForm=this.fb.group({
      rank:[""],
      description:[""]
    })
   }

   onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
       this.fetchDetails(this.data);
     
  }



  fetchDetails(id){
    this.httpService.get<any>(this.interviewSetupService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.interviewdtls = data.list[0];
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/crew/maintain/blood-group/list-blood-group']);
  }

}
