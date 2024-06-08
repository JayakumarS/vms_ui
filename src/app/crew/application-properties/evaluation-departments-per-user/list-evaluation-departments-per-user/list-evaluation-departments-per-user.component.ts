import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { EvaluationDepartmentsPerUser } from '../evaluation-departments-per-user.model';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EvaluationDepartmentsPerUserService } from '../evaluation-departments-per-user.service';

@Component({
  selector: 'app-list-evaluation-departments-per-user',
  templateUrl: './list-evaluation-departments-per-user.component.html',
  styleUrls: ['./list-evaluation-departments-per-user.component.sass']
})
export class ListEvaluationDepartmentsPerUserComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "department",
    "userID",
     "actions"
   ];
 
  dataSource: ExampleDataSource | null;
  exampleDatabase: EvaluationDepartmentsPerUserService | null;
  selection = new SelectionModel<EvaluationDepartmentsPerUser>(true, []);
  evaluationDepartmentsPerUser: EvaluationDepartmentsPerUser | null;
  subs: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public evaluationDepartmentsPerUserService: EvaluationDepartmentsPerUserService,
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
    this.exampleDatabase = new EvaluationDepartmentsPerUserService(this.httpClient,this.serverUrl,this.httpService);
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
 
 export class ExampleDataSource extends DataSource<EvaluationDepartmentsPerUser> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: EvaluationDepartmentsPerUser[] = [];
  renderedData: EvaluationDepartmentsPerUser[] = [];
  constructor(
    public exampleDatabase: EvaluationDepartmentsPerUserService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
 
  connect(): Observable<EvaluationDepartmentsPerUser[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
 
    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((evaluationDepartmentsPerUser: EvaluationDepartmentsPerUser) => {
            const searchStr = (
              evaluationDepartmentsPerUser.department +
              evaluationDepartmentsPerUser.userID 
             
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
 
  sortData(data: EvaluationDepartmentsPerUser[]): EvaluationDepartmentsPerUser[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "department":
          [propertyA, propertyB] = [a.department, b.department];
          break;
        case "userID":
          [propertyA, propertyB] = [a.userID, b.userID];
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
 