import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ShipManagersService } from '../ship-managers.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ShipModel } from '../ship-mangers.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { fromEvent, BehaviorSubject, Observable, merge, map } from 'rxjs';

@Component({
  selector: 'app-list-ship-managers',
  templateUrl: './list-ship-managers.component.html',
  styleUrls: ['./list-ship-managers.component.sass']
})
export class ListShipManagersComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns=[
    "shipman",
    "name",
    "actions"
  ];

    dataSource: ExampleDataSource | null;
    exampleDatabase: ShipManagersService | null;
    selection = new SelectionModel<ShipModel>(true, []);
    shipmodel: ShipModel | null;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public shipmanagerservice: ShipManagersService,
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

  addNew(){

  }
  editCall(){

  }

}
export class ExampleDataSource extends DataSource<ShipModel> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ShipModel[] = [];
  renderedData: ShipModel[] = [];
  constructor(
    public exampleDatabase: ShipManagersService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<ShipModel[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((shipmodel: ShipModel) => {
            const searchStr = (
              shipmodel.shipman +
              shipmodel.name

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

  sortData(data: ShipModel[]): ShipModel[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "shipman":
          [propertyA, propertyB] = [a.shipman, b.shipman];
          break;
        case "name":
          [propertyA, propertyB] = [a.name, b.name];
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
