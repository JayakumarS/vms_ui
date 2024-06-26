import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { LanguagesService } from '../languages.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteLanguagesComponent } from '../list-languages/delete-languages/delete-languages.component';

@Component({
  selector: 'app-view-languages',
  templateUrl: './view-languages.component.html',
  styleUrls: ['./view-languages.component.sass']
})
export class ViewLanguagesComponent implements OnInit {

  
  docForm:FormGroup;
  viewDtl:any=[];
  constructor(public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,  public dialogRef: MatDialogRef<DeleteLanguagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public languagesService: LanguagesService,
  ) { 
    this.docForm = this.fb.group({
         languageid:[""],
          code:[""],
          description:[""],
    });

  }

  ngOnInit(): void {
    this.fetchDetails(this.data);
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchDetails(id){
    this.httpService.get<any>(this.languagesService.editlanguage+"?id="+id).subscribe({next: (data: any) => {  this.viewDtl = data.languagesBean;
      this.viewDtl = data.list[0];
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/crew/maintain/language/list-language/']);
  }

}
