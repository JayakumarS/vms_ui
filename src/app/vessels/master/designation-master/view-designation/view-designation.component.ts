import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DesignationMaster } from '../designation-master.model';
import { DesignationMasterService } from '../designation-master.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';


@Component({
  selector: 'app-view-designation',
  templateUrl: './view-designation.component.html',
  styleUrls: ['./view-designation.component.sass']
})

export class ViewDesignationComponent implements OnInit {
  docForm: FormGroup;
  designationMaster : DesignationMaster;
  decryptRequestId: any;
  requestId: any;
  edit:boolean=false;

  constructor(private fb: FormBuilder,
    private designationMasterService : DesignationMasterService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService
    ) { 

      this.docForm = this.fb.group({
        // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
        designationName: ["", [Validators.required]],
        desgnCode: [""],
        remarks:[""],
        active:[""]
      });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
  }

  fetchDetails(desgnCode: any): void {
    this.httpService.get(this.designationMasterService.editDesignationMaster+"?designationMaster="+encodeURIComponent(this.encryptionService.encryptAesToString(desgnCode, this.serverUrl.secretKey).toString())).subscribe((res: any)=> {
      // console.log(desgnCode);
      // console.log(this.docForm);
      this.designationMaster = res.designationMasterBean;

      },
      (err: HttpErrorResponse) => {
      }
    );

  }

  onCancel(){
    this.router.navigate(['/master/designation-Master/list-designation']);
  }
}
