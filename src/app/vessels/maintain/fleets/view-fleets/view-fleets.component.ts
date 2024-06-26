import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { FleetsService } from '../fleets.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteFleetsComponent } from '../list-fleets/delete-fleets/delete-fleets.component';

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
    private fb: FormBuilder, public dialogRef: MatDialogRef<DeleteFleetsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fleetsService : FleetsService
  ) { 
    this.docForm = this.fb.group({
  
          code:[""],
          description:[""],
          fleetid:[""]
        })
      
  }

  ngOnInit(): void {
    this.fetchDetails(this.data);
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchDetails(id){
    this.httpService.get<any>(this.fleetsService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list[0];
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/vessels/maintain/fleets/list-fleets/']);
  }

}
