import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
import { systemAndSubsystem } from '../systemAndsubsystem.model';
import { SystemAndSubsystemService } from '../system-and-subsystem.service';
@Component({
  selector: 'app-add-systems-and-subsystems',
  templateUrl: './add-systems-and-subsystems.component.html',
  styleUrls: ['./add-systems-and-subsystems.component.sass']
})
export class AddSystemsAndSubsystemsComponent implements OnInit {




  public vesseltypeFilterCtrl: FormControl = new FormControl();
  vesseltypeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vesseltype', { static: true }) vesseltype: MatSelect;


  public hazardousFilterCtrl: FormControl = new FormControl();
  hazardousFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('hazardous', { static: true }) hazardous: MatSelect;


  public makerFilterCtrl: FormControl = new FormControl();
  makerFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('maker', { static: true }) maker: MatSelect;


  protected onDestroy = new Subject<void>();

 

  docForm: FormGroup;
  systemAndSubsystem: systemAndSubsystem;
  currencyList=[];
  edit:boolean=false;
  fleetlist:any;
  typelist:any;
  vesseltypelist:any;
  prefixlist:any;
  requestId: any;
  decryptRequestId: any;
  machinerylist: any;
  vesselgrouplist: any;
  fdanddlist: any;
  wagescalelist: any;
  classificationlist: any;
  reasonlist: any;
  vesselClasslist: any;
  fleetvessellist: any;
  leadvesselidlist: any;
  flaglist: any;
  registryportlist: any;
  iceclasslist: any;
  shipownerlist:any;
  shipownerplatformlist:any;
  operatorlist:any;
  officialManagerlist:any;
  shipmanagerlist:any;
  crewmanagerlist:any;
  superintendentlist:any;
  currtmpList: any[];
  pandilist: any;
  markerlist: any;
  hazardouslist: any;
  active: boolean=false;
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public SystemAndSubsystemService: SystemAndSubsystemService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 

