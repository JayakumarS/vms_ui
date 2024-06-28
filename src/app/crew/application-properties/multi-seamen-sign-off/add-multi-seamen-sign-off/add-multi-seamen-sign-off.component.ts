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

import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { miultiSeamenSignOff } from '../multi-seamem-sign-off.model';
import { MultiSeamenSignOffService } from '../multi-seamen-sign-off.service';
import { CommonService } from 'src/app/common-service/common.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
@Component({
  selector: 'app-add-multi-seamen-sign-off',
  templateUrl: './add-multi-seamen-sign-off.component.html',
  styleUrls: ['./add-multi-seamen-sign-off.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
        },
      }
    }, CommonService
  ]
})
export class AddMultiSeamenSignOffComponent implements OnInit {

  public registryportFilterCtrl: FormControl = new FormControl();
  registryportFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('registryport', { static: true }) registryport: MatSelect;

  public vessaltypeFilterCtrl: FormControl = new FormControl();
  vessaltypeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vessaltype', { static: true }) vessaltype: MatSelect;

  public joiningPortFilterCtrl: FormControl = new FormControl();
  joiningPortFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('joiningPort', { static: true }) joiningPort: MatSelect;

  public rankFilterCtrl: FormControl = new FormControl();
  rankFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('rank', { static: true }) rank: MatSelect;

  public payFilterCtrl: FormControl = new FormControl();
  payFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('pay', { static: true }) pay: MatSelect;


  public currencyFilterCtrl: FormControl = new FormControl();
  currencyFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('currency', { static: true }) currency: MatSelect;

  public nameFilterCtrl: FormControl = new FormControl();
  nameFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('name', { static: true }) name: MatSelect;

  protected onDestroy = new Subject<void>();


