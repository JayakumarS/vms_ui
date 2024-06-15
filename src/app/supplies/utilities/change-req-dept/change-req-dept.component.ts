import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ChangeReqModel } from './change-req-dept.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { ChangeReqDeptService } from './change-req-dept.service';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangeReqPopupComponent } from './change-req-popup/change-req-popup.component';

@Component({
  selector: 'app-change-req-dept',
  templateUrl: './change-req-dept.component.html',
  styleUrls: ['./change-req-dept.component.sass']
})
export class ChangeReqDeptComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "department",
    "code",
    "date",
    "budget",
    "action"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: ChangeReqDeptService | null;
  selection = new SelectionModel<ChangeReqModel>(true, []);
  changereq: ChangeReqModel | null;

  constructor(
    private httpClient:HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    private dialog:MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
     @ViewChild(MatSort, { static: true }) sort: MatSort;
     @ViewChild("filter", { static: true }) filter: ElementRef;
     @ViewChild(MatMenuTrigger)
     contextMenu: MatMenuTrigger;
     contextMenuPosition = { x: "0px", y: "0px" };

     public loadData() {
      this.exampleDatabase = new ChangeReqDeptService(this.httpClient,this.serverUrl,this.httpService);
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

  Popup(row) {
    var jspId=row.jspid;
      let tempDirection;
      if (localStorage.getItem("isRtl") === "true") {
        tempDirection = "rtl";
      } else {
        tempDirection = "ltr";
      }
      const obj = {
        jspId
    }
      const dialogRef = this.dialog.open(ChangeReqPopupComponent, {
        height: "500px",
        width: "500px",
        data: {
          action: obj,
        },
        direction: tempDirection,
      });
    }

  }

export class ExampleDataSource extends DataSource<ChangeReqModel> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ChangeReqModel[] = [];
  renderedData: ChangeReqModel[] = [];
  constructor(
    public exampleDatabase: ChangeReqDeptService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<ChangeReqModel[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((changereq: ChangeReqModel) => {
            const searchStr = (
              changereq.department +
              changereq.code +
              changereq.date +
              changereq.budget 
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

  sortData(data: ChangeReqModel[]): ChangeReqModel[] {
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
        case "code":
          [propertyA, propertyB] = [a.code, b.code];
          break;
        case "date":
          [propertyA, propertyB] = [a.date, b.date];
          break;
        case "budget":
          [propertyA, propertyB] = [a.budget, b.budget];
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
