import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteMedicalsComponent } from '../list-medicals/delete-medicals/delete-medicals.component';
import { MedicalsService } from '../medicals.service';

@Component({
  selector: 'app-view-medicals',
  templateUrl: './view-medicals.component.html',
  styleUrls: ['./view-medicals.component.sass']
})
export class ViewMedicalsComponent implements OnInit {
  docForm:FormGroup;
  viewDtl:any=[];
  constructor(public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,  public dialogRef: MatDialogRef<DeleteMedicalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public medicalsService:MedicalsService ,
  ) { 
    this.docForm = this.fb.group({
          medicalId:[""],
          mcode:[""],
          mdescription:[""],
    });

  }

  ngOnInit(): void {
    this.fetchDetails(this.data);
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchDetails(id){
    this.httpService.get<any>(this.medicalsService.editmed+"?id="+id).subscribe({next: (data: any) => {  this.viewDtl = data.languagesBean;
      this.viewDtl = data.list[0];
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/crew/maintain/Medicals/list-Medicals/']);
  }

}