    this.docForm = this.fb.group({

      particulars: [""],
      description: [""],
      systemCode: [""],
      maker: [""],
      function: [""],
      bookno: [""],
      drawingno: [""],
      hazardous: [""],

      systemSubsystemdetails: this.fb.array([
        this.fb.group({
          select: [""],
          systemCodedtl:[""],
          descriptiondtl:[""],
          particularsdtl: [""],
          makerdtl: [""],
          drawingnodtl: [""],
          allow: [""],
          material: [""],
          particularsfiledtl: [""],
          drawingfiledtl: [""],
          photogaphfiledtl: [""],
          presentationfiledtl: [""],
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




this.hazardouslist = [
  
      
  { id: "YES", text: "YES" },
  { id: "NO", text: "NO" },
  ];
  
  this.hazardousFilteredOptions.next(this.hazardouslist.slice());

// listen for origin List  search field value changes
this.hazardousFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
  this.filteritemhazardouslist();
});


this.markerlist = [
  
      
  { id: "ABB TURBO", text: "ABB TURBO" },
  { id: "ADERCO", text: "ADERCO" },
  { id: "AALBORG", text: "AALBORG" },
  { id: "ADAMALLYS L.L.C", text: "ADAMALLYS L.L.C" },
  ];
  
  this.makerFilteredOptions.next(this.markerlist.slice());

// listen for origin List  search field value changes
this.makerFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
  this.filteritemmarkerlist();
});




   }

   filteritemmarkerlist(){
    if (!this.markerlist) {
      return;
    }
    // get the search keyword
    let search = this.makerFilterCtrl.value;
    if (!search) {
      this.makerFilteredOptions.next(this.markerlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.makerFilteredOptions.next(
      this.markerlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filteritemhazardouslist(){
    if (!this.hazardouslist) {
      return;
    }
    // get the search keyword
    let search = this.hazardousFilterCtrl.value;
    if (!search) {
      this.hazardousFilteredOptions.next(this.hazardouslist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.hazardousFilteredOptions.next(
      this.hazardouslist.filter(title => title.text.toLowerCase().includes(search))
    );
   }




   addRow(){
    let systemSubsystemdetailsDtlArray=this.docForm.controls.systemSubsystemdetails as FormArray;
    let arraylen=systemSubsystemdetailsDtlArray.length;
    let newUsergroup:FormGroup = this.fb.group({
      select: [""],

      systemCodedtl:[""],
      descriptiondtl:[""],
      particularsdtl: [""],
      makerdtl: [""],
      drawingnodtl: [""],
      allow: [""],
      material: [""],
      particularsfiledtl: [""],
      drawingfiledtl: [""],
      photogaphfiledtl: [""],
      presentationfiledtl: [""],
    })
    systemSubsystemdetailsDtlArray.insert(arraylen,newUsergroup);
  }
  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.systemSubsystemdetails as FormArray;
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

   activeStatus(event: any) {
    this.active = event.checked;
  }


 
   filteritemvesseltypelist(){
    if (!this.vesseltypelist) {
      return;
    }
    // get the search keyword
    let search = this.vesseltypeFilterCtrl.value;
    if (!search) {
      this.vesseltypeFilteredOptions.next(this.vesseltypelist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.vesseltypeFilteredOptions.next(
      this.vesseltypelist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
 

   onDateChange(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.SystemAndSubsystemService.getDate(event.target.value);
      if (inputFlag == "dateinfleettype") {
        this.docForm.patchValue({ dateinfleettype: cdate });
      }
    
    }
  
    // if(this.docForm.value.dueDate!=null){
    //   this.check(this.docForm.value.dueDate);
    // }
  }
  onDateInput(inputValue: any, inputFlag: any, index: number) {
    // Check if the input value matches the expected date format
    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Example: dd/mm/yyyy or d/m/yyyy
    if(inputValue!=""){
      if (dateFormat.test(inputValue)) {
        let fdate = this.SystemAndSubsystemService.getDateObj(inputValue);
        if (inputFlag == "dueDate") {
          this.docForm.patchValue({
            'dateinfleettype': inputValue,
            'dateinfleettypeObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'dateinfleettype': "",
        'dateinfleettypeObj':""
       });
    }
    
  }
  formatDate(event: any) {
    const inputDate = event.value;
    if (inputDate && typeof inputDate === 'string') {
        const parts = inputDate.split('/');
        if (parts.length === 3) {
            const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            const parsedDate = moment(formattedDate, 'YYYY/MM/DD');
            this.docForm.get('dateinfleettype').setValue(parsedDate);
        }
    }
  }



   onDateChange2(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.SystemAndSubsystemService.getDate(event.target.value);
      if (inputFlag == "dateinfleettype") {
        this.docForm.patchValue({ dateinfleettype: cdate });
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
        let fdate = this.SystemAndSubsystemService.getDateObj(inputValue);
        if (inputFlag == "dueDate") {
          this.docForm.patchValue({
            'valiedUntil': inputValue,
            'valiedUntilObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'valiedUntil': "",
        'valiedUntilObj':""
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
            this.docForm.get('valiedUntil').setValue(parsedDate);
        }
    }
  }



  onSubmit(){

  }
  fetchDetails(countryCode: any): void {
    
  }
  
  update() {

  }

  onCancel(){
    this.router.navigate(['/supplies/admin/systems-and-subsystems/list-systems-and-subsystems']);
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
        code: [""],
        name: [""],
        shortname: [""],
        prefix:[""],
        initials:[""],
        sorting: [""],
        xname1: [""],
        type: [""],
        fleet:[""],
        xname2:[""],
        vesseltype: [""],
        pandi: [""],
        vesseltype2: [""],
        hullandmachinery:[""],
        virtual:[""],
        vesselgroup: [""],
        fdandd: [""],
        wagescale: [""],
        classification:[""],
        isActive:[""],
        reason: [""],
        vesselClass: [""],
        fleetvessel: [""],
        dateinfleettype:[""],
        valiedUntil:[""],
        leadvesselid: [""],
        flag: [""],
        greek: [""],
        registryport:[""],
        registryno:[""],
        builtdate: [""],
        placeBuild: [""],
        yardbuild: [""],
        imono:[""],
        hullno:[""],
        callsign:[""],
        natnumber:[""],
        mmis:[""],
        classno:[""],
        iceclass:[""],
        shipowner:[""],
        shipownerplatform:[""],
        operator:[""],
        useOperator:[""],
        safteyno:[""],
        officialManager:[""],
        shipmanager:[""],
        crewmanager:[""],
        superintendent:[""],
        groupmanager:[""],
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


  uploadFile(i){

  }
  addFile(){

  }
}

