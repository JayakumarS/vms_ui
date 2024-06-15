import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CitiesAirportsService } from '../cities-airports.service';
import { CitiesAirports } from '../cities-airports.model';
import { HttpClient } from '@angular/common/http';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-list-cities-airports',
  templateUrl: './list-cities-airports.component.html',
  styleUrls: ['./list-cities-airports.component.sass']
})
export class ListCitiesAirportsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "code",
    "title",
    "country",
     "actions"
   ];
  
  dataSource: ExampleDataSource | null;
  exampleDatabase: CitiesAirportsService | null;
  selection = new SelectionModel<CitiesAirports>(true, []);
  citiesAirports: CitiesAirports | null;
  subs: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public citiesAirportsService: CitiesAirportsService,
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
    this.exampleDatabase = new CitiesAirportsService(this.httpClient,this.serverUrl,this.httpService);
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
 
 export class ExampleDataSource extends DataSource<CitiesAirports> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: CitiesAirports[] = [];
  renderedData: CitiesAirports[] = [];
  constructor(
    public exampleDatabase: CitiesAirportsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
 
  connect(): Observable<CitiesAirports[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
 
    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((citiesAirports: CitiesAirports) => {
            const searchStr = (
              citiesAirports.code +
              citiesAirports.title + 
              citiesAirports.country 
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
 
  sortData(data: CitiesAirports[]): CitiesAirports[] {
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
        case "title":
          [propertyA, propertyB] = [a.title, b.title];
          break;
          case "country":
            [propertyA, propertyB] = [a.country, b.country];
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
 