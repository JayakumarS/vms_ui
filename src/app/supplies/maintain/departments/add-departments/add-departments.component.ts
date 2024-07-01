import { Component,  Inject,  OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartmentsPopUpComponent } from '../departments-pop-up/departments-pop-up.component';
import { DepartmentsPopupComponent } from '../departments-popup/departments-popup.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DepartmentsService } from '../departments.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';



@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrls: ['./add-departments.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
      },
  } },CommonService
  ]
})
export class AddDepartmentsComponent extends UnsubscribeOnDestroyAdapter  implements OnInit {

  docForm: FormGroup;
  formTypeList:any=[];
  isHovered = false;
  firstDetailRow: any;
  edit:boolean=false;
  
  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private httpService: HttpServiceService,
    private departmentsService: DepartmentsService,
    private notificationService: NotificationService
  ) { 
    super();
      this.docForm = this.fb.group({
        select: [""],
        code: [""],
        depCode:[""],
        department: [""],
        formType: [""],
        decimals: [""],
        itemsToOrderComments: [""],
        itemsNotToOrderComments: [""],
        availableOffice: new FormControl(false),
        availableVessel:new FormControl(false),
        officeUndefinedItemS: new FormControl(false),
        vesselUndefinedItemS:new FormControl(false),
        proposedItems:new FormControl(false),
        officeUndefinedItemsL: new FormControl(false),
        vesselUndefinedItemsL:new FormControl(false),
        combinedControl: new FormControl(false),  
        lscInvoiceDateObj: [""],
        lscInvoiceDate: [""],
        vesselOrders: new FormControl(false),
        tolerance: [""],
        minimumItems: [""],
        toggleLockValue: new FormControl(false)
      });
    }

  ngOnInit(): void {
    this.formTypeList = [{id:1,text:"Lubricants"},{id:2,text:"Provision/Stores"},{id:3,text:"Spares"}];

    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ 
      this.edit=true;
      this.fetchDetails(params.id) ;
     }
    });

    this.generateCode();
  }

  generateCode(){
    if(!this.edit){
      this.httpService.get(this.departmentsService.generateCodeUrl).subscribe({next: (res: any) => {
        console.log(res);
          this.docForm.patchValue({
            'code':res.code
          })
      }, error: (err) => console.log(err)
    });
    }
  }

  fetchDetails(id){
    this.httpService.get<any>(this.departmentsService.editUrl+"?id="+id).subscribe({next: (res: any) => {
      let invDate = this.commonService.getDateObj(res.departmentDtls.lscInvoiceDate == null ? "" : res.departmentDtls.lscInvoiceDate);

      this.docForm.patchValue({
        'depCode':res.departmentDtls.depCode,
        'code':id,
        'department':res.departmentDtls.department,
        'formType':res.departmentDtls.formType,
        'itemsToOrderComments':res.departmentDtls.itemsToOrderComments,
        'itemsNotToOrderComments':res.departmentDtls.itemsNotToOrderComments,
        'tolerance':res.departmentDtls.tolerance,
        'minimumItems':res.departmentDtls.minimumItems,
        'lscInvoiceDateObj':invDate,
        'lscInvoiceDate':res.departmentDtls.lscInvoiceDate,
        'availableOffice':res.departmentDtls.availableOffice,
        'availableVessel':res.departmentDtls.availableVessel,
        'officeUndefinedItemS':res.departmentDtls.officeUndefinedItemS,
        'vesselUndefinedItemS':res.departmentDtls.vesselUndefinedItemS,
        'proposedItems':res.departmentDtls.proposedItems
      })
      }, error: (err) => console.log(err)
     });
  }

  getDateString(event,id){
    let cdate = this.commonService.getDate(event.target.value);

    if(id == 'lscInvoiceDate'){
     this.docForm.patchValue({lscInvoiceDate : cdate});
    }
  }

  save(){
    if(this.docForm.valid){
      this.docForm.value.depCode = this.docForm.value.depCode.toUpperCase();
      this.departmentsService.save(this.docForm.value, this.router, this.notificationService);
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right"
      );
    }
  }

  update(){
    if(this.docForm.valid){
      this.departmentsService.update(this.docForm.value, this.router, this.notificationService);
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill the required details",
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

  cancel(){
    this.router.navigate(['/supplies/maintain/departments/list-departments']);
  }

 keyPressNumberDouble(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 

  onMouseOver() {
    this.isHovered = true;
  }

  onMouseOut() {
    this.isHovered = false;
  }



  openCommentsPopUp(){
    let tempDirection;
    const dialogRef = this.dialog.open(DepartmentsPopUpComponent, {
      data: "",
      height:"30%",
      width: "30%",
      direction: tempDirection,
    });  

    this.subs.sink = dialogRef.afterClosed().subscribe((res) => {
      if(res.data != 'CANCEL'){
        this.docForm.patchValue({
          'itemsToOrderComments':res.data
        })
      }
    });
  }

  openItemsPopUp(){
    let tempDirection;
    const dialogRef = this.dialog.open(DepartmentsPopupComponent, {
      data: "",
      height:"30%",
      width: "30%",
      direction: tempDirection,
    });  

    this.subs.sink = dialogRef.afterClosed().subscribe((res) => {
      if(res.data != 'CANCEL'){

        this.docForm.patchValue({
          'itemsNotToOrderComments':res.data
        })
      }
    });
  }
 

  toggleValues(index: number) {
    const firstDetailRow = this.docForm.get('firstDetailRow') as FormArray;
    const firstDetailBean = firstDetailRow.at(index) as FormGroup;

    const currentLockValue = firstDetailBean.get('lockSupplyCaseswithinvoicedate').value;
    firstDetailBean.get('lockSupplyCaseswithinvoicedate').setValue(!currentLockValue);

    const currentVesselOrdersValue = firstDetailBean.get('vesselOrders').value;
    firstDetailBean.get('vesselOrders').setValue(!currentVesselOrdersValue);
  }




}