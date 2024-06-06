import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RankShiftService } from '../rank-shift.service';
import { RankShift } from './rank-shift.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-list-rank-shift',
  templateUrl: './list-rank-shift.component.html',
  styleUrls: ['./list-rank-shift.component.sass']
})
export class ListRankShiftComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "vessel",
    "rank",
    "sDate",
    "eDate",
    "remarks",
    "actions"
  ];

 dataSource: ExampleDataSource | null;
 exampleDatabase: RankShiftService | null;
 selection = new SelectionModel<RankShift>(true, []);
 rankShift: RankShift | null;

 constructor(
   public httpClient: HttpClient,
   public dialog: MatDialog,
   public rankShiftService: RankShiftService,
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
   this.exampleDatabase = new RankShiftService(this.httpClient,this.serverUrl,this.httpService);
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

export class ExampleDataSource extends DataSource<RankShift> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: RankShift[] = [];
  renderedData: RankShift[] = [];
  constructor(
    public exampleDatabase: RankShiftService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<RankShift[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((rankShift: RankShift) => {
            const searchStr = (
              rankShift.vessel +
              rankShift.rank + 
              rankShift.sDate +
              rankShift.eDate +
              rankShift.remarks 
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

  sortData(data: RankShift[]): RankShift[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "vessel":
          [propertyA, propertyB] = [a.vessel, b.vessel];
          break;
        case "rank":
          [propertyA, propertyB] = [a.rank, b.rank];
          break;
        case "sDate":
          [propertyA, propertyB] = [a.sDate, b.sDate];
          break;
        case "eDate":
          [propertyA, propertyB] = [a.eDate, b.eDate];
          break; 
        case "remarks":
          [propertyA, propertyB] = [a.remarks, b.remarks];
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
