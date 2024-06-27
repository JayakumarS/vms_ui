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
import { offSign } from '../off-sign.model';
import { OffSignService } from '../off-sign.service';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-add-off-sign',
  templateUrl: './add-off-sign.component.html',
  styleUrls: ['./add-off-sign.component.sass']
})
export class AddOffSignComponent implements OnInit {


  public vessaltypeFilterCtrl: FormControl = new FormControl();
  vessaltypeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vessaltype', { static: true }) vessaltype: MatSelect;

  public nationalityFilterCtrl: FormControl = new FormControl();
  nationalityFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('nationality', { static: true }) nationality: MatSelect;

  public rankFilterCtrl: FormControl = new FormControl();
  rankFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('rank', { static: true }) rank: MatSelect;


  protected onDestroy = new Subject<void>();


  docForm: FormGroup;
  offSign: offSign;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;
  vessaltypelist: any;
  nationalitylist: any;
  ranklist: any;
  // For Encryption
  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];

  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public OffSignService: OffSignService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
      vessaltype: [""],


      offSigndetail: this.fb.array([
        this.fb.group({
          select: [""],
          nationality:[""],
          rank:[""],
          months: [""],

   
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

     this.httpService.get<any>(this.OffSignService.vesselTypeUrl).subscribe(
      (data) => {
        this.vessaltypelist = data.lCommonUtilityBean;
        this.vessaltypeFilteredOptions.next(this.vessaltypelist.slice());
      },
    );
this.vessaltypeFilterCtrl.valueChanges
  .pipe(takeUntil(this.onDestroy))
  .subscribe(() => {
    this.filteritemvessaltypelist();
  });


  this.httpService.get<any>(this.OffSignService.nationalityUrl).subscribe(
    (data) => {
      this.nationalitylist = data.lCommonUtilityBean;
      this.nationalityFilteredOptions.next(this.nationalitylist.slice());
    },
  );

this.nationalityFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
  this.filteritemnationalitylist();
});




this.httpService.get<any>(this.OffSignService.rankListUrl).subscribe(
  (data) => {
    this.ranklist = data.lCommonUtilityBean;
    this.rankFilteredOptions.next(this.ranklist.slice());
  },
);
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
   filteritemvessaltypelist(){
    if (!this.vessaltypelist) {
      return;
    }
    // get the search keyword
    let search = this.vessaltypeFilterCtrl.value;
    if (!search) {
      this.vessaltypeFilteredOptions.next(this.vessaltypelist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.vessaltypeFilteredOptions.next(
      this.vessaltypelist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   addRow(){
    let offSigndetailDtlArray=this.docForm.controls.offSigndetail as FormArray;
    let arraylen=offSigndetailDtlArray.length;
    let newUsergroup:FormGroup = this.fb.group({
      select: [""],

      nationality:[""],
      rank:[""],
      months: [""],
    })
    offSigndetailDtlArray.insert(arraylen,newUsergroup);
  }

   removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.offSigndetail as FormArray;
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
    this.router.navigate(['/crew/maintain/off-sign/list-off-sign']);

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
        vessaltype: [""],


        offSigndetail: this.fb.array([
          this.fb.group({
            siNo : 1,
            nationality:[""],
            rank:[""],
            months: [""],
  
     
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
