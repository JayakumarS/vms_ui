import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ReligionService } from '../religion.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-view-religion',
  templateUrl: './view-religion.component.html',
  styleUrls: ['./view-religion.component.sass']
})
export class ViewReligionComponent implements OnInit {

  docForm:FormGroup;
  religiondtls:any=[];

  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    private religionService : ReligionService,
    public dialogRef: MatDialogRef<ViewReligionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ,public notificationService:NotificationService
  ) {
    this.docForm=this.fb.group({
      religiondtls: this.fb.array([
        this.fb.group({
          sort : 1,
          select:[""],
          code:[""],
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
    this.httpService.get<any>(this.religionService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.religiondtls = data.list[0];
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/crew/maintain/religion/list-religion']);
  }

}
