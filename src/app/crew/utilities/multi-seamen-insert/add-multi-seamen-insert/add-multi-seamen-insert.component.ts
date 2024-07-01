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
import { MultiSeamenInsertService } from '../multi-seamen-insert.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailsPopupComponent } from '../person-details-popup/person-details-popup.component';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { MultiSeamenInsert } from '../multi-seamen-insert.model';
import { CommonService } from 'src/app/common-service/common.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
@Component({
  selector: 'app-add-multi-seamen-insert',
  templateUrl: './add-multi-seamen-insert.component.html',
  styleUrls: ['./add-multi-seamen-insert.component.sass'],
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
export class AddMultiSeamenInsertComponent implements OnInit {

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
  multiSeamenInsert: MultiSeamenInsert;
  currencyList: any =[];
  vesselList :  any =[];
  edit:boolean=false;
  valid: boolean;
  vessaltypelist: any=[];
  joiningPortList: any =[];
  portList: any =[];
  rankList: any = [];
  paylist: any;
  currencylist: any;
  nameList: any =[];
  nationalityList: any =[];
  registryportlist: any;
  // For Encryption
  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];

  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public multiSeamenInsertService: MultiSeamenInsertService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,public matError : MatErrorService,
    public EncrDecr: EncrDecrService, private commonService: CommonService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService, public dialog: MatDialog,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
      startdateObj: [""],
      startdate: [""],
      vessel: [""],
      joinPort: [""],
      multiseamendetail: this.fb.array([
        this.fb.group({
          select: [""],
          rank:[""],
          pay: [""],
          currency: [""],
          name: [""],
          joiningdateObj: [""],
          joiningDate: [""],
          estSignOffObj: [""],
          estSignOff: [""],
          nationality: [""],
          validCheck:[""]
        })
      ]),
    });



  }
  
   ngOnInit() {
    

   


  this.getVesselList();

  this.getJoiningList();

  this.getCurrencyList();

  this.getPortList();

  this.getRankList();

  this.getNameList();

  this.getNationalityList();




this.paylist = [
  
  { id: "YES", text: "YES" },
  { id: "NO", text: "NO" },

];

this.payFilteredOptions.next(this.paylist.slice());

// listen for origin List  search field value changes
this.payFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritempaylist();
});


