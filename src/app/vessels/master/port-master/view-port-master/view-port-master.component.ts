import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PortMasterService } from '../port-master.service';
import { PortMaster } from '../port-master.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';

@Component({
  selector: 'app-view-port-master',
  templateUrl: './view-port-master.component.html',
  styleUrls: ['./view-port-master.component.sass']
})
export class ViewPortMasterComponent implements OnInit {
  docForm: FormGroup;
  portMaster: PortMaster;
  currencyList:[];
  portDetailItemList:[];
  requestId: any;
  edit:boolean=false;

  constructor(private fb: FormBuilder,
    public router:Router,
    private snackBar: MatSnackBar,
    public portMasterService: PortMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService) { 

      this.docForm = this.fb.group({
        portCode: ["", [Validators.required]],
        portName: ["", [Validators.required]],
        portType: ["port"],
        isActive:[true],
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
    this.httpService.get(this.portMasterService.editPortMaster + "?id="+portCode).subscribe((res: any) => {
      // console.log(countryCode);
      this.portDetailItemList = res.list;
    },
      (err: HttpErrorResponse) => {
      }
    );
   
  }
  
 
  onCancel(){
    this.router.navigate(['/vessels/master/country-Master/list-CountryMaster']);
  }
}
