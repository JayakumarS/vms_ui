import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UomMasterService } from '../uom-master.service';
import { UOMMaster } from '../uom-master.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-uom',
  templateUrl: './view-uom.component.html',
  styleUrls: ['./view-uom.component.sass']
})
export class ViewUomComponent implements OnInit {

  docForm: FormGroup;
  uOMMaster: UOMMaster;
  currencyList:[];
  uomDetailItemList:any = [];
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
    public dialogRef :MatDialogRef<ViewUomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private encryptionService:EncryptionService) { 

      this.docForm = this.fb.group({
        // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
        uomCode: [""],
        uomName: [""]
     
      });
  }
  
   ngOnInit() {
    this.fetchDetails(this.data);

   }
   
  fetchDetails(id){
    this.httpService.get<any>(this.uomMasterService.editUomMaster+"?id="+id).subscribe({next: (data: any) => {
      this.uomDetailItemList = data.uomBean;
      }, error: (err) => console.log(err)
     });
  }
  
 
  onCancel(){
    this.dialogRef.close();
  }
}
