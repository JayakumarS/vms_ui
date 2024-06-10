import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, Subject, fromEvent, map, merge, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/common-service/common.service';
import { Crewfam } from '../crew-familiarization.model';
import { CrewFamiliarizationService } from '../crew-familiarization.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';

@Component({
  selector: 'app-list-crew-familiarization',
  templateUrl: './list-crew-familiarization.component.html',
  styleUrls: ['./list-crew-familiarization.component.sass']
})
export class ListCrewFamiliarizationComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  familiarizationList:any=[];
  docForm: FormGroup;
  mastrFlag: boolean = false;

  displayedColumns = [
    "familiarization",
    "actions"
  ];
  
  displayedColumns1 = [
    "seaman",
    "vessel",
    "date",
    "status",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: CrewFamiliarizationService | null;
  selection = new SelectionModel<Crewfam>(true, []);
  crewfam: Crewfam | null;

  dataSourcefam: ExampleDataSourcefam | null;
  exampleDatabasefam: CrewFamiliarizationService | null;
  
  public famTypeFilterCtrl: FormControl = new FormControl();
  famTypeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('famTypeCrew', { static: true }) famTypeCrew: MatSelect;
  protected onDestroy = new Subject<void>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(private fb: FormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public crewFamiliarizationService: CrewFamiliarizationService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router) {
 
      super()
      
      this.docForm = this.fb.group({
        famType: [""],
  
      });
    }

  ngOnInit(): void {
    this.familiarizationList = [{id:"ONBOARD",text:"Shipboard Familiarization"},{id:"ECDIS",text:"ECDIS Familiarization Checklist"},{id:"LIFTING APP",text:"Familiarization - Operate Ship's Lifting Appliance"},
      {id:"BRIEFING",text:"BRIEFING of Mater & Senior Officers"},{id:"DEBRIEFING",text:"DE-BRIEFING of Master & Senior Officers"}
    ];
    this.famTypeFilteredOptions.next(this.familiarizationList.slice());

    this.famTypeFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterfamType();
      });

  this.loadData();
  
  }

  editCall(id){
    this.mastrFlag = true;
    this.loadData1();
    this.mastrFlag = false;
  }
  
  editCall1(){
    this.router.navigate(['/crew/crew-familiarization/add-crew-familiarization']);

  }

  deleteItem(id){

  }

  filterfamType(){
    if (!this.familiarizationList) {
      return;
    }
    let search = this.famTypeFilterCtrl.value;
    if (!search) {
      this.famTypeFilteredOptions.next(this.familiarizationList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.famTypeFilteredOptions.next(
      this.familiarizationList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

  
   public loadData() {
    this.exampleDatabase = new CrewFamiliarizationService(this.httpClient,this.serverUrl,this.httpService);
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

  public loadData1() {
    this.exampleDatabasefam = new CrewFamiliarizationService(this.httpClient,this.serverUrl,this.httpService);
    this.dataSourcefam = new ExampleDataSourcefam(
      this.exampleDatabasefam,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSourcefam) {
          return;
        }
        this.dataSourcefam.filter = this.filter.nativeElement.value;
      }
    );
  }
}

export class ExampleDataSource extends DataSource<Crewfam> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Crewfam[] = [];
  renderedData: Crewfam[] = [];
  constructor(
    public exampleDatabase: CrewFamiliarizationService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<Crewfam[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((crewfam: Crewfam) => {
            const searchStr = (
              crewfam.familiarization 
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

  sortData(data: Crewfam[]): Crewfam[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "familiarization":
          [propertyA, propertyB] = [a.familiarization, b.familiarization];
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

export class ExampleDataSourcefam extends DataSource<Crewfam> {
  filterChange1 = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange1.value;
  }
  set filter(filter: string) {
    this.filterChange1.next(filter);
  }
  filteredData: Crewfam[] = [];
  renderedData: Crewfam[] = [];
  constructor(
    public ExampleDataSourcefam: CrewFamiliarizationService,
    public paginator1: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange1.subscribe(() => (this.paginator1.pageIndex = 0));
  }

  connect(): Observable<Crewfam[]> {
    const displayDataChanges = [
      this.ExampleDataSourcefam.dataChange,
      this._sort.sortChange,
      this.filterChange1,
      this.paginator1.page,
    ];

    this.ExampleDataSourcefam.getList1();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.ExampleDataSourcefam.data.slice().filter((crewfam: Crewfam) => {
            const searchStr = (
              crewfam.seaman +
              crewfam.vessel +
              crewfam.date+
              crewfam.status
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });

        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this.paginator1.pageIndex * this.paginator1.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator1.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}

  sortData(data: Crewfam[]): Crewfam[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "seeman":
          [propertyA, propertyB] = [a.seaman, b.seaman];
          break;
          case "vessel":
            [propertyA, propertyB] = [a.vessel, b.vessel];
            break;
            case "date":
              [propertyA, propertyB] = [a.date, b.date];
              break;
              case "status":
                [propertyA, propertyB] = [a.status, b.status];
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
