import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { PersonMaintenanceService } from '../person-maintenance.service';
import { PersonMaintenance } from '../person-maintenance.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from 'src/app/core/service/notification.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-service/common.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ViewChecklistPopupComponent } from '../view-checklist-popup/view-checklist-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ImmigrationSummaryPopupComponent } from '../immigration-summary-popup/immigration-summary-popup.component';

@Component({
  selector: 'app-list-immigration-crew',
  templateUrl: './list-immigration-crew.component.html',
  styleUrls: ['./list-immigration-crew.component.sass'],
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
export class ListImmigrationCrewComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "sNo",
    "surName",
    "name",
    "middle",
    "rank",
    "nationality",
    "signOn",
    "onPort",
    "sBook",
    "sExpiry",
    "pass",
    "pExpiry",
    "usVisa",
    "expiry",
    "bDate",
    "age",
    "actions"
  ];

  docForm: FormGroup;
  dataSource: ExampleDataSource | null;
  exampleDatabase: PersonMaintenanceService | null;
  selection = new SelectionModel<PersonMaintenance>(true, []);
  personMaintenance: PersonMaintenance | null;
  vesselList:any=[];
  rankList:any=[];
  allSelected = false;
  dropdownSettings: IDropdownSettings;
  
  constructor(
    public httpClient: HttpClient,
    public personMaintenanceService: PersonMaintenanceService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    private spinner: NgxSpinnerService,
    public notificationService:NotificationService,
    private fb: FormBuilder,
    private commonService: CommonService,
    public dialog: MatDialog,
  ) {
    super();
    this.docForm = this.fb.group({
      toDate: [""],
      toDateObj: [""],
      vessel: [""],
      rank: [""]
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.loadData();
    this.getvesselList();
    this.getRankList();

    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }

  openImmigrationPopUp(){
    let tempDirection;
    const dialogRef = this.dialog.open(ImmigrationSummaryPopupComponent, {
      data: this.docForm.value.applCode,
      height:"",
      width: "30%",
      direction: tempDirection,
    });  
  }

  getvesselList(){
    this.httpService.get(this.personMaintenanceService.vesselUrl).subscribe({next: (res: any) => {
      this.vesselList = res.lCommonUtilityBean;
    }, error: (err) => console.log(err)
    });
  }

  getRankList(){
    this.httpService.get(this.personMaintenanceService.rankListUrl).subscribe({next: (res: any) => {
        this.rankList = res.lCommonUtilityBean;
      }, error: (err) => console.log(err)
    });
  }

  getDateString(event,id){
    let cdate = this.commonService.getDate(event.target.value);
    if(id == 'toDate'){
      this.docForm.patchValue({toDate : cdate});
    }
  }

  search(){

  }

  public loadData() {
    this.exampleDatabase = new PersonMaintenanceService(this.httpClient,this.serverUrl,this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.docForm
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

}

export class ExampleDataSource extends DataSource<PersonMaintenance> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: PersonMaintenance[] = [];
  renderedData: PersonMaintenance[] = [];
  constructor(
    public exampleDatabase: PersonMaintenanceService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<PersonMaintenance[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
      
    ];

    this.exampleDatabase.getImmigrationCrewList(this.docForm.value);
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((personMaintenance: PersonMaintenance) => {
            const searchStr = (
              personMaintenance.code +
              personMaintenance.surName +
              personMaintenance.name +
              personMaintenance.rank 
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

  sortData(data: PersonMaintenance[]): PersonMaintenance[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "code":
          [propertyA, propertyB] = [a.code, b.code];
          break;
        case "surName":
          [propertyA, propertyB] = [a.surName, b.surName];
          break;
        case "name":
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case "rank":
          [propertyA, propertyB] = [a.rank, b.rank];
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
