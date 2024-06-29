import { Component, Inject, OnInit } from '@angular/core';
import { BloodGroupService } from '../blood-group.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-blood-group',
  templateUrl: './view-blood-group.component.html',
  styleUrls: ['./view-blood-group.component.sass']
})
export class ViewBloodGroupComponent implements OnInit {

  docForm:FormGroup;
  bloodGroupdtls:any=[];

  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    private bloodGroupService : BloodGroupService,
    public dialogRef: MatDialogRef<ViewBloodGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.docForm=this.fb.group({
      bloodGroupdtls: this.fb.array([
        this.fb.group({
          sort : 1,
          select:[""],
          bloodGroupCode:[""],
          name:[""]
        })
      ]),  
    })
   }

   onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
       this.fetchDetails(this.data);
     
  }



  fetchDetails(id){
    this.httpService.get<any>(this.bloodGroupService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.bloodGroupdtls = data.list[0];
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/crew/maintain/blood-group/list-blood-group']);
  }

}