this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ 
  this.requestId = params.id;
   this.edit=true;
   //For User login Editable mode
   this.fetchDetails(this.requestId) ;

  }
 });
 

   }


   getVesselList(){
    this.httpService.get(this.multiSeamenInsertService.getVesselUrl).subscribe({next: (res: any) => {
      this.vesselList = res.lCommonUtilityBean;
    }, error: (err) => console.log(err)
   });
   }

    getJoiningList(){
    this.httpService.get(this.multiSeamenInsertService.getJoiningPortUrl).subscribe({next: (res: any) => {
      this.joiningPortList = res.lCommonUtilityBean;
    }, error: (err) => console.log(err)
    });
    }

    getCurrencyList(){
      this.httpService.get(this.multiSeamenInsertService.getCurrencyListUrl).subscribe({next: (res: any) => {
        this.currencyList = res.lCommonUtilityBean;
      }, error: (err) => console.log(err)
      });
      }

      getPortList(){
        this.httpService.get(this.multiSeamenInsertService.getport).subscribe({next: (res: any) => {
          this.portList = res.lCommonUtilityBean;
        }, error: (err) => console.log(err)
        });
      }

      getRankList(){
        this.httpService.get(this.multiSeamenInsertService.getRankUrl).subscribe({next: (res: any) => {
          this.rankList = res.lCommonUtilityBean;
        }, error: (err) => console.log(err)
        });
      }

      getNameList(){
        this.httpService.get(this.multiSeamenInsertService.getNameUrl).subscribe({next: (res: any) => {
          this.nameList = res.lCommonUtilityBean;
        }, error: (err) => console.log(err)
        });
      }

      getNationalityList(){
        this.httpService.get(this.multiSeamenInsertService.nationalityUrl).subscribe({next: (res: any) => {
          this.nationalityList = res.lCommonUtilityBean;
        }, error: (err) => console.log(err)
        });
      }

    nameChange(i){
        let rankList = this.nameList.find(dtl => dtl.id === this.docForm.value.multiseamendetail[i].name);
        let multiseamendetailDtlArray=this.docForm.controls.multiseamendetail as FormArray;
        if (rankList) {
          multiseamendetailDtlArray.at(i).patchValue({
              rank: rankList.rankId.toString(),
              nationality: rankList.nationalityId.toString() // or just rankList.nationalityid if it is already a string
          });
      }   

      
      if(i>0){
        let multiseamendetailDtlArray=this.docForm.controls.multiseamendetail as FormArray;
        let name = multiseamendetailDtlArray.value[i].name;
        multiseamendetailDtlArray.controls.forEach((element :any) => {
          if(element.value.name == name){
            this.showNotification(
              "snackbar-danger",
              "Already Present",
              "top",
              "right"
            );
            multiseamendetailDtlArray.at(i).patchValue({ name: ''});

          }
        });
      }
    // Fetch certificate data based on rankCode
    this.httpService.get<any>(this.multiSeamenInsertService.CheckValidUrl + "?id=" + rankList.rankId)
    .subscribe({
      next: (data) => {
         if(data.list.length>0){
          this.valid = true;
         }else{
          this.valid = false;
         }
      },
      error: (error) => {
        console.error('Error fetching certificate data', error);
      }
    });

     }

   filteritemcurrencylist(){
    if (!this.currencylist) {
      return;
    }
    // get the search keyword
    let search = this.currencyFilterCtrl.value;
    if (!search) {
      this.currencyFilteredOptions.next(this.currencylist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.currencyFilteredOptions.next(
      this.currencylist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritempaylist(){
    if (!this.paylist) {
      return;
    }
    // get the search keyword
    let search = this.payFilterCtrl.value;
    if (!search) {
      this.payFilteredOptions.next(this.paylist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.payFilteredOptions.next(
      this.paylist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemregistryportlist(){
    if (!this.registryportlist) {
      return;
    }
    // get the search keyword
    let search = this.registryportFilterCtrl.value;
    if (!search) {
      this.registryportFilteredOptions.next(this.registryportlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.registryportFilteredOptions.next(
      this.registryportlist.filter(title => title.text.toLowerCase().includes(search))
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

   onDateChange2(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.multiSeamenInsertService.getDate(event.target.value);
      if (inputFlag == "startdate") {
        this.docForm.patchValue({ startdate: cdate });
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
        let fdate = this.multiSeamenInsertService.getDateObj(inputValue);
        if (inputFlag == "startdate") {
          this.docForm.patchValue({
            'startdate': inputValue,
            'startdateObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'startdate': "",
        'startdateObj':""
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
            this.docForm.get('startdate').setValue(parsedDate);
        }
    }
  }



  
  onDateChange3(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.multiSeamenInsertService.getDate(event.target.value);
      if (inputFlag == "joiningDate") {
        // this.docForm.patchValue({ joiningDate: cdate });
        let multiSeamenArray = this.docForm.controls.multiseamendetail as FormArray;
        multiSeamenArray.at(index).patchValue({joiningDate:cdate});
      }
    
    }

  }
  onDateInput3(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    if(inputValue!=""){
      if (dateFormat.test(inputValue)) {
        let fdate = this.multiSeamenInsertService.getDateObj(inputValue);
        if (inputFlag == "joiningDate") {
          this.docForm.patchValue({
            'joiningDate': inputValue,
            'joiningdateObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'joiningDate': "",
        'joiningdateObj':""
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
            this.docForm.get('joiningDate').setValue(parsedDate);
        }
    }
  }




  
  onDateChange4(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.multiSeamenInsertService.getDate(event.target.value);
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
        let fdate = this.multiSeamenInsertService.getDateObj(inputValue);
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



  popup(row){
    let tempDirection: 'ltr' | 'rtl';
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(PersonDetailsPopupComponent, {
      data: row,
      height: "85%",
      width: "80%",
      direction: tempDirection,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

   addRow(){
    let multiseamendetailDtlArray=this.docForm.controls.multiseamendetail as FormArray;
    let arraylen=multiseamendetailDtlArray.length;
    let newUsergroup:FormGroup = this.fb.group({
      select: [""],
      rank:[""],
      pay: [""],
      currency: [""],
      name: [""],
      joiningdateObj: [""],
      joiningDate: [""],
      estSignOffObj: [""],
      estSignOff: [""],
      nationality: [""],
      validCheck: [""]
    })
    multiseamendetailDtlArray.insert(arraylen,newUsergroup);
  }

   removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.multiseamendetail as FormArray;
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

    if(this.docForm.value.vessel == ""){
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please select vessel",
        "top",
        "right"
      )
    }else if(this.docForm.value.startdate == ""){
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please select Start Date",
        "top",
        "right"
      )
    }else if(this.docForm.value.joinPort == ""){
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please select Joining Port",
        "top",
        "right"
      )
    }else if(this.valid == false){
      this.notificationService.showNotification(
        "snackbar-danger",
        "Warning: Mandatory Certificates NOT available and MUST be acquired for this Rank",
        "top",
        "right"
      )
    }
    else if(this.docForm.valid && this.docForm.value.vessel != "" && this.docForm.value.startdate != "" && this.docForm.value.joinPort != "" && this.valid == true){
      this.docForm.value.joinPort = this.docForm.value.joinPort.id;
      this.multiSeamenInsertService.saveMultiSeamenUrl(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right"
      );
    }

  }
  fetchDetails(seamenCode: any): void {
    this.httpService.get<any>(this.multiSeamenInsertService.editUrl + "?id=" + seamenCode).subscribe({
      next: (data: any) => {
        console.log(data);
  
        let startdate = this.commonService.getDateObj(data.list[0].startdate);

        this.docForm.patchValue({
          'vessel': data.list[0].vessel,
          'joinPort':data.list[0].joinPort.toString(),
          'startdateObj': startdate,
          'startdate': data.list[0].startdate,
          'validCheck': data.list[0].validCheck,
            });

  
          let multiseamendetailRowArray = this.docForm.controls.multiseamendetail as FormArray;
          multiseamendetailRowArray.clear();
  
            data.multiseamendetail.forEach(element => {
            let arraylen = multiseamendetailRowArray.length;
  
            let joiningDate = this.commonService.getDateObj(element.joiningDate);
            let estSignOff = this.commonService.getDateObj(element.estSignOff);


            let newUsergroup: FormGroup = this.fb.group({
              name: [element.name.toString()],
              rank: [element.rank.toString()],
              nationality: [element.nationality.toString()],
              pay: [element.pay],
              currency: [element.currency],
              joiningdateObj: joiningDate,
              joiningDate: [element.joiningDate],
              estSignOffObj:estSignOff,
              estSignOff: [element.estSignOff],
              validCheck: [element.validCheck],
            });
            
            multiseamendetailRowArray.insert(arraylen, newUsergroup);
          });
      }
    });
  }
  
  update() {
    this.docForm.value.seamenCode = this.requestId;
    if(this.docForm.valid){
      this.multiSeamenInsertService.updateMultiSeamenUrl(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }

  }

  onCancel(){
    this.router.navigate(['/crew/utilities/multi-seamen-insert/list-multi-seamen-insert']);

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
