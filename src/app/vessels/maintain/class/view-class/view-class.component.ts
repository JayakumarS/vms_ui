import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { ClassService } from '../class.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteClassComponent } from '../list-class/delete-class/delete-class.component';

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.sass']
})
export class ViewClassComponent implements OnInit {

  requestId:any;
  docForm:FormGroup;
  decryptRequestId:any;
  viewDtl:any=[];
  constructor(public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DeleteClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public classService: ClassService,
  ) { 

    this.docForm = this.fb.group({
  
          code:[""],
          description:[""],
          classid:[""],
        })
      
   }

   ngOnInit(): void {

 this.fetchDetails(this.data) ;
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  fetchDetails(id){
    this.httpService.get<any>(this.classService.editclass+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.list[0];
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/vessels/maintain/class/list-class']);
  }

}
