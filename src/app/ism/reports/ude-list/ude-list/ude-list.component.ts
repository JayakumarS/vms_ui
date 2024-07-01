import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UdeListService } from '../ude-list.service';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
import * as Chart from 'chart.js';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { udelist } from './ude-list.model';
@Component({
  selector: 'app-ude-list',
  templateUrl: './ude-list.component.html',
  styleUrls: ['./ude-list.component.sass']
})
export class UdeListComponent implements OnInit {


  public prefixFilterCtrl: FormControl = new FormControl();
  prefixFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('prefix', { static: true }) prefix: MatSelect;

  public departmentFilterCtrl: FormControl = new FormControl();
  departmentFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('department', { static: true }) department: MatSelect;


  public fleetFilterCtrl: FormControl = new FormControl();
  fleetFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('fleet', { static: true }) fleet: MatSelect;

  public vesseltypeFilterCtrl: FormControl = new FormControl();
  vesseltypeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vesseltype', { static: true }) vesseltype: MatSelect;

  public pandiFilterCtrl: FormControl = new FormControl();
  pandiFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('pandi', { static: true }) pandi: MatSelect;

  public hullandmachineryFilterCtrl: FormControl = new FormControl();
  hullandmachineryFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('hullandmachinery', { static: true }) hullandmachinery: MatSelect;


  public vesselgroupFilterCtrl: FormControl = new FormControl();
  vesselgroupFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vesselgroup', { static: true }) vesselgroup: MatSelect;

  public fdanddFilterCtrl: FormControl = new FormControl();
  fdanddFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('fdandd', { static: true }) fdandd: MatSelect;

  public wagescaleFilterCtrl: FormControl = new FormControl();
  wagescaleFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('wagescale', { static: true }) wagescale: MatSelect;

  public classificationFilterCtrl: FormControl = new FormControl();
  classificationFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('classification', { static: true }) classification: MatSelect;

  public reasonFilterCtrl: FormControl = new FormControl();
  reasonFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('reason', { static: true }) reason: MatSelect;

  public vesselClassFilterCtrl: FormControl = new FormControl();
  vesselClassFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vesselClass', { static: true }) vesselClass: MatSelect;


  public fleetvesselFilterCtrl: FormControl = new FormControl();
  fleetvesselFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('fleetvessel', { static: true }) fleetvessel: MatSelect;

  public leadvesselidFilterCtrl: FormControl = new FormControl();
  leadvesselidFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('leadvesselid', { static: true }) leadvesselid: MatSelect;

  
  public flagFilterCtrl: FormControl = new FormControl();
  flagFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('flag', { static: true }) flag: MatSelect;

  public registryportFilterCtrl: FormControl = new FormControl();
  registryportFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('registryport', { static: true }) registryport: MatSelect;

  public iceclassFilterCtrl: FormControl = new FormControl();
  iceclassFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('iceclass', { static: true }) iceclass: MatSelect;

  public shipownerFilterCtrl: FormControl = new FormControl();
  shipownerFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('shipowner', { static: true }) shipowner: MatSelect;

  public shipownerplatformFilterCtrl: FormControl = new FormControl();
  shipownerplatformFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('shipownerplatform', { static: true }) shipownerplatform: MatSelect;

  public operatorFilterCtrl: FormControl = new FormControl();
  operatorFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('operator', { static: true }) operator: MatSelect;

  public officialManagerFilterCtrl: FormControl = new FormControl();
  officialManagerFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('opeofficialManagerrator', { static: true }) opeofficialManagerrator: MatSelect;

  public shipmanagerFilterCtrl: FormControl = new FormControl();
  shipmanagerFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('shipmanager', { static: true }) shipmanager: MatSelect;

  public crewmanagerFilterCtrl: FormControl = new FormControl();
  crewmanagerFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('crewmanager', { static: true }) crewmanager: MatSelect;

  public superintendentFilterCtrl: FormControl = new FormControl();
  superintendentFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('superintendent', { static: true }) superintendent: MatSelect;



  protected onDestroy = new Subject<void>();


  dropdownSettings: IDropdownSettings;
  datasave: any[] = [];

  docForm: FormGroup;
  udelist: udelist;
  currencyList=[];
  edit:boolean=false;
  fleetlist: any[] = [];
  udetypelist:any;
  casecloselist:any;
  Categorieslist:any;
  departmentlist:any;
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
  departmentList:any;
  currtmpList: any[];
  pandilist: any;
  vessellist: any;
  activelist: any;
  inactivelist: any;
  sliderChecked: boolean = true;
  checkboxText = 'Fleet';
  checkboxControl = new FormControl(false);
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public UdeListService: UdeListService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 

