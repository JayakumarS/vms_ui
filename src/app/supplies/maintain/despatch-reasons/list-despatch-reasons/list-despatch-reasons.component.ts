import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DespatchReasons } from '../despatch-reasons.model';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DespatchReasonsService } from '../despatch-reasons.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-list-despatch-reasons',
  templateUrl: './list-despatch-reasons.component.html',
  styleUrls: ['./list-despatch-reasons.component.sass']
})
export class ListDespatchReasonsComponent extends UnsubscribeOnDestroyAdapter  implements OnInit {

  displayedColumns = [
    "code",
    "shortDescription",
    "longDescription",
    "periodRange",
    "commends",
     "actions"
   ];
  


  dataSource: ExampleDataSource | null;
  exampleDatabase: DespatchReasonsService | null;
  selection = new SelectionModel<DespatchReasons>(true, []);
  despatchReasons: DespatchReasons | null;
  subs: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public despatchReasonsService: DespatchReasonsService,
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
    this.exampleDatabase = new DespatchReasonsService(this.httpClient,this.serverUrl,this.httpService);
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
 
 export class ExampleDataSource extends DataSource<DespatchReasons> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: DespatchReasons[] = [];
  renderedData: DespatchReasons[] = [];
  constructor(
    public exampleDatabase: DespatchReasonsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
 
  connect(): Observable<DespatchReasons[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((despatchReasons: DespatchReasons) => {
            const searchStr = (
              despatchReasons.code +
              despatchReasons.shortDescription + 
              despatchReasons.longDescription+
              despatchReasons.periodRange +
              despatchReasons.commends 
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
 
  sortData(data: DespatchReasons[]): DespatchReasons[] {
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
        case "shortDescription":
          [propertyA, propertyB] = [a.shortDescription, b.shortDescription];
          break;
          case "longDescription":
            [propertyA, propertyB] = [a.longDescription, b.longDescription];
            break;
            case "periodRange":
              [propertyA, propertyB] = [a.periodRange, b.periodRange];
              break;
              case "commends":
                [propertyA, propertyB] = [a.commends, b.commends];
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
 