import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { agent } from '../agent.model';
import { AgentService } from '../agent.service';
import { MatErrorService } from 'src/app/core/service/mat-error.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.sass']
})
export class AddAgentComponent implements OnInit {

  docForm: FormGroup;
  agent: agent;
  edit:boolean=false;
  requestId: any;
  decryptRequestId: any;
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public agentService: AgentService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,public matError : MatErrorService,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar){


      this.docForm = this.fb.group({
  
            
            code:["", Validators.required],
            description:["", Validators.required],
            agentid:[""],
          })
       
    } 

 

  ngOnInit(): void {

    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.decryptRequestId) ;

      }
     });
  }

  addRow(){
    let AgentDetailsDtlArray=this.docForm.controls.agentDetails as FormArray;
    let arraylen=AgentDetailsDtlArray.length;
    var len = this.docForm.controls["agentDetails"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      sort : 1 + len,
      select: [""],
      code:[""],
      description:[""],
      
    })
    AgentDetailsDtlArray.insert(arraylen,newUsergroup);
  }


  cancel(){
    this.router.navigate(['/crew/maintain/agent/list-agent/']);
  }


  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.agentDetails as FormArray;
    let i = 0;
    
    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if(count == 0){
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }
  }
  

  fetchDetails(id: any): void {
    this.httpService.get<any>(this.agentService.edit+"?id="+id).subscribe({next: (data: any) => {
      this.docForm.patchValue({
        'code': data.list[0].code,
        'description': data.list[0].description,
        'agentid': data.list[0].agentid,
      });
      // this.docForm.get('code').disable();

    }
  });

  }
  save(){
    
    if(this.docForm.valid){
    this.agentService.save(this.docForm.value, this.router, this.notificationService);
  }else{
    this.matError.markFormGroupTouched(this.docForm);
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right");
  }
  }
  update() {

    if(this.docForm.valid){
      this.agentService.update(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }
  reset(){
    if(!this.edit){
      this.docForm = this.fb.group({
       
            code:[""],
            description:[""],
            
          })
        
    }else{
      this.fetchDetails(this.docForm.value.countryCode);
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
