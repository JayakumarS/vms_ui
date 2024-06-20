import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CurrencyMasterService } from '../currency-master.service';

@Component({
  selector: 'app-view-currency-master',
  templateUrl: './view-currency-master.component.html',
  styleUrls: ['./view-currency-master.component.sass']
})
export class ViewCurrencyMasterComponent implements OnInit {
  docForm:FormGroup;
  currencydtls:any=[];

  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private fb: FormBuilder,
    private currencyService: CurrencyMasterService
  ) { 
    this.docForm=this.fb.group({
      code:[""],
      name:[""],
      fromcurren:[""],
      tocurren:[""],
      dvalue:[""],
      fractpart:[""]

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
    this.httpService.get<any>(this.currencyService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.currencydtls = data.currencyBean;
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.router.navigate(['/crew/currency-master/list-currency-master']);

  }

}
