import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UtilitiesService } from '../utilities.service';
import { Utilities } from '../utilities.model';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { UserLogPopupComponent } from '../user-log-popup/user-log-popup.component';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.sass']
})
export class UserLogComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "logId",
    "user",
    "logDate",
    "logType",
    "logCode",
    "actionId",
    "supplier"
  ];
 dataSource: ExampleDataSource | null;
 exampleDatabase: UtilitiesService | null;
 selection = new SelectionModel<Utilities>(true, []);
 utilities: Utilities | null;

  constructor( private fb: FormBuilder,
    private commonService: CommonService,
    public utilitiesService: UtilitiesService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router) {
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
      this.exampleDatabase = new UtilitiesService(this.httpClient,this.serverUrl,this.httpService);
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

  supplierPopup(row){
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
      const dialogRef = this.dialog.open(UserLogPopupComponent, {
        height: "300px",
        width: "30%",
        data: {
          action: obj,
        },
        direction: tempDirection,
      });
    }
  
  }
  
  export class ExampleDataSource extends DataSource<Utilities> {
    filterChange = new BehaviorSubject("");
    get filter(): string {
      return this.filterChange.value;
    }
    set filter(filter: string) {
      this.filterChange.next(filter);
    }
    filteredData: Utilities[] = [];
    renderedData: Utilities[] = [];
    constructor(
      public exampleDatabase: UtilitiesService,
      public paginator: MatPaginator,
      public _sort: MatSort
    ) {
      super();
      this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    }
  
    connect(): Observable<Utilities[]> {
      const displayDataChanges = [
        this.exampleDatabase.dataChange,
        this._sort.sortChange,
        this.filterChange,
        this.paginator.page,
      ];
  
      this.exampleDatabase.getList();
      return merge(...displayDataChanges).pipe(map(() => {
          this.filteredData = this.exampleDatabase.data.slice().filter((utilities: Utilities) => {
              const searchStr = (
                utilities.logId +
                utilities.user +
                utilities.logDate +
                utilities.logType +
                utilities.logCode +
                utilities.actionId
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
  
    sortData(data: Utilities[]): Utilities[] {
      if (!this._sort.active || this._sort.direction === "") {
        return data;
      }
      return data.sort((a, b) => {
        let propertyA: number | string = "";
        let propertyB: number | string = "";
        switch (this._sort.active) {
          case "logId":
            [propertyA, propertyB] = [a.logId, b.logId];
            break;
          case "user":
            [propertyA, propertyB] = [a.user, b.user];
            break;
          case "logDate":
            [propertyA, propertyB] = [a.logDate, b.logDate];
            break;
          case "logType":
            [propertyA, propertyB] = [a.logType, b.logType];
            break;
          case "logCode":
            [propertyA, propertyB] = [a.logCode, b.logCode];
            break;
          case "actionId":
              [propertyA, propertyB] = [a.actionId, b.actionId];
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