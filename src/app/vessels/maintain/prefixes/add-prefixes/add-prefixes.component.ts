import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { VesselTypesService } from '../../vessel-types/vessel-types.service';
import { PrefixesService } from '../prefixes.service';

@Component({
  selector: 'app-add-prefixes',
  templateUrl: './add-prefixes.component.html',
  styleUrls: ['./add-prefixes.component.sass']
})
export class AddPrefixesComponent implements OnInit {
  docForm: FormGroup;
  edit:boolean=false;
  decryptRequestId:any;
  requestId: any;

  constructor(
    private formbuilder: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public prefixesService: PrefixesService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar,
    public matError : MatErrorService
  ) { 
    this.docForm = this.formbuilder.group({
    
          vesselprefixid:[""],
          code: ["", Validators.required],
          description: ["", Validators.required]
      
    });
    
  }
    

  ngOnInit() {
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
     this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       this.fetchDetails(this.decryptRequestId) ;
     }
    });
   }

  fetchDetails(id){
    this.httpService.get<any>(this.prefixesService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.docForm.patchValue({
        'code': data.list[0].code,
        'description': data.list[0].description,
        'vesselprefixid': data.list[0].vesselprefixid
      });

    }
  });
  }



  get rowDtls() {
    return this.docForm.get('firstDetailRow') as FormArray;
  }

  getControl(index: number,name:any) {
    return this.rowDtls.at(index).get([name]);
  }

  addRow() {
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.formbuilder.group({
      select: [""],
      code: ["", Validators.required],
      description: ["", Validators.required]
    })
    firstDetailRow.insert(arraylen, newUsergroup);
  }

  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.firstDetailRow as FormArray;
    let i = 0;
    
    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if(count == 0){
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }
  }

  save(){
    if(this.docForm.valid){
      this.prefixesService.saveVesselPrefix(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }

  update() {

    if(this.docForm.valid){
      this.prefixesService.updateVesselPrefix(this.docForm.value, this.router, this.notificationService);
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
    this.router.navigate(['/vessels/maintain/prefixes/list-prefixes']);

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: [colorName, 'snackbar-text'],
      data: {
        html: true
      }
    });
  }

}
