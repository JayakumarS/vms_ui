import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ShipManagersService } from '../ship-managers.service';
import { MatErrorService } from 'src/app/core/service/mat-error.service';

@Component({
  selector: 'app-add-ship-managers',
  templateUrl: './add-ship-managers.component.html',
  styleUrls: ['./add-ship-managers.component.sass']
})
export class AddShipManagersComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  docForm: FormGroup;
  edit:boolean=false;
  requestId: any;
  decryptRequestId: any;



  constructor(private fb: FormBuilder,
    private router: Router,
    private formbuilder: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private encryptionService: EncryptionService,
    private serverUrl: serverLocations,
    public notificationService: NotificationService,
    private cmnService: CommonService,
    private httpClient: HttpClient,
    public shipManagersService: ShipManagersService,

    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private EncrDecr: EncrDecrService,
    public matError : MatErrorService
  ) {
    super();
    this.docForm=this.formbuilder.group({
          select:[''],
          shipmanid:[""],
          shipman:['',Validators.required],
          name:['',Validators.required],
          remarks:[""],
          vatreg:[""],
          
        })
      
    
   }

   ngOnInit() {
    this.httpService.get<any>(this.shipManagersService.getSequenceCode).subscribe((res: any) => {

      
      this.docForm.patchValue({
        'shipman':res.shipman
      })
    })
    
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
     this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       this.fetchDetails(this.decryptRequestId) ;
     }
    });
   }
  save(){
    if(this.docForm.valid){
      this.shipManagersService.saveShipModel(this.docForm.value, this.router, this.notificationService);
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
    this.router.navigate(['/vessels/maintain/ship-managers/list-ship-managers']);

  }
  update() {
  
    if(this.docForm.valid){
      this.shipManagersService.updateShipModel(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }
  addRow() {
    let shipManagersBeanDtls = this.docForm.controls.shipManagersBeanDtls as FormArray;
    let arraylen = shipManagersBeanDtls.length;
    let newUsergroup: FormGroup = this.formbuilder.group({
          select:[""],
          shipman:['',Validators.required],
          name:['',Validators.required],
          remarks:[""],
          vatreg:[""]
    })
    shipManagersBeanDtls.insert(arraylen, newUsergroup);
  }
  // fetchDetails(id){
  //   this.httpService.get<any>(this.shipManagersService.editUrl+"?id="+id).subscribe({next: (data: any) => {
  //     let dtlArray = this.docForm.controls.shipManagersBeanDtls as FormArray;
  //     dtlArray.clear();
  //     data.list.forEach((element, index) => {
  //       let arraylen = dtlArray.length;
  //       let newUsergroup: FormGroup = this.fb.group({
  //         select:[""],
  //         shipman: [element.shipman],
  //         name: [element.name],
  //         remarks: [element.remarks],
  //         vatreg:[element.vatreg + ""]
  //       })
  //       dtlArray.insert(arraylen, newUsergroup);
  //       newUsergroup.get('shipman').disable();
  //     });
  //     }, error: (err) => console.log(err)
  //    });
  // }
  fetchDetails(id){
    this.httpService.get<any>(this.shipManagersService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.docForm.patchValue({
        
        'shipman': data.list[0].shipman,
        'name': data.list[0].name,
        'remarks': data.list[0].remarks,
        'vatreg': data.list[0].vatreg,
        'shipmanid': data.list[0].shipmanid

      });
     

    }
  });
  }
  reset(){
    if(!this.edit){
      this.docForm = this.fb.group({
        shipManagersBeanDtls: this.fb.array([
          this.fb.group({
            sort : 1,
            shipman:[""],
          name:[""],
          remarks:[""],
          vatreg:[""]
            
          })
        ]),
      });
    }else{
      this.fetchDetails(this.docForm.value.countryCode);
    }
  }
  removeRow() {
    let count = 0;
    const deleteRow = this.docForm.controls.shipManagersBeanDtls as FormArray;
    let i = 0;

    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if (count == 0) {
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }
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
