import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { LanguagesService } from '../languages.service';

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
    private fb: FormBuilder,
    public languagesService: LanguagesService,
  ) { 
    this.docForm = this.fb.group({
          select:[""],
          code:[""],
          description:[""],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){ 
        this.fetchDetails(params.id) ;
      }
     });
  }

  fetchDetails(id){
    this.httpService.get<any>(this.languagesService.editlanguage+"?id="+id).subscribe({next: (data: any) => {
      this.viewDtl = data.languagesBean;
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/crew/maintain/language/list-language/']);
  }

}
