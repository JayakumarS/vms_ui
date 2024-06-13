import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ShipManagers } from '../ship-managers.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { ShipManagersService } from '../ship-managers.service';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-list-ship-managers',
  templateUrl: './list-ship-managers.component.html',
  styleUrls: ['./list-ship-managers.component.sass']
})
export class ListShipManagersComponent extends UnsubscribeOnDestroyAdapter  implements OnInit {

  displayedColumns = [
    "code",
     "name",
     "details1",
     "details2",
     "details3",
     "details4",
     "details5",
     "details6",
     "vat",
      "actions"
    
   ];
 
  dataSource: ExampleDataSource | null;
  exampleDatabase: ShipManagersService | null;
  selection = new SelectionModel<ShipManagers>(true, []);
  shipManagers: ShipManagers | null;
  
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public shipManagersService: ShipManagersService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    private cdr: ChangeDetectorRef
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
    this.exampleDatabase = new ShipManagersService(this.httpClient,this.serverUrl,this.httpService);
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
 
 export class ExampleDataSource extends DataSource<ShipManagers> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ShipManagers[] = [];
  renderedData: ShipManagers[] = [];
  constructor(
    public exampleDatabase: ShipManagersService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
 
  connect(): Observable<ShipManagers[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
 

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((shipManagers: ShipManagers) => {
            const searchStr = (
              shipManagers.code +
              shipManagers.name +
              shipManagers.details1 +
              shipManagers.details2 +
              shipManagers.details3 +
              shipManagers.details4 +
              shipManagers.details5 +
              shipManagers.details6 +
              shipManagers.vat 
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
 
  sortData(data: ShipManagers[]): ShipManagers[] {
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
        case "details1":
          [propertyA, propertyB] = [a.details1, b.details1];
          break;
          case "details2":
          [propertyA, propertyB] = [a.details2, b.details2];
          break;
          case "details3":
           [propertyA, propertyB] = [a.details3, b.details3];
           break;
           case "details4":
             [propertyA, propertyB] = [a.details4, b.details4];
             break;
             case "details5":
               [propertyA, propertyB] = [a.details5, b.details5];
               break;
               case "details6":
                 [propertyA, propertyB] = [a.details6, b.details6];
                 break;
                 case "vat":
                   [propertyA, propertyB] = [a.vat, b.vat];
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
 