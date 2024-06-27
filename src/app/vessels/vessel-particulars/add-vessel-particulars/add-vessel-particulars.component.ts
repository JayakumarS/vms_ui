import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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
import { vesselsParticulars } from '../vessal-particulars.model';
import { VesselsParticularsService } from '../vessel-particulars.service';
import { SelectableService } from 'ag-grid-community';
import { SearchableSelectComponent } from 'src/app/shared/components/searchable-select/searchable-select.component';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonService } from 'src/app/common-service/common.service';
@Component({
  selector: 'app-add-vessel-particulars',
  templateUrl: './add-vessel-particulars.component.html',
  styleUrls: ['./add-vessel-particulars.component.sass'],
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
export class AddVesselParticularsComponent implements OnInit {


  public prefixFilterCtrl: FormControl = new FormControl();
  prefixFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('prefix', { static: true }) prefix: MatSelect;

  public typeFilterCtrl: FormControl = new FormControl();
  typeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('type', { static: true }) type: MatSelect;


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

  @ViewChild('select', { static: true }) select: SearchableSelectComponent;



  protected onDestroy = new Subject<void>();



  docForm: FormGroup;
  vesselsParticulars: vesselsParticulars;
  currencyList=[];
  edit:boolean=false;
  fleetlist: any = [];
  fleetlist1: { id: string, text: string }[] = [];
  typelist:any;
  vesseltypelist:any;
  prefixlist:any;
  requestId: any;
  decryptRequestId: any;
  machinerylist: any=[];
  vesselgrouplist: any;
  fdanddlist: any;
  wagescalelist: any;
  classificationlist: any;
  reasonlist: any;
  vesselClasslist: any=[]
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
  pandilist: any=[];
  active: boolean=false;
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public VesselsParticularsService: VesselsParticularsService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef,
    public matError : MatErrorService,
    public commonService: CommonService
  ) { 

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
      vesselStatus:[false],
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
      builtdateObj:[""]
    });

  }
  
   ngOnInit() {
      this.getFleetList();
      this.getVesselClassList();
      this.getVesselType();
      this.getPIList();
      this.getHullMachinery();
      this.fdList();
      this.getWageList();
      this.getPortList();
      this.flagList();
      this.getVesselOwner();
      this.getOfficialManager();
      this.getShipManagers();
      this.getCrewManagers();
      this.generateCode();
     // Currency list dropdown
    this.httpService.get<any>(this.VesselsParticularsService.currencyListUrl).subscribe(
       (data) => {
         this.currencyList = data.currencyList;
         this.currtmpList=data.currencyList;
       },
       (error: HttpErrorResponse) => {
        //  console.log(error.name + " " + error.message);
       }
     );

     this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       this.fetchDetails(this.decryptRequestId) ;
      }
     });

     this.prefixlist = [
  
    
    ];
    
    this.prefixFilteredOptions.next(this.prefixlist.slice());

// listen for origin List  search field value changes
this.prefixFilterCtrl.valueChanges
  .pipe(takeUntil(this.onDestroy))
  .subscribe(() => {
    this.filteritemprefixlist();
  });


  this.typelist = [
  
      
  { id: "Dry ", text: "Dry" },
  { id: "World Scale", text: "World Scale" },
  { id: "Chemical", text: "Chemical" },
  ];
  console.log(this.typelist);
  
  this.typeFilteredOptions.next(this.typelist.slice());

