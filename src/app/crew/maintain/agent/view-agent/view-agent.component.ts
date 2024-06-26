import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { AgentService } from '../agent.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteAgentComponent } from '../list-agent/delete-agent/delete-agent.component';

@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.sass']
})
export class ViewAgentComponent implements OnInit {

  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];

  constructor(
  public router:Router,
  public route:ActivatedRoute, 
  private httpService: HttpServiceService,
  private fb: FormBuilder,public dialogRef: MatDialogRef<DeleteAgentComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public agentService: AgentService,
) { 
  this.docForm = this.fb.group({

        code:[""],
        description:[""],
        agentid:[""],
      })
    
}

ngOnInit(): void {
  this.fetchDetails(this.data);

}
onNoClick(): void {
this.dialogRef.close();
}
fetchDetails(id){
  this.httpService.get<any>(this.agentService.edit+"?id="+id).subscribe({next: (data: any) => {
    this.viewDtl = data.list[0];
    }, error: (err) => console.log(err)
   });
}
onCancel(){
  this.router.navigate(['/crew/maintain/agent/list-agent/']);
}

}

