import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { WageScalesService } from '../wage-scales.service';
import { wagescale } from '../wage-scale.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteWageScalesComponent } from '../list-wage-scales/delete-wage-scales/delete-wage-scales.component';

@Component({
  selector: 'app-view-wage-scales',
  templateUrl: './view-wage-scales.component.html',
  styleUrls: ['./view-wage-scales.component.sass']
})
export class ViewWageScalesComponent implements OnInit {

  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,public dialogRef: MatDialogRef<DeleteWageScalesComponent>,
    public wageScalesService: WageScalesService,  @Inject(MAT_DIALOG_DATA) public data: any

  ) { 
    this.docForm = this.fb.group({
  
          code:[""],
          description:[""],
          wagescaleid:[""]
        })
   
  }

  ngOnInit(): void {

       this.fetchDetails(this.data) ;
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchDetails(id){
    this.httpService.get<any>(this.wageScalesService.editwage+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list[0];
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/vessels/maintain/wage-scale/list-wageScale/']);
  }

}
