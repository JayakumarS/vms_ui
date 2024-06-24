import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ReligionService } from '../religion.service';

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
    private religionService : ReligionService
  ) {
    this.docForm=this.fb.group({
      code:[""],
      name:[""]
    
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){ 
        this.fetchDetails(params.id) ;
      }
     });
  }

  fetchDetails(id){
    this.httpService.get<any>(this.religionService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.religiondtls = data.religionBean;
      }, error: (err) => console.log(err)
     });
  }
  onCancel(){
    this.router.navigate(['/crew/maintain/religion/list-religion']);
  }

}
