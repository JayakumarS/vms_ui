import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CountryMaster } from '../country-master.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import {HttpErrorResponse} from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { CountryMasterService } from '../country-master.service';

@Component({
  selector: 'app-view-country-master',
  templateUrl: './view-country-master.component.html',
  styleUrls: ['./view-country-master.component.sass']
})
export class ViewCountryMasterComponent implements OnInit {
  [x: string]: any;

  docForm: FormGroup;
  countryMaster: CountryMaster;
  currencyList:[];
  countryDetailItemList:[];
  requestId: any;
  edit:boolean=false;

  constructor(private fb: FormBuilder,
    public router:Router,
    private snackBar: MatSnackBar,
    public countryMasterService: CountryMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService) { 

    this.docForm = this.fb.group({
      countryCode: ["", [Validators.required]],
      countryName: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      clientType:[""],
      isActive:[""],
    });

  }
  
   ngOnInit() {
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
   }

  // fetchDetails(countryCode: any): void {
  //   this.httpService.get(this.countryMasterService.editCountryMaster + "?countryMaster="+encodeURIComponent(this.encryptionService.encryptAesToString(countryCode, this.serverUrl.secretKey).toString())).subscribe((res: any) => {
  //     console.log(countryCode);

  //     console.log(this.docForm);
  //     this.countryMaster = res.countryMasterBean;
  //   },
  //     (err: HttpErrorResponse) => {
  //     }
  //   );
   
  // }

  fetchDetails(countryCode: any): void {
    this.httpService.get(this.countryMasterService.viewCountryMaster + "?countryMaster="+encodeURIComponent(this.encryptionService.encryptAesToString(countryCode, this.serverUrl.secretKey).toString())).subscribe((res: any) => {
      // console.log(countryCode);

      // console.log(this.docForm);
      this.countryMaster = res.viewCountryMasterBean;
    },
      (err: HttpErrorResponse) => {
      }
    );
   
  }
  
 
  onCancel(){
    this.router.navigate(['/master/country-Master/list-CountryMaster']);
  }
}

