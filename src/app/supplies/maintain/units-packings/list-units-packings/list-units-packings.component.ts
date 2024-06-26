import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnitsPackingsService } from '../units-packings.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UnitsPackings } from '../units-packings.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-list-units-packings',
  templateUrl: './list-units-packings.component.html',
  styleUrls: ['./list-units-packings.component.sass']
})
export class ListUnitsPackingsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "unitGroup",
    "conversionFactor",
    "abbreviation",
    "unitLock",
     "actions"
   ];
 

  dataSource: ExampleDataSource | null;
  exampleDatabase: UnitsPackingsService | null;
  selection = new SelectionModel<UnitsPackings>(true, []);
  unitsPackings: UnitsPackings | null;
  subs: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public unitsPackingsService: UnitsPackingsService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router
  ) {
    super();
  }
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
 
  ngOnInit(): void {
    this.loadData();
  }
 
  editCall(id){
 
  }
 
  deleteItem(id){
 
  }
 
  public loadData() {
    this.exampleDatabase = new UnitsPackingsService(this.httpClient,this.serverUrl,this.httpService);
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
 }
 
 export class ExampleDataSource extends DataSource<UnitsPackings> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UnitsPackings[] = [];
  renderedData: UnitsPackings[] = [];
  constructor(
    public exampleDatabase: UnitsPackingsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
 
  connect(): Observable<UnitsPackings[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((unitsPackings: UnitsPackings) => {
            const searchStr = (
              unitsPackings.unitGroup +
              unitsPackings.conversionFactor + 
              unitsPackings.abbreviation+
              unitsPackings.unitLock 
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
 
  sortData(data: UnitsPackings[]): UnitsPackings[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "unitGroup":
          [propertyA, propertyB] = [a.unitGroup, b.unitGroup];
          break;
        case "conversionFactor":
          [propertyA, propertyB] = [a.conversionFactor, b.conversionFactor];
          break;
          case "abbreviation":
            [propertyA, propertyB] = [a.abbreviation, b.abbreviation];
            break;
            case "abbreviation":
              [propertyA, propertyB] = [a.abbreviation, b.abbreviation];
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
 