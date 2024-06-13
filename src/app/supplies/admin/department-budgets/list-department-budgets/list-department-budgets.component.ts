import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DepartmentBudgetsService } from '../department-budgets.service';
import { DepartmentBudget } from '../department-budgets.model';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-list-department-budgets',
  templateUrl: './list-department-budgets.component.html',
  styleUrls: ['./list-department-budgets.component.sass']
})
export class ListDepartmentBudgetsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "department",
    "desc",
    "alert",
    "valid",
    "actions"
  ];

 dataSource: ExampleDataSource | null;
 exampleDatabase: DepartmentBudgetsService | null;
 selection = new SelectionModel<DepartmentBudget>(true, []);
 vesselBudgetPeriods: DepartmentBudget | null;
 constructor(
   public httpClient: HttpClient,
   public dialog: MatDialog,
   public departmentBudgetsService: DepartmentBudgetsService,
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
    this.exampleDatabase = new DepartmentBudgetsService(this.httpClient,this.serverUrl,this.httpService);
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

export class ExampleDataSource extends DataSource<DepartmentBudget> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: DepartmentBudget[] = [];
  renderedData: DepartmentBudget[] = [];
  constructor(
    public exampleDatabase: DepartmentBudgetsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<DepartmentBudget[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((departmentBudget: DepartmentBudget) => {
            const searchStr = (
              departmentBudget.department +
              departmentBudget.desc +
              departmentBudget.alert +
              departmentBudget.valid 
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

  sortData(data: DepartmentBudget[]): DepartmentBudget[] {
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
        case "desc":
          [propertyA, propertyB] = [a.desc, b.desc];
          break;
        case "alert":
          [propertyA, propertyB] = [a.alert, b.alert];
          break;
        case "valid":
          [propertyA, propertyB] = [a.valid, b.valid];
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
