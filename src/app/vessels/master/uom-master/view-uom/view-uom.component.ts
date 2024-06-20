import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UomMasterService } from '../uom-master.service';
import { UOMMaster } from '../uom-master.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';

@Component({
  selector: 'app-view-uom',
  templateUrl: './view-uom.component.html',
  styleUrls: ['./view-uom.component.sass']
})
export class ViewUomComponent implements OnInit {

  docForm: FormGroup;
  uOMMaster: UOMMaster;
  currencyList:[];
  uomDetailItemList:[];
  requestId: any;
  edit:boolean=false;

  constructor(private fb: FormBuilder,
    public router:Router,
    private snackBar: MatSnackBar,
    public uomMasterService: UomMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService) { 

      this.docForm = this.fb.group({
        // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
        uomCode: ["", [Validators.required]],
        uomName: ["", [Validators.required]]
     
      });
  }
  
   ngOnInit() {
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){
     this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
   }

  fetchDetails(portCode: any): void {
    this.httpService.get(this.uomMasterService.editUomMaster + "?id="+portCode).subscribe((res: any) => {
      // console.log(countryCode);
      this.uomDetailItemList = res.list;
    },
      (err: HttpErrorResponse) => {
      }
    );
   
  }
  
 
  onCancel(){
    this.router.navigate(['/vessels/master/uom-Master/list-uom']);
  }
}
