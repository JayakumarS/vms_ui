import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TravelAgenciesService } from '../travel-agencies.service';
import { TravelAgencies } from '../travel-agencies.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-list-travel-agencies',
  templateUrl: './list-travel-agencies.component.html',
  styleUrls: ['./list-travel-agencies.component.sass']
})
export class ListTravelAgenciesComponent extends UnsubscribeOnDestroyAdapter  implements OnInit {

  displayedColumns = [
    "code",
    "name",
    "travelAgent",
    "autosent",
    "responsible",
    "fax",
    "phones",
    "postCode",
    "city",
    "address",
    "email",
     "actions"
   ];
   
  dataSource: ExampleDataSource | null;
  exampleDatabase: TravelAgenciesService | null;
  selection = new SelectionModel<TravelAgencies>(true, []);
  travelAgencies: TravelAgencies | null;
  subs: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public travelAgenciesService: TravelAgenciesService,
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
    this.exampleDatabase = new TravelAgenciesService(this.httpClient,this.serverUrl,this.httpService);
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
 
 export class ExampleDataSource extends DataSource<TravelAgencies> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: TravelAgencies[] = [];
  renderedData: TravelAgencies[] = [];
  constructor(
    public exampleDatabase: TravelAgenciesService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
 
  connect(): Observable<TravelAgencies[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
  
    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((travelAgencies: TravelAgencies) => {
            const searchStr = (
              travelAgencies.code +
              travelAgencies.name + 
              travelAgencies.travelAgent +
              travelAgencies.autosent +
              travelAgencies.responsible +
              travelAgencies.fax +
              travelAgencies.phones +
              travelAgencies.postCode +
              travelAgencies.city +
              travelAgencies.address +
              travelAgencies.email 
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
  
  sortData(data: TravelAgencies[]): TravelAgencies[] {
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
        case "name":
          [propertyA, propertyB] = [a.name, b.name];
          break;
          case "travelAgent":
            [propertyA, propertyB] = [a.travelAgent, b.travelAgent];
            break;
            case "autosent":
              [propertyA, propertyB] = [a.autosent, b.autosent];
              break;
              case "responsible":
                [propertyA, propertyB] = [a.responsible, b.responsible];
                break;
                case "fax":
                  [propertyA, propertyB] = [a.fax, b.fax];
                  break;
                  case "phones":
                    [propertyA, propertyB] = [a.phones, b.phones];
                    break;
                    case "postCode":
                      [propertyA, propertyB] = [a.postCode, b.postCode];
                      break;
                      case "city":
                        [propertyA, propertyB] = [a.city, b.city];
                        break;
                        case "address":
                          [propertyA, propertyB] = [a.address, b.address];
                          break;
                          case "email":
                            [propertyA, propertyB] = [a.email, b.email];
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
 