// listen for origin List  search field value changes
this.typeFilterCtrl.valueChanges
.pipe(takeUntil(this.onDestroy))
.subscribe(() => {
  this.filteritemtypelist();
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

   ngAfterViewInit() {
    // Now it's safe to access this.select
  }

   getFleetList(){
      this.httpService.get(this.VesselsParticularsService.fleetUrl).subscribe({next: (res: any) => {
        this.fleetlist = res.lCommonUtilityBean.map(item => ({ id: item.id, text: item.text }));
        // console.log(this.fleetlist1);
        // this.select.options = this.fleetlist;
        this.fleetFilteredOptions = this.fleetlist;
        // this.fleetFilteredOptions.next(this.fleetlist.slice());
        // this.fleetFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
        //   this.filteritemfleetlist();
        // });
      }, error: (err) => console.log(err)
     });
   }

   getVesselClassList(){
    this.httpService.get(this.VesselsParticularsService.vesselClassUrl).subscribe({next: (res: any) => {
        this.vesselClasslist = res.lCommonUtilityBean;
        this.vesselClassFilteredOptions.next(this.vesselClasslist.slice());
        this.vesselClassFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.filteritemvesselClasslist();
        });
      }, error: (err) => console.log(err)
    });
   }

   getVesselType(){
    this.httpService.get(this.VesselsParticularsService.vesselTypeUrl).subscribe({next: (res: any) => {
        this.vesseltypelist = res.lCommonUtilityBean;
        this.vesseltypeFilteredOptions.next(this.vesseltypelist.slice());
        this.vesseltypeFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.filteritemvesseltypelist();
        });
      }, error: (err) => console.log(err)
    });
   }

   getPIList(){
    this.httpService.get(this.VesselsParticularsService.vesselInsuranceUrl).subscribe({next: (res: any) => {
        this.pandilist = res.lCommonUtilityBean;
        this.pandiFilteredOptions.next(this.pandilist.slice());
        this.pandiFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.filteritempandilist();
        });
      }, error: (err) => console.log(err)
    });
   }

   getHullMachinery(){
    this.httpService.get(this.VesselsParticularsService.vesselInsuranceUrl).subscribe({next: (res: any) => {
        this.machinerylist = res.lCommonUtilityBean;
        this.hullandmachineryFilteredOptions.next(this.machinerylist.slice());
        this.hullandmachineryFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.filteritemmachinerylist();
        });
      }, error: (err) => console.log(err)
    });
   }

   fdList(){
    this.httpService.get(this.VesselsParticularsService.vesselInsuranceUrl).subscribe({next: (res: any) => {
        this.fdanddlist = res.lCommonUtilityBean;
        this.fdanddFilteredOptions.next(this.fdanddlist.slice());
        this.fdanddFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.filteritemfdanddlist();
        });
      }, error: (err) => console.log(err)
    });
   }

   getWageList(){
    this.httpService.get(this.VesselsParticularsService.wageUrl).subscribe({next: (res: any) => {
        this.wagescalelist = res.lCommonUtilityBean;
        this.wagescaleFilteredOptions.next(this.wagescalelist.slice());
        this.wagescaleFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.filteritemwagescalelist();
        });
      }, error: (err) => console.log(err)
    });
   }

   getPortList(){
    this.httpService.get(this.VesselsParticularsService.portUrl).subscribe({next: (res: any) => {
        this.registryportlist = res.lCommonUtilityBean;
        this.registryportFilteredOptions.next(this.registryportlist.slice());
        this.registryportFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.filteritemregistryportlist();
        });
      }, error: (err) => console.log(err)
    });
   }

   flagList(){
    this.httpService.get(this.VesselsParticularsService.flagUrl).subscribe({next: (res: any) => {
        this.flaglist = res.lCommonUtilityBean;
        this.flagFilteredOptions.next(this.flaglist.slice());
        this.flagFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.filteritemflaglist();
        });
      }, error: (err) => console.log(err)
    });
   }

   getVesselOwner(){
    this.httpService.get(this.VesselsParticularsService.vesselOwnerUrl).subscribe({next: (res: any) => {
        this.shipownerlist = res.lCommonUtilityBean;
        this.shipownerFilteredOptions.next(this.shipownerlist.slice());
        this.shipownerFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.filteritemshipownerlist();
        });
      }, error: (err) => console.log(err)
    });
   }

   getOfficialManager(){
    this.httpService.get(this.VesselsParticularsService.officialMngrUrl).subscribe({next: (res: any) => {
        this.officialManagerlist = res.lCommonUtilityBean;
        this.officialManagerFilteredOptions.next(this.officialManagerlist.slice());
        this.officialManagerFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.filteritemofficialManagerlist();
        });
      }, error: (err) => console.log(err)
    });
   }

   getShipManagers(){
    this.httpService.get(this.VesselsParticularsService.shipMngrUrl).subscribe({next: (res: any) => {  
        this.shipmanagerlist =   res.lCommonUtilityBean; 
        this.shipmanagerFilteredOptions.next(this.shipmanagerlist.slice());
        this.shipmanagerFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
           this.filteritemshipmanagerlist();
        });
        }, error: (err) => console.log(err)
    });
   }

   getCrewManagers(){
    this.httpService.get(this.VesselsParticularsService.shipMngrUrl).subscribe({next: (res: any) => {  
        this.crewmanagerlist =   res.lCommonUtilityBean; 
        this.crewmanagerFilteredOptions.next(this.shipmanagerlist.slice());
        this.crewmanagerFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.filteritemcrewmanagerlist();
        });
        }, error: (err) => console.log(err)
    });
   }

   generateCode(){
    if(!this.edit){
      this.httpService.get(this.VesselsParticularsService.generateCodeUrl).subscribe({next: (res: any) => {
        console.log(res);
          this.docForm.patchValue({
            'code':res.vesselCode
          })
      }, error: (err) => console.log(err)
    });
    }

   }



   activeStatus(event: any) {
    this.active = event.checked;
  }
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
   filteritemfleetlist(){
    if (!this.fleetlist) {
      return;
    }
    // get the search keyword
    let search = this.fleetFilterCtrl.value;
    if (!search) {
      this.fleetFilteredOptions.next(this.fleetlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.fleetFilteredOptions.next(
      this.fleetlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   filteritemtypelist(){
    if (!this.typelist) {
      return;
    }
    // get the search keyword
    let search = this.typeFilterCtrl.value;
    if (!search) {
      this.typeFilteredOptions.next(this.typelist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.typeFilteredOptions.next(
      this.typelist.filter(title => title.text.toLowerCase().includes(search))
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
      let cdate = this.VesselsParticularsService.getDate(event.target.value);
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
        let fdate = this.VesselsParticularsService.getDateObj(inputValue);
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
      let cdate = this.VesselsParticularsService.getDate(event.target.value);
      if (inputFlag == "dateinfleettype") {
        this.docForm.patchValue({ dateinfleettype: cdate });
      }else if(inputFlag == "valiedUntil"){
        this.docForm.patchValue({ valiedUntil: cdate });
      }else if(inputFlag == "builtdate"){
        this.docForm.patchValue({ builtdate: cdate });
      }
    }
  
    // if(this.docForm.value.dueDate!=null){
    //   this.check(this.docForm.value.dueDate);
    // }
  }
  onDateInput2(inputValue: any, inputFlag: any, index: number) {
    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; 
    if(inputValue!=""){
      if (dateFormat.test(inputValue)) {
        let fdate = this.VesselsParticularsService.getDateObj(inputValue);
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
    if(this.docForm.valid){
      this.VesselsParticularsService.saveVesselParticulars(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }
  fetchDetails(id){
    this.httpService.get<any>(this.VesselsParticularsService.editUrl+"?id="+id).subscribe({next: (res: any) => {
      let fleetDate = this.commonService.getDateObj(res.hdrBean.dateinfleettype == null ? "" : res.hdrBean.dateinfleettype);
      let fleetDateId = this.VesselsParticularsService.getDate(res.hdrBean.dateinfleettype == null ? "" : res.hdrBean.dateinfleettype);

      let validUntil = this.commonService.getDateObj(res.hdrBean.valiedUntil == null ? "" : res.hdrBean.valiedUntil);
      let validUntilId = this.VesselsParticularsService.getDate(res.hdrBean.valiedUntil == null ? "" : res.hdrBean.valiedUntil);

      let buildDate = this.commonService.getDateObj(res.mainDtlBean.builtdate == null ? "" : res.mainDtlBean.builtdate);
      let buildDateId = this.commonService.getDate(res.mainDtlBean.builtdate == null ? "" : res.mainDtlBean.builtdate);
      // this.docForm.get('code').disable();
      this.docForm.patchValue({
        'code':res.hdrBean.code,
        'name':res.hdrBean.name,
        'shortname':res.hdrBean.shortname,
        'fleet':res.hdrBean.fleet,
        'vesseltype':res.hdrBean.vesseltype,
        'pandi':res.hdrBean.pandi,
        'hullandmachinery':res.hdrBean.hullandmachinery,
        'vesselgroup':res.hdrBean.vesselgroup,
        'fdandd':res.hdrBean.fdandd,
        'wagescale':res.hdrBean.wagescale,
        'reason':res.hdrBean.reason,
        'valiedUntilObj':validUntil,
        'valiedUntil':res.hdrBean.valiedUntil,
        'leadvesselid':res.hdrBean.leadvesselid,
        'fleetvessel':res.hdrBean.fleetvessel,
        'dateinfleettypeObj':fleetDate,
        'dateinfleettype':res.hdrBean.dateinfleettype,
        'vesselStatus':res.hdrBean.vesselStatus,
        'vesselClass':res.hdrBean.vesselClass,

        //Main Dtls
        'flag':res.mainDtlBean.flag,
        'registryport':res.mainDtlBean.registryport,
        'registryno':res.mainDtlBean.registryno,
        'classno':res.mainDtlBean.classno,
        'builtdateObj':buildDate,
        'builtdate':res.mainDtlBean.builtdate,
        'placeBuild':res.mainDtlBean.placeBuild,
        'yardbuild':res.mainDtlBean.yardbuild,
        'hullno':res.mainDtlBean.hullno,
        'natnumber':res.mainDtlBean.natnumber,
        'mmis':res.mainDtlBean.mmis,
        'iceclass':res.mainDtlBean.iceclass,
        'imono':res.mainDtlBean.imono,
        'callsign':res.mainDtlBean.callsign,

        //Comm Dtls
        'shipowner':res.commDtlBean.shipowner,
        'operator':res.commDtlBean.operator,
        'safteyno':res.commDtlBean.safteyno,

        //Crew Dtls
        'officialManager':res.crewDtlBean.officialManager,
        'shipmanager':res.crewDtlBean.shipmanager,
        'crewmanager':res.crewDtlBean.crewmanager,
        'groupmanager':res.crewDtlBean.groupmanager,
      })

      }, error: (err) => console.log(err)
     });
  }
  
  update() {
    if(this.docForm.valid){
      let fleetDate = this.commonService.getDateObj(this.docForm.value.fleetDate == null ? "" : this.docForm.value.fleetDate);
      // let validUntil = this.commonService.getDateObj(res.hdrBean.valiedUntil == null ? "" : res.hdrBean.valiedUntil);
      // let buildDate = this.commonService.getDateObj(res.mainDtlBean.builtdate == null ? "" : res.mainDtlBean.builtdate);
      this.VesselsParticularsService.updateVesselParticular(this.docForm.value, this.router, this.notificationService);
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
    this.router.navigate(['/vessels/vessel-particulars/list-vessel-particulars']);
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

