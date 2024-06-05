import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalContractsService } from '../personal-contracts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { PersonlContracts } from '../personal-contracts.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-list-personal-contracts',
  templateUrl: './list-personal-contracts.component.html',
  styleUrls: ['./list-personal-contracts.component.sass']
})
export class ListPersonalContractsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "seaMan",
    "rank",
    "validFrom",
    "validTo",
    "actions"
  ];
  
  dataSource: ExampleDataSource | null;
  exampleDatabase: PersonalContractsService | null;
  selection = new SelectionModel<PersonlContracts>(true, [])
  personlContracts: PersonlContracts | null;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public personalContractsService: PersonalContractsService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    private fb: FormBuilder
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
    this.exampleDatabase = new PersonalContractsService(this.httpClient,this.serverUrl,this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
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

export class ExampleDataSource extends DataSource<PersonlContracts> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: PersonlContracts[] = [];
  renderedData: PersonlContracts[] = [];
  constructor(
    public exampleDatabase: PersonalContractsService,
    public paginator: MatPaginator,
    public _sort: MatSort,
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<PersonlContracts[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((personlContracts: PersonlContracts) => {
            const searchStr = (
              personlContracts.code +
              personlContracts.surName +
              personlContracts.name +
              personlContracts.rank 
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

  sortData(data: PersonlContracts[]): PersonlContracts[] {
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
