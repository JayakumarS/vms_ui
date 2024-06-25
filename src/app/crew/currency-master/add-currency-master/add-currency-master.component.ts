import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { CurrencyMasterService } from '../currency-master.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';

@Component({
  selector: 'app-add-currency-master',
  templateUrl: './add-currency-master.component.html',
  styleUrls: ['./add-currency-master.component.sass']
})
export class AddCurrencyMasterComponent implements OnInit {
  docForm:FormGroup;
  decryptRequestId: any;
  requestId: any;
  edit:boolean=false;

  constructor(
    public router:Router,
    private formbuilder:FormBuilder,
    private notificationService: NotificationService,
    private currencyMasterService: CurrencyMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar,
    public matError : MatErrorService
  ) {
    this.docForm=this.formbuilder.group({
      code:["",Validators.required],
      name:["",Validators.required],
      fromcurren:["",Validators.required],
      tocurren:["",Validators.required],
      dvalue:["",Validators.required],
      fractpart:["",Validators.required],
      active:[true],
      currency:[""],
      currencyId:[""]

    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){ 
       // this.decryptRequestId = params.id;
       this.requestId = params.id;
        this.edit=true;
        this.fetchDetails(this.requestId);
      }
     });
  }

  fetchDetails(id: any) {

    this.httpService.get(this.currencyMasterService.editUrl + "?id=" +id ).subscribe((res: any) => {
      console.log(res);
      if(res.currencyBean.currency =='Y'){
        this.docForm.patchValue({'currency':true})
      }
      else{
        this.docForm.patchValue({'currency':false})
      }

      if(res.currencyBean.active =='Y'){
        this.docForm.patchValue({'active':true})
      }
      else{
        this.docForm.patchValue({'active':false})
      }
  
      this.docForm.patchValue({
        'code': res.currencyBean.code,
        'name': res.currencyBean.name,
        'fromcurren':res.currencyBean.fromcurren,
        'tocurren':res.currencyBean.tocurren,
        'dvalue':res.currencyBean.dvalue,
        'fractpart':res.currencyBean.fractpart,
        // 'active':res.currencyBean.active,
        // 'currency':res.currencyBean.currency

        });
    });
  }
  save(){
    if(this.docForm.valid){
      this.currencyMasterService.saveCurrency(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }
  cancel(){
    this.router.navigate(['/crew/currency-master/list-currency-master']);
    
  }


update(){
  this.docForm.value.currencyId = this.requestId;
  if(this.docForm.valid){
    this.currencyMasterService.updateCurrency(this.docForm.value, this.router, this.notificationService);
  }else{
    this.matError.markFormGroupTouched(this.docForm);
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right");
  }
}

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }



}