  docForm: FormGroup;
  miultiSeamenSignOff: miultiSeamenSignOff;
  currencyList: any =[];
  vesselList :  any =[];
  edit:boolean=false;
  // oldPwd: boolean=false;
  vessaltypelist: any=[];
  joiningPortList: any =[];
  portList: any =[];
  rankList: any = [];
  signoffList: any = [];
  paylist: any;
  currencylist: any;
  nameList: any =[];
  registryportlist: any;
  // For Encryption
  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];
  datasave: any;
  selectedItems: any[] = [];
  data: boolean=false;
  nationalityList: any;
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public MultiSeamenSignOffService: MultiSeamenSignOffService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,public matError : MatErrorService,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService, public dialog: MatDialog,
    public snackBar: MatSnackBar, private cmnService: CommonService) { 


    this.docForm = this.fb.group({
      
      seamenId:[""],
      fromdate: [""],
      fromdateObj: [""],
      vessel: [""],
      joinPort: [""],
      signoffCode :[""],

      tablerow: this.fb.array([
        this.fb.group({
          selected: [""],
          seaman: [""],
          rank: [""],
          reason: [""],
          nationality: [""],
          joiningdate: [""],
          port: [""],
          joiningDate: [""],
          joiningdateObj: [""],
          signoffport: [""],
          estSignoff: [""],
          code: [""],
          signOffDate: [""],
          signOffDateObj: [""],
        })
      ])
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
     this.getRankList();

     this.getNameList();
   
     this.getNationalityList();

  this.getVesselList();

  this.getJoiningList();

  this.getCurrencyList();

  this.getPortList();



  

this.signoffList = [
  
  { id: "TRANSFER", text: "TRANSFER" },
 

];



   }


   getVesselList(){
    this.httpService.get(this.MultiSeamenSignOffService.getVesselUrl).subscribe({next: (res: any) => {
      this.vesselList = res.lCommonUtilityBean;
    }, error: (err) => console.log(err)
   });
   }

    getJoiningList(){
    this.httpService.get(this.MultiSeamenSignOffService.getJoiningPortUrl).subscribe({next: (res: any) => {
      this.joiningPortList = res.lCommonUtilityBean;
    }, error: (err) => console.log(err)
    });
    }

    getCurrencyList(){
      this.httpService.get(this.MultiSeamenSignOffService.getCurrencyListUrl).subscribe({next: (res: any) => {
        this.currencyList = res.lCommonUtilityBean;
      }, error: (err) => console.log(err)
      });
      }

      getPortList(){
        this.httpService.get(this.MultiSeamenSignOffService.getport).subscribe({next: (res: any) => {
          this.portList = res.lCommonUtilityBean;
        }, error: (err) => console.log(err)
        });
      }
      getNationalityList(){
        this.httpService.get(this.MultiSeamenSignOffService.nationalityUrl).subscribe({next: (res: any) => {
          this.nationalityList = res.lCommonUtilityBean;
        }, error: (err) => console.log(err)
        });
      }
      getRankList(){
        this.httpService.get(this.MultiSeamenSignOffService.getRankUrl).subscribe({next: (res: any) => {
          this.rankList = res.lCommonUtilityBean;
        }, error: (err) => console.log(err)
        });
      }

      getNameList(){
        this.httpService.get(this.MultiSeamenSignOffService.getNameUrl).subscribe({next: (res: any) => {
          this.nameList = res.lCommonUtilityBean;
        }, error: (err) => console.log(err)
        });
      }


    generate() {
      this.httpService.get<any>(this.MultiSeamenSignOffService.fetchdata+"?date="+this.docForm.value.fromdate+"&vessel="+this.docForm.value.vessel+"&port="+parseInt(this.docForm.value.joinPort)).subscribe({next: (data: any) => {
        if(data.length>0){
          this.data=true;

        }
        this.datasave = data;
this.docForm.patchValue({
  'seamenId':data[0].seamenId
})
        let tablerowArray = this.docForm.controls.tablerow as FormArray;
        tablerowArray.clear();
        data.forEach(element => {
         let date = this.cmnService.getDateObj( element.signOffDate);
if(element.signoffport==null){
  element.signoffport = 0;
}
      
         let arraylen = tablerowArray.length;
         let newUsergroup: FormGroup = this.fb.group({
          seaman: [element.seaman],
          rank:  [element.rank.toString()],
          reason: [element.reason],
          nationality: [element.nationality.toString()],
          joiningdate:  [element.joiningdate],
          port: [element.port.toString()],
          joiningDate: [element.joiningDate],
          joiningdateObj:  [element.joiningdateObj],
          estSignoff:  [element.estSignoff],
          code: [element.code],
          signOffDateObj:[date],
          signOffDate:[element.signOffDate],
          signoffport:[element.signoffport.toString()]

        
         })
         tablerowArray.insert(arraylen, newUsergroup);
       
       });



        }, error: (err) => console.log(err)
       });
  
  
  
    }
 

   onDateChange2(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.MultiSeamenSignOffService.getDate(event.target.value);
      if (inputFlag == "fromdate") {
        this.docForm.patchValue({ fromdate: cdate });
      }
    
    }
  
    // if(this.docForm.value.dueDate!=null){
    //   this.check(this.docForm.value.dueDate);
    // }
  }
  onDateInput2(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    if(inputValue!=""){
      if (dateFormat.test(inputValue)) {
        let fdate = this.MultiSeamenSignOffService.getDateObj(inputValue);
        if (inputFlag == "fromdate") {
          this.docForm.patchValue({
            'fromdate': inputValue,
            'fromdateObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'fromdate': "",
        'fromdateObj':""
       });
    }
    
  }
  formatDate2(event: any) {
    const inputDate = event.value;
    if (inputDate && typeof inputDate === 'string') {
        const parts = inputDate.split('/');
        if (parts.length === 3) {
            const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            const parsedDate = moment(formattedDate, 'YYYY/MM/DD');
            this.docForm.get('fromdate').setValue(parsedDate);
        }
    }
  }





  getDateString(event, inputFlag, row) {
    let date = this.cmnService.getDate(event.target.value);
    

  
    let tablerowArray = this.docForm.get('tablerow') as FormArray;
  
    if (row >= 0 && row < tablerowArray.length) {
      let control = tablerowArray.at(row);
      if (inputFlag === "signOffDate") {
        control.patchValue({ [inputFlag]: date });
      }
    }
  }

  
  onDateChange3(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.MultiSeamenSignOffService.getDate(event.target.value);
      if (inputFlag == "signOffDate") {
        this.docForm.patchValue({ signOffDate: cdate });
      }
    
    }
  
    // if(this.docForm.value.dueDate!=null){
    //   this.check(this.docForm.value.dueDate);
    // }
  }
  onDateInput3(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    if(inputValue!=""){
      if (dateFormat.test(inputValue)) {
        let fdate = this.MultiSeamenSignOffService.getDateObj(inputValue);
        if (inputFlag == "signOffDate") {
          this.docForm.patchValue({
            'signOffDate': inputValue,
            'signOffDateObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'signOffDate': "",
        'signOffDateObj':""
       });
    }
    
  }
  formatDate3(event: any) {
    const inputDate = event.value;
    if (inputDate && typeof inputDate === 'string') {
        const parts = inputDate.split('/');
        if (parts.length === 3) {
            const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            const parsedDate = moment(formattedDate, 'YYYY/MM/DD');
            this.docForm.get('signOffDate').setValue(parsedDate);
        }
    }
  }



  
  onDateChange4(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.MultiSeamenSignOffService.getDate(event.target.value);
      if (inputFlag == "estSignOff") {
        let multiSeamenArray = this.docForm.controls.multiseamendetail as FormArray;
        multiSeamenArray.at(index).patchValue({estSignOff:cdate});      }
    
    }
  
    // if(this.docForm.value.dueDate!=null){
    //   this.check(this.docForm.value.dueDate);
    // }
  }
  onDateInput4(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    if(inputValue!=""){
      if (dateFormat.test(inputValue)) {
        let fdate = this.MultiSeamenSignOffService.getDateObj(inputValue);
        if (inputFlag == "estSignOff") {
          this.docForm.patchValue({
            'estSignOff': inputValue,
            'estSignOffObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'estSignOff': "",
        'estSignOffObj':""
       });
    }
    
  }
  formatDate4(event: any) {
    const inputDate = event.value;
    if (inputDate && typeof inputDate === 'string') {
        const parts = inputDate.split('/');
        if (parts.length === 3) {
            const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            const parsedDate = moment(formattedDate, 'YYYY/MM/DD');
            this.docForm.get('estSignOff').setValue(parsedDate);
        }
    }
  }


  onSubmit(){
    // let selectedRow=this.selectedItems;
    // if (selectedRow.length > 0) {
    //   let resultbean = {
    //     'tablerow': selectedRow,
    //     'fromdate':this.docForm.value.fromdate,
    //     'vessel':this.docForm.value.vessel,
    //     'joinPort':this.docForm.value.joinPort,
    //     'signoffCode':this.docForm.value.signoffCode,
    //     'seamenId':this.docForm.value.seamenId,
    //   }
      this.httpService.post<any>(this.MultiSeamenSignOffService.savedata, this.docForm.value)
      .subscribe(data => {
        if (data.success === true) {
          this.notificationService.showNotification(
            "snackbar-success",
            "Record Added successfully!",
            "bottom",
            "center"
          );
          location.reload();
                }
      });
  // } else {
  //   this.notificationService.showNotification(
  //     "snackbar-danger",
  //     "Please select at least one row",
  //     "bottom",
  //     "center"
  //   );
  // }
  

  
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


        multiseamendetail: this.fb.array([
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
