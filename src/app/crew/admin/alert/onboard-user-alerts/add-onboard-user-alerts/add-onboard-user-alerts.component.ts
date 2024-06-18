import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, ReplaySubject, Subject, fromEvent, map, merge, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { ApplicationsService } from 'src/app/crew/applications/applications.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { OnboardUserAlertsService } from '../onboard-user-alerts.service';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { application } from 'src/app/crew/applications/applications/applications.model';
import { UserAlerts } from '../onboard-user-alerts.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-onboard-user-alerts',
  templateUrl: './add-onboard-user-alerts.component.html',
  styleUrls: ['./add-onboard-user-alerts.component.sass']
})
export class AddOnboardUserAlertsComponent  extends UnsubscribeOnDestroyAdapter implements OnInit  {
  displayedColumns = [
    "vessel",
    "dataType",
    "actions"
  ];

 dataSource: ExampleDataSource | null;
 exampleDatabase: OnboardUserAlertsService | null;
 selection = new SelectionModel<UserAlerts>(true, []);
 userAlerts:UserAlerts | null;
  requestId: number;
  edit:boolean=false;
  nationalityList:any;
  dataTypeList:any;
  vesselList : any = [];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  public nationalityListFilterCtrl: FormControl = new FormControl();
  nationalityListFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('nation', { static: true }) nation: MatSelect;

  public userListFilterCtrl: FormControl = new FormControl();
  userListFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('userFilter', { static: true }) userFilter: MatSelect;

  public dataTypeListFilterCtrl: FormControl = new FormControl();
  dataTypeListFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('dataTypeFilter', { static: true }) dataTypeFilter: MatSelect;

  protected onDestroy = new Subject<void>();
  docForm: FormGroup;
  userList : any;
  allSelected = false;
  dropdownSettings: IDropdownSettings;

  public vesselFilterCtrl: FormControl = new FormControl();
  vesselFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vesselFilter', { static: true }) vesselFilter: MatSelect;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private applicationsService: ApplicationsService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private serverUrl: serverLocations,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private authService: AuthService, 
    private EncrDecr: EncrDecrService,) {

      super()
     }

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    this.docForm = this.fb.group({
      user : [""],
      dataType : [""],
      fromVessel : [""],
      toVessel : [""],
    })


    this.nationalityList = [{id:1,text:"Indian"},{id:2,text:"Others"}];
    this.nationalityListFilteredOptions.next(this.nationalityList.slice());

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
      }
     });

     this.nationalityListFilterCtrl.valueChanges
     .pipe(takeUntil(this.onDestroy))
     .subscribe(() => {
       this.filternationality();
     });

     this.userList = [{id:1,text:"Lavanya"},{id:2,text:"Arthi"},{id:3,text:"Balaji"},{id:4,text:"Priya"}];
     this.userListFilteredOptions.next(this.userList.slice());

     this.userListFilterCtrl.valueChanges
     .pipe(takeUntil(this.onDestroy))
     .subscribe(() => {
       this.filterUser();
     });

     this.dataTypeList = [{id:1,text:"VOYAGE DETAILS"},{id:2,text:"HEALTH ITEM"},{id:3,text:"INJURY REPORTS"},{id:4,text:"REMARKS"}];
     this.dataTypeListFilteredOptions.next(this.dataTypeList.slice());

     this.dataTypeListFilterCtrl.valueChanges
     .pipe(takeUntil(this.onDestroy))
     .subscribe(() => {
       this.filterDataType();
     });

     this.vesselList = [{id:1,text:"GODA-GODAVARI"},{id:2,text:"RJG-RAJIV GANDHI"},{id:3,text:"IDG-INDIRA GANDHI"},{id:4,text:"ARJ-TCI ARJUN"}];
     this.vesselFilteredOptions.next(this.vesselList.slice());
 
     this.vesselFilterCtrl.valueChanges
       .pipe(takeUntil(this.onDestroy))
       .subscribe(() => {
         this.filtervessel();
       });
 

     this.loadData();
     
  }
  public loadData() {
    this.exampleDatabase = new OnboardUserAlertsService(this.httpClient,this.serverUrl,this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
  filternationality(){
    if (!this.nationalityList || !this.nationalityListFilterCtrl) {
      return;
    }
  
    // get the search keyword
    let search = this.nationalityListFilterCtrl.value;
    if (!search) {
      this.nationalityListFilteredOptions.next(this.nationalityList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    // filter the banks
    this.nationalityListFilteredOptions.next(
      this.nationalityList.filter(title => title.text && title.text.toLowerCase().includes(search))
    );
  }
  filterDataType(){
    if (!this.dataTypeList) {
      return;
    }
  
    // get the search keyword
    let search = this.dataTypeListFilterCtrl.value;
    if (!search) {
      this.dataTypeListFilteredOptions.next(this.dataTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    // filter the banks
    this.dataTypeListFilteredOptions.next(
      this.dataTypeList.filter(title => title.text && title.text.toLowerCase().includes(search))
    );
  }

  filterUser(){
    if (!this.userList) {
      return;
    }
  
    // get the search keyword
    let search = this.userListFilterCtrl.value;
    if (!search) {
      this.userListFilteredOptions.next(this.userList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    // filter the banks
    this.userListFilteredOptions.next(
      this.userList.filter(title => title.text && title.text.toLowerCase().includes(search))
    );
  }

  filtervessel(){
    if (!this.vesselList) {
      return;
    }
    let search = this.vesselFilterCtrl.value;
    if (!search) {
      this.vesselFilteredOptions.next(this.vesselList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.vesselFilteredOptions.next(
      this.vesselList.filter(title => title.text.toLowerCase().includes(search))
    );
   }


}

export class ExampleDataSource extends DataSource<UserAlerts> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UserAlerts[] = [];
  renderedData: UserAlerts[] = [];
  constructor(
    public exampleDatabase: OnboardUserAlertsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
 
  connect(): Observable<UserAlerts[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
 
    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((userAlerts: UserAlerts) => {
            const searchStr = (
              userAlerts.vessel +
              userAlerts.dataType 
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
 
        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  
  sortData(data: UserAlerts[]): UserAlerts[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "vessel":
          [propertyA, propertyB] = [a.vessel, b.vessel];
          break;
        case "dataType":
          [propertyA, propertyB] = [a.dataType, b.dataType];
          break;
 
          
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
 }
