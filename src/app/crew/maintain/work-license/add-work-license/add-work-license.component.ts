import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { WorkLicenseService } from '../work-license.service';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { WorkLicense } from '../work-license.model';
@Component({
  selector: 'app-add-work-license',
  templateUrl: './add-work-license.component.html',
  styleUrls: ['./add-work-license.component.sass']
})
export class AddWorkLicenseComponent implements OnInit {

  
  public itemRevenueExpFilterCtrl: FormControl = new FormControl();
  itemRevenueExpFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('supplieritemRevenueExp', { static: true }) supplieritemRevenueExp: MatSelect;
 
  public onboardFilterCtrl: FormControl = new FormControl();
  onboardFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('onboard', { static: true }) onboard: MatSelect;
 
  public itemTypeFilterCtrl: FormControl = new FormControl();
  itemTypeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('itemType', { static: true }) itemType: MatSelect;
 

  public contentsFilterslistFilterCtrl: FormControl = new FormControl();
  contentsFilterslistFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('contentsFilters', { static: true }) contentsFilters: MatSelect;
 
  public quantityCalculationFilterCtrl: FormControl = new FormControl();
  quantityCalculationFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('quantityCalculation', { static: true }) quantityCalculation: MatSelect;
 

  public groupingFilterCtrl: FormControl = new FormControl();
  groupingFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('grouping', { static: true }) grouping: MatSelect;
 
  protected onDestroy = new Subject<void>();


  docForm: FormGroup;
  WorkLicense: WorkLicense;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  isChecked: boolean = false;

  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];
  itemRevenueExplist:any;
  itemTypelist:any;
  onboardlist:any;
  quantityCalculationlist:any;
  contentsFilterslist:any;
  groupinglist:any;
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public WorkLicenseService: WorkLicenseService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar,
    public matError : MatErrorService) { 


    this.docForm = this.fb.group({
  



          code: ["", Validators.required],
          description:[""],
      
      
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

    get rowDtls() {
      return this.docForm.get('workLicenseBeanDtls') as FormArray;
    }
  
    getControl(index: number,name:any) {
      return this.rowDtls.at(index).get([name]);
    }

   addRow(){
    let workLicenseBeanDtlsArray=this.docForm.controls.workLicenseBeanDtls as FormArray;
    let arraylen=workLicenseBeanDtlsArray.length;
    var len = this.docForm.controls["workLicenseBeanDtls"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      sort : 1 + len,
      select: [""],
      code: ["", Validators.required],
      description:[""],
      
    })
    workLicenseBeanDtlsArray.insert(arraylen,newUsergroup);
  }

  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.workLicenseBeanDtls as FormArray;
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

  fetchDetails(id){
    this.httpService.get<any>(this.WorkLicenseService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.docForm.patchValue({
        'code': data.list[0].code,
        'description': data.list[0].description
      });
      this.docForm.get('code').disable();

    }
  });
  }
  
  update() {

      this.docForm.get('code').enable();
    
    if(this.docForm.valid){
      this.WorkLicenseService.updateworkLicense(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }
  save(){
    if(this.docForm.valid){
      this.WorkLicenseService.saveeworkLicense(this.docForm.value, this.router, this.notificationService);
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
    this.router.navigate(['/crew/maintain/work-license/list-Work-License']);
  }

  getmastrcurr(){

  }
  
  
  getmastrcurr1(currid) {
  var value;
  var value1;
  this.currencyList.forEach(element => {
  if (element.id === currid) {
    value = element.text;
    value1 = element.id;
  }
  });
  return value;
  }

  onKey(value) {
    if (value == "") {
      this.currencyList = this.currtmpList;
    } else {
      this.currencyList = this.currtmpList;
      this.currencyList = this.search(value);
    }
  }
  
  search(value: string) {
    let filter = value.toLowerCase();
    return this.currencyList.filter(option =>
      option.item.toLowerCase().startsWith(filter)
    );
  }
  
  reset(){
    if(!this.edit){
      this.docForm = this.fb.group({
        workLicenseBeanDtls: this.fb.array([
          this.fb.group({
            sort : 1,
            code:[""],
            description:[""],
            
          })
        ]),
      });
    }else{
      this.fetchDetails(this.docForm.value.countryCode);
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
  validateCountry(event){

  }

}

