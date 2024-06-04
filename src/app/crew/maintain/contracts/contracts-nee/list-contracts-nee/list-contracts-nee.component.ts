import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ContractsNEE } from '../contracts-nee.model';
import { ContractsNEEService } from '../contracts-nee.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-list-contracts-nee',
  templateUrl: './list-contracts-nee.component.html',
  styleUrls: ['./list-contracts-nee.component.sass']
})
export class ListContractsNEEComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "wageScale",
    "validFrom",
    "validTo",
    "actions"
  ];
  
  dataSource: ExampleDataSource | null;
  exampleDatabase: ContractsNEEService | null;
  selection = new SelectionModel<ContractsNEE>(true, []);
  contractsNEE: ContractsNEE | null;
  
  constructor(
   public httpClient: HttpClient,
   public dialog: MatDialog,
   public contractsNEEService: ContractsNEEService,
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
    this.exampleDatabase = new ContractsNEEService(this.httpClient,this.serverUrl,this.httpService);
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


export class ExampleDataSource extends DataSource<ContractsNEE> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ContractsNEE[] = [];
  renderedData: ContractsNEE[] = [];
  constructor(
    public exampleDatabase: ContractsNEEService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<ContractsNEE[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((contractsNEE: ContractsNEE) => {
            const searchStr = (
              contractsNEE.wageScale +
              contractsNEE.currency +
              contractsNEE.validFrom +
              contractsNEE.validTo 
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

  sortData(data: ContractsNEE[]): ContractsNEE[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "wageScale":
          [propertyA, propertyB] = [a.wageScale, b.wageScale];
          break;
        case "currency":
          [propertyA, propertyB] = [a.currency, b.currency];
          break;
        case "validFrom":
          [propertyA, propertyB] = [a.validFrom, b.validFrom];
          break;
        case "validTo":
          [propertyA, propertyB] = [a.validTo, b.validTo];
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
