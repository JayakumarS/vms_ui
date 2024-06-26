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
import { definequalification } from '../define-officers-qualification.model';
import { DefineQualificationService } from '../define-qualification.service';
@Component({
  selector: 'app-add-define-officers-qualification-matching',
  templateUrl: './add-define-officers-qualification-matching.component.html',
  styleUrls: ['./add-define-officers-qualification-matching.component.sass']
})
export class AddDefineOfficersQualificationMatchingComponent implements OnInit {


 
  public rankFilterCtrl: FormControl = new FormControl();
  rankFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('rank', { static: true }) rank: MatSelect;

  protected onDestroy = new Subject<void>();


  docForm: FormGroup;
  definequalification: definequalification;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  isChecked: boolean = false;
  ranklist: any;

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
    public DefineQualificationService: DefineQualificationService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
  


      defineQualificationDetails: this.fb.array([
        this.fb.group({
          select: [""],

          rank1: [""],
          rank2: [""],
          yearOfOperator: [""],
          yearInRank: [""],
          yearInTruck: [""],
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
     this.ranklist = [
      { id: "ENGINEER", text: "ENGINEER" },
      { id: "OFFICER", text: "OFFICER" },
      { id: "COOK", text: "COOK" },
    
    
    ];
    
    this.rankFilteredOptions.next(this.ranklist.slice());
    
    // listen for origin List  search field value changes
    this.rankFilterCtrl.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
    this.filteritemranklist();
    });
    
  }

filteritemranklist(){
  if (!this.ranklist) {
    return;
  }
  // get the search keyword
  let search = this.rankFilterCtrl.value;
  if (!search) {
    this.rankFilteredOptions.next(this.ranklist.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  // filter the banks
  this.rankFilteredOptions.next(
    this.ranklist.filter(title => title.text.toLowerCase().includes(search))
  );
 }

   addRow(){
    let defineQualificationDetailsDtlArray=this.docForm.controls.defineQualificationDetails as FormArray;
    let arraylen=defineQualificationDetailsDtlArray["defineQualificationDetails"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      select: [""],

      rank1: [""],
      rank2: [""],
      yearOfOperator: [""],
      yearInRank: [""],
      yearInTruck: [""],
    })
    defineQualificationDetailsDtlArray.insert(arraylen,newUsergroup);
  }

  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.defineQualificationDetails as FormArray;
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
  onSubmit(){

  }
  fetchDetails(countryCode: any): void {
   
  }
  
  update() {


  }

  onCancel(){
    this.router.navigate(['/crew/application-properties/define-preferences-for-qualif-of-officers/define-Officers-Qualification/list-Qualification-Matching']);

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
        defineQualificationDetails: this.fb.array([
          this.fb.group({
            rank1: [""],
          rank2: [""],
          yearOfOperator: [""],
          yearInRank: [""],
          yearInTruck: [""], 
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


