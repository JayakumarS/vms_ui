import { Component, Inject, OnInit } from '@angular/core';
import { IceClassService } from '../ice-class.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Component({
  selector: 'app-view-ice-class',
  templateUrl: './view-ice-class.component.html',
  styleUrls: ['./view-ice-class.component.sass']
})
export class ViewIceClassComponent implements OnInit {
  docForm: FormGroup;
  iceClassdtls:any=[];

  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    private iceservice: IceClassService,
    public dialogRef:  MatDialogRef<ViewIceClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.docForm=this.fb.group({
      code:[""],
      desc:[""],
    })
  }

  ngOnInit(): void {
    this.fetchDetails(this.data);
  }

  fetchDetails(id){
    this.httpService.get<any>(this.iceservice.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.iceClassdtls = data.iceClassBean;
      }, error: (err) => console.log(err)
     });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }



}