    this.docForm = this.fb.group({
      nation :[""],
      categories:[""],
      udetype:[""],
      checkbox:[true],
      active:[""],
      inactive:[""],
      vessel:[""],
      department:[""],
      todateObj:[new Date(2024, 5, 15)],
      todate: [""],
      fromdate: [""],
      fromdateObj: [new Date(2024, 5, 1)] ,
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
      dateinfleettypeObj:[""],
      valiedUntilObj:[""],
    });

  }
  
   ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
     this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
this.departmentList=[


];

     this.casecloselist = [
  
    
      { id: "YES", text: "YES" },
      { id: "NO", text: "NO" },

    ];
    




  this.activelist = [
    { id: "ABU SAMRAH", text: "ABU SAMRAH" },
    { id: "AL DANAH", text: "AL DANAH" },
    { id: "ATHENA", text: "ATHENA" },
    { id: "GFS GALAXY", text: "GFS GALAXY" },
  ]
    this.inactivelist = [
    { id: "BMS LIBRA", text: "BMS LIBRA" },
    { id: "MARC", text: "MARC" },
    { id: "RUBY", text: "RUBY" },
    { id: "PAMBA1", text: "PAMBA1" },
  ];
  this.udetypelist = [
    { id: "ACCIDENT", text: "ACCIDENT" },
  { id: "INCIDENT", text: "INCIDENT" },
  { id: "NEAR", text: "NEAR" },
  { id: "NON CONFORMANCE", text: "NON CONFORMANCE" },
  { id: "UNSAFE ACTS/CONDITION", text: "UNSAFE ACTS/CONDITION" },

  ];
  
  this.departmentFilteredOptions.next(this.udetypelist.slice());

// listen for origin List  search field value changes
this.departmentFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
  this.filteritemdepartmentlist();
});


this.Categorieslist=[
  { id: "SAFETY", text: "SAFETY" },
{ id: "SECURITY", text: "SECURITY" },


];

this.departmentFilteredOptions.next(this.udetypelist.slice());

// listen for origin List  search field value changes
this.departmentFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemdepartmentlist();
});

this.fleetdatalist();






this.vesseltypelist = [
  
    
];

this.vesseltypeFilteredOptions.next(this.vesseltypelist.slice());

// listen for origin List  search field value changes
this.vesseltypeFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemvesseltypelist();
});


this.pandilist = [
  
    
];

this.pandiFilteredOptions.next(this.pandilist.slice());

// listen for origin List  search field value changes
this.pandiFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritempandilist();
});



this.machinerylist = [
  
    
];

this.hullandmachineryFilteredOptions.next(this.machinerylist.slice());

// listen for origin List  search field value changes
this.hullandmachineryFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemmachinerylist();
});




this.vesselgrouplist = [
  
    
];

this.vesselgroupFilteredOptions.next(this.vesselgrouplist.slice());

// listen for origin List  search field value changes
this.vesselgroupFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemvesselgroup();
});


this.fdanddlist = [
  
    
];

this.fdanddFilteredOptions.next(this.fdanddlist.slice());

// listen for origin List  search field value changes
this.fdanddFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemfdanddlist();
});


this.wagescalelist = [
  
  { id: "SAFEEN WAGES", text: "SAFEEN WAGES" },
  { id: "SIMATECH-ITF", text: "SIMATECH-ITF" },
  { id: "TEST WAGE SCALE", text: "TEST WAGE SCALE" },
];

this.wagescaleFilteredOptions.next(this.wagescalelist.slice());

// listen for origin List  search field value changes
this.wagescaleFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemwagescalelist();
});



this.classificationlist = [
  
    
];

this.wagescaleFilteredOptions.next(this.classificationlist.slice());

// listen for origin List  search field value changes
this.wagescaleFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemclassificationlist();
});




this.reasonlist = [
  
  { id: "Scraped ", text: "Scraped " },
  { id: "Sold", text: "Sold" },
  { id:"In Use", text: "In Use" },
  { id:"On Order ", text: "On Order" },

];

this.reasonFilteredOptions.next(this.reasonlist.slice());

// listen for origin List  search field value changes
this.reasonFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemreasonlist();
});


