import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { SeamansWorkingShiftService } from '../seamans-working-shift.service';
import { SeamansWorkingShift } from '../seamans-working-shift.model';



@Component({
  selector: 'app-list-seamans-working-shift',
  templateUrl: './list-seamans-working-shift.component.html',
  styleUrls: ['./list-seamans-working-shift.component.sass']
})
export class ListSeamansWorkingShiftComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns=[
    "seaman",
    "vessel",
    "startingDate",
    "endingDate",
    "remarks",
    "isChecked",
    "actions"
  ];
  dataSource: ExampleDataSource | null;
  exampleDatabase: SeamansWorkingShiftService | null;
  selection = new SelectionModel<SeamansWorkingShift>(true, []);
  fleetmodel: SeamansWorkingShift | null;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public SeamansWorkingShiftService: SeamansWorkingShiftService,
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
    this.exampleDatabase = new SeamansWorkingShiftService(this.httpClient,this.serverUrl,this.httpService);
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

  editCall(item){

  }

}
export class ExampleDataSource extends DataSource<SeamansWorkingShift> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: SeamansWorkingShift[] = [];
  renderedData: SeamansWorkingShift[] = [];
  constructor(
    public exampleDatabase: SeamansWorkingShiftService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<SeamansWorkingShift[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((SeamansWorkingShift: SeamansWorkingShift) => {
            const searchStr = (
              SeamansWorkingShift.seaman +
              SeamansWorkingShift.vessel +
              SeamansWorkingShift.startingDate +
              SeamansWorkingShift.endingDate +
              SeamansWorkingShift.remarks +
              SeamansWorkingShift.isChecked 

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

  sortData(data: SeamansWorkingShift[]): SeamansWorkingShift[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "seaman":
          [propertyA, propertyB] = [a.seaman, b.seaman];
          break;
        case "vessel":
          [propertyA, propertyB] = [a.vessel, b.vessel];
          break;
        case "startingDate":
          [propertyA, propertyB] = [a.startingDate, b.startingDate];
          break;
          case "endingDate":
            [propertyA, propertyB] = [a.endingDate, b.endingDate];
            break;
          case "remarks":
            [propertyA, propertyB] = [a.remarks, b.remarks];
            break;
            case "isChecked":
              [propertyA, propertyB] = [a.isChecked, b.isChecked];
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



