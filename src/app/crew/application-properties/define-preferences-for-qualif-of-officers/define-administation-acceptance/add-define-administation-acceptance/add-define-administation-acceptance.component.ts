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
import { DefineAdministationService } from '../define-administation.service';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { defineadministation } from '../define-administation.model';

@Component({
  selector: 'app-add-define-administation-acceptance',
  templateUrl: './add-define-administation-acceptance.component.html',
  styleUrls: ['./add-define-administation-acceptance.component.sass']
})
export class AddDefineAdministationAcceptanceComponent implements OnInit {

  public nationalityFilterCtrl: FormControl = new FormControl();
  nationalityFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('nationality', { static: true }) nationality: MatSelect;


  protected onDestroy = new Subject<void>();


  docForm: FormGroup;
  defineadministation: defineadministation;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  isChecked: boolean = false;
  ranklist: any;
  nationalitylist: any;

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
    public DefineAdministationService: DefineAdministationService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
  


      defineadministationDetails: this.fb.array([
        this.fb.group({
     
          nationality: [""],
          acceptanceCode: [""],
          acceptancedescription: [""],
        })
      ]),
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

     this.nationalitylist = [
      { id: "BANGLADESH", text: "BANGLADESH" },
      { id: "BRITISH", text: "BRITISH" },
      { id: "BELGIAN", text: "BELGIAN" },
  
    
    ];
    
    this.nationalityFilteredOptions.next(this.nationalitylist.slice());
  
  // listen for origin List  search field value changes
  this.nationalityFilterCtrl.valueChanges
  .pipe(takeUntil(this.onDestroy))
  .subscribe(() => {
    this.filteritemnationalitylist();
  });
  

}
filteritemnationalitylist(){
  if (!this.nationalitylist) {
    return;
  }
  // get the search keyword
  let search = this.nationalityFilterCtrl.value;
  if (!search) {
    this.nationalityFilteredOptions.next(this.nationalitylist.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  // filter the banks
  this.nationalityFilteredOptions.next(
    this.nationalitylist.filter(title => title.text.toLowerCase().includes(search))
  );
 }
   addRow(){
    let defineadministationDetailsDtlArray=this.docForm.controls.defineadministationDetails as FormArray;
    let arraylen=defineadministationDetailsDtlArray.length;
    var len = this.docForm.controls["defineadministationDetails"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      nationality: [""],
      acceptanceCode: [""],
      acceptancedescription: [""],
   
    })
    defineadministationDetailsDtlArray.insert(arraylen,newUsergroup);
  }

   removeRow(index){

    var value;
    let dataarray1 = this.docForm.controls.defineadministationDetails as FormArray;
    dataarray1.removeAt(index);

  }
  onSubmit(){

  }
  fetchDetails(countryCode: any): void {
   
  }
  
  update() {


  }

  onCancel(){
    this.router.navigate(['//crew/application-properties/define-preferences-for-qualif-of-officers/define-administation/list-Define-administation']);

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
        defineadministationDetails: this.fb.array([
          this.fb.group({
            nationality: [""],
            acceptanceCode: [""],
            acceptancedescription: [""],
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