this.vesselClasslist = [
  
    
];

this.vesselClassFilteredOptions.next(this.vesselClasslist.slice());

// listen for origin List  search field value changes
this.vesselClassFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemvesselClasslist();
});


this.fleetvessellist = [
  { id: "Lead", text: "Lead" },
  { id: "Sister", text: "Sister" },
    
];

this.fleetvesselFilteredOptions.next(this.fleetvessellist.slice());

// listen for origin List  search field value changes
this.fleetvesselFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemfleetvessellist();
});



this.leadvesselidlist = [
  
  { id: "ATHENA", text: "ATHENA" },
  { id: "GFS PEARL", text: "GFS PEARL" },
  { id: "GFS PRIME", text: "PRIME" },
];

this.leadvesselidFilteredOptions.next(this.leadvesselidlist.slice());

// listen for origin List  search field value changes
this.leadvesselidFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemleadvesselid();
});


this.flaglist = [
  
  { id: "BANGLADESH", text: "BANGLADESH" },
  { id: "BRITISH", text: "BRITISH" },
  { id: "BELGIAN", text: "BELGIAN" },

];

this.flagFilteredOptions.next(this.flaglist.slice());

// listen for origin List  search field value changes
this.flagFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemflaglist();
});


this.registryportlist = [
  
  { id: "BANGLADESH", text: "BANGLADESH" },
  { id: "BRITISH", text: "BRITISH" },
  { id: "BELGIAN", text: "BELGIAN" },

];

this.registryportFilteredOptions.next(this.registryportlist.slice());

// listen for origin List  search field value changes
this.registryportFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemregistryportlist();
});

this.iceclasslist = [
  
    
];

this.iceclassFilteredOptions.next(this.iceclasslist.slice());

// listen for origin List  search field value changes
this.iceclassFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemiceclasslist();
});


this.shipownerlist = [
  { id: "ATTAR", text: "ATTAR" },
  { id: "CME-MAN", text: "CME-MAN" },
  { id: "SAFEEN", text: "SAFEEN" },

    
];

this.shipownerFilteredOptions.next(this.shipownerlist.slice());

// listen for origin List  search field value changes
this.shipownerFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemshipownerlist();
});


this.shipownerplatformlist = [
  
  { id: "ATTAR", text: "ATTAR" },
  { id: "CME-MAN", text: "CME-MAN" },
  { id: "SAFEEN", text: "SAFEEN" },
];

this.shipownerplatformFilteredOptions.next(this.shipownerplatformlist.slice());

// listen for origin List  search field value changes
this.shipownerplatformFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemshipownerplatformlist();
});


this.operatorlist = [
  
    
];

this.operatorFilteredOptions.next(this.operatorlist.slice());

// listen for origin List  search field value changes
this.operatorFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemoperatorlist();
});


this.officialManagerlist = [
  
  { id: "GFS-Safeen", text: "GFS-Safeen" },
  { id: "SMITE", text: "SMITE" },
  { id: "Simatech", text: "Simatech" },
];

this.officialManagerFilteredOptions.next(this.officialManagerlist.slice());

// listen for origin List  search field value changes
this.officialManagerFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemofficialManagerlist();
});

this.shipmanagerlist = [
  { id: "GFS-Safeen", text: "GFS-Safeen" },
  { id: "SMITE", text: "SMITE" },
  { id: "Simatech", text: "Simatech" },
    
];

this.shipmanagerFilteredOptions.next(this.shipmanagerlist.slice());

// listen for origin List  search field value changes
this.shipmanagerFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemshipmanagerlist();
});


this.crewmanagerlist = [
  { id: "(1) ENGINEER", text: "(1) ENGINEER" },
  { id: "(2) OFFICER", text: "(2) OFFICER" },
  { id: "(3) COOK", text: "(3) COOK" },
    
];

this.crewmanagerFilteredOptions.next(this.crewmanagerlist.slice());

// listen for origin List  search field value changes
this.crewmanagerFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemcrewmanagerlist();
});


this.superintendentlist = [
  { id: "(1) ENGINEER", text: "(1) ENGINEER" },
  { id: "(2) OFFICER", text: "(2) OFFICER" },
  { id: "(3) COOK", text: "(3) COOK" },
    
];

this.superintendentFilteredOptions.next(this.superintendentlist.slice());

