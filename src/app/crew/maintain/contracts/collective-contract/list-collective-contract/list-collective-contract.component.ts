import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CollectiveContractService } from '../collective-contract.service';
import { CollectiveContract } from '../collective-contract.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-collective-contract',
  templateUrl: './list-collective-contract.component.html',
  styleUrls: ['./list-collective-contract.component.sass']
})
export class ListCollectiveContractComponent extends UnsubscribeOnDestroyAdapter implements OnInit {  
  
displayedColumns = [
  "nationality",
  "rank",
  "wageScale",
  "validFrom",
  "validTo",
  "actions"
];

dataSource: ExampleDataSource | null;
exampleDatabase: CollectiveContractService | null;
selection = new SelectionModel<CollectiveContract>(true, []);
collectiveContract: CollectiveContract | null;

constructor(
 public httpClient: HttpClient,
 public dialog: MatDialog,
 public collectiveContractService: CollectiveContractService,
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
 this.exampleDatabase = new CollectiveContractService(this.httpClient,this.serverUrl,this.httpService);
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

export class ExampleDataSource extends DataSource<CollectiveContract> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: CollectiveContract[] = [];
  renderedData: CollectiveContract[] = [];
  constructor(
    public exampleDatabase: CollectiveContractService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<CollectiveContract[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((collectiveContract: CollectiveContract) => {
            const searchStr = (
              collectiveContract.code +
              collectiveContract.surName +
              collectiveContract.name +
              collectiveContract.rank 
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

  sortData(data: CollectiveContract[]): CollectiveContract[] {
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