// listen for origin List  search field value changes
this.superintendentFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
this.filteritemsuperintendentlist();
});


   }
   fleetdatalist(){
    this.httpService.get<any>(this.UdeListService.getfleet).subscribe((res: any) => {
  
      this.fleetlist = res.lCommonUtilityBean;
  
    });
  }
   toggleFleet() {
    // Toggle the state of sliderChecked FormControl
    this.sliderChecked = !this.sliderChecked;

    this.checkboxControl.setValue(!this.checkboxControl.value);
  
    // Update the text based on the state of the checkbox
    this.checkboxText = this.checkboxControl.value ? 'Vessel' : 'Fleet';
  }
  
  
  //  activeStatus(event: any) {
  //   this.active = event.checked;
  // }
   filteritemsuperintendentlist(){
    if (!this.superintendentlist) {
      return;
    }
    // get the search keyword
    let search = this.superintendentFilterCtrl.value;
    if (!search) {
      this.superintendentFilteredOptions.next(this.superintendentlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.superintendentFilteredOptions.next(
      this.superintendentlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemcrewmanagerlist(){
    if (!this.crewmanagerlist) {
      return;
    }
    // get the search keyword
    let search = this.crewmanagerFilterCtrl.value;
    if (!search) {
      this.crewmanagerFilteredOptions.next(this.crewmanagerlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.crewmanagerFilteredOptions.next(
      this.crewmanagerlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemshipmanagerlist(){
    if (!this.shipmanagerlist) {
      return;
    }
    // get the search keyword
    let search = this.shipmanagerFilterCtrl.value;
    if (!search) {
      this.shipmanagerFilteredOptions.next(this.shipmanagerlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.shipmanagerFilteredOptions.next(
      this.shipmanagerlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemofficialManagerlist(){
    if (!this.officialManagerlist) {
      return;
    }
    // get the search keyword
    let search = this.officialManagerFilterCtrl.value;
    if (!search) {
      this.officialManagerFilteredOptions.next(this.officialManagerlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.officialManagerFilteredOptions.next(
      this.officialManagerlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemoperatorlist(){
    if (!this.operatorlist) {
      return;
    }
    // get the search keyword
    let search = this.operatorFilterCtrl.value;
    if (!search) {
      this.operatorFilteredOptions.next(this.operatorlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.operatorFilteredOptions.next(
      this.operatorlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemshipownerplatformlist(){
    if (!this.shipownerplatformlist) {
      return;
    }
    // get the search keyword
    let search = this.shipownerplatformFilterCtrl.value;
    if (!search) {
      this.shipownerplatformFilteredOptions.next(this.shipownerplatformlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.shipownerplatformFilteredOptions.next(
      this.shipownerplatformlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filteritemshipownerlist(){
    if (!this.shipownerlist) {
      return;
    }
    // get the search keyword
    let search = this.shipownerFilterCtrl.value;
    if (!search) {
      this.shipownerFilteredOptions.next(this.shipownerlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.shipownerFilteredOptions.next(
      this.shipownerlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemiceclasslist(){
    if (!this.iceclasslist) {
      return;
    }
    // get the search keyword
    let search = this.iceclassFilterCtrl.value;
    if (!search) {
      this.iceclassFilteredOptions.next(this.iceclasslist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.iceclassFilteredOptions.next(
      this.iceclasslist.filter(title => title.text.toLowerCase().includes(search))
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

   filteritemflaglist(){
    if (!this.flaglist) {
      return;
    }
    // get the search keyword
    let search = this.flagFilterCtrl.value;
    if (!search) {
      this.flagFilteredOptions.next(this.flaglist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.flagFilteredOptions.next(
      this.flaglist.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filteritemleadvesselid(){
    if (!this.leadvesselidlist) {
      return;
    }
    // get the search keyword
    let search = this.leadvesselidFilterCtrl.value;
    if (!search) {
      this.leadvesselidFilteredOptions.next(this.leadvesselidlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.leadvesselidFilteredOptions.next(
      this.leadvesselidlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemfleetvessellist(){
    if (!this.fleetvessellist) {
      return;
    }
    // get the search keyword
    let search = this.fleetvesselFilterCtrl.value;
    if (!search) {
      this.fleetvesselFilteredOptions.next(this.fleetvessellist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.fleetvesselFilteredOptions.next(
      this.fleetvessellist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemvesselClasslist(){
    if (!this.vesselClasslist) {
      return;
    }
    // get the search keyword
    let search = this.vesselClassFilterCtrl.value;
    if (!search) {
      this.vesselClassFilteredOptions.next(this.vesselClasslist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.vesselClassFilteredOptions.next(
      this.vesselClasslist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemreasonlist(){
    if (!this.reasonlist) {
      return;
    }
    // get the search keyword
    let search = this.reasonFilterCtrl.value;
    if (!search) {
      this.reasonFilteredOptions.next(this.reasonlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.reasonFilteredOptions.next(
      this.reasonlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemclassificationlist(){
    if (!this.classificationlist) {
      return;
    }
    // get the search keyword
    let search = this.classificationFilterCtrl.value;
    if (!search) {
      this.classificationFilteredOptions.next(this.classificationlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.classificationFilteredOptions.next(
      this.classificationlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemwagescalelist(){
    if (!this.wagescalelist) {
      return;
    }
    // get the search keyword
    let search = this.wagescaleFilterCtrl.value;
    if (!search) {
      this.wagescaleFilteredOptions.next(this.wagescalelist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.wagescaleFilteredOptions.next(
      this.wagescalelist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemfdanddlist(){
    if (!this.fdanddlist) {
      return;
    }
    // get the search keyword
    let search = this.fdanddFilterCtrl.value;
    if (!search) {
      this.fdanddFilteredOptions.next(this.fdanddlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.fdanddFilteredOptions.next(
      this.fdanddlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filteritemvesselgroup(){
    if (!this.vesselgrouplist) {
      return;
    }
    // get the search keyword
    let search = this.vesselgroupFilterCtrl.value;
    if (!search) {
      this.vesselgroupFilteredOptions.next(this.vesselgrouplist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.vesselgroupFilteredOptions.next(
      this.vesselgrouplist.filter(title => title.text.toLowerCase().includes(search))
    );
   }


   filteritemmachinerylist(){
    if (!this.machinerylist) {
      return;
    }
    // get the search keyword
    let search = this.hullandmachineryFilterCtrl.value;
    if (!search) {
      this.hullandmachineryFilteredOptions.next(this.machinerylist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.hullandmachineryFilteredOptions.next(
      this.machinerylist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritempandilist(){
    if (!this.pandilist) {
      return;
    }
    // get the search keyword
    let search = this.pandiFilterCtrl.value;
    if (!search) {
      this.pandiFilteredOptions.next(this.pandilist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.pandiFilteredOptions.next(
      this.pandilist.filter(title => title.text.toLowerCase().includes(search))
    );
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
 
   filteritemdepartmentlist(){
    if (!this.udetypelist) {
      return;
    }
    // get the search keyword
    let search = this.departmentFilterCtrl.value;
    if (!search) {
      this.departmentFilteredOptions.next(this.udetypelist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.departmentFilteredOptions.next(
      this.udetypelist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemprefixlist(){
    if (!this.prefixlist) {
      return;
    }
    // get the search keyword
    let search = this.prefixFilterCtrl.value;
    if (!search) {
      this.prefixFilteredOptions.next(this.prefixlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.prefixFilteredOptions.next(
      this.prefixlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   onDateChange(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.UdeListService.getDate(event.target.value);
      if (inputFlag == "fromdate") {
        this.docForm.patchValue({ fromdate: cdate });
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
        let fdate = this.UdeListService.getDateObj(inputValue);
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
  formatDate(event: any) {
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



   onDateChange2(event: any, inputFlag: any, index: number) {
    if(event.target.value!=null){
      let cdate = this.UdeListService.getDate(event.target.value);
      if (inputFlag == "todate") {
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
        let fdate = this.UdeListService.getDateObj(inputValue);
        if (inputFlag == "todate") {
          this.docForm.patchValue({
            'todate': inputValue,
            'todateObj':fdate
           });
        }
      }
    }else{
      this.docForm.patchValue({
        'todate': "",
        'todateObj':""
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
            this.docForm.get('todate').setValue(parsedDate);
        }
    }
  }

  generate(){
    this.datasave = [
      {
        refno: 'UDE-64-202',
        date: '10/06/2024',
        vessel: 'ABU SAMRAH',
        description: 'Leaking value/gasket at port side bunker station found during Sludge Disposal operations',
        type: 'Incident',
        category: 'Safety',
        casecol: 'NO',
        closedon: ''
      },
     
    ];  
  }

  
  onCancel() {
    // Cancel logic here
  }
  

 

  fetchDetails(countryCode: any): void {
    
  }
  
  update() {

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

}

