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
import { FleetManagersService } from '../fleet-managers.service';
import { fleetmanager } from '../fleet-managers-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteComponent } from './delete/delete.component';
import { ViewFleetManagersComponent } from '../add-fleet-managers/view-fleet-managers/view-fleet-managers.component';


@Component({
  selector: 'app-list-fleet-managers',
  templateUrl: './list-fleet-managers.component.html',
  styleUrls: ['./list-fleet-managers.component.sass']
})
export class ListFleetManagersComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns=[
    "code",
    "fleet",
    "opmanager",
    "techmanager",
    "actions"
  ];
  dataSource: ExampleDataSource | null;
  exampleDatabase: FleetManagersService | null;
  selection = new SelectionModel<fleetmanager>(true, []);
  fleetmodel: fleetmanager | null;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public FleetManagersService: FleetManagersService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,   private spinner: NgxSpinnerService,
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
    this.exampleDatabase = new FleetManagersService(this.httpClient,this.serverUrl,this.httpService);
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

  viewCall(row) {
    // var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countryCode);


    let rowId = row.fleetManagersid
    let tempDirection;
    if (localStorage.getItem("isRtl") == "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    const dialogRef = this.dialog.open(ViewFleetManagersComponent, {
      height: "270px",
      width: "450px",
      data: rowId,
      direction: tempDirection,
      disableClose: true 

    });

  }

  editCall(row) {
    this.router.navigate(['//vessels/maintain/fleet-managers/add-fleet-managers/',row.fleetManagersid]);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  deleteItem(row){
    let tempDirection;
    if (localStorage.getItem("isRtl") == "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    const dialogRef = this.dialog.open(DeleteComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    if (data.data == true) {
      this.spinner.show();
      this.FleetManagersService.delete(row.fleetManagersid).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.loadData();
            this.showNotification(
              "snackbar-success",
              "Record Deleted",
              "bottom",
              "center"
            );
          }
          else{
            this.showNotification(
              "snackbar-danger",
              "Error in Delete",
              "bottom",
              "center"
            );
          }
        },
        error: (error) => {
          this.spinner.hide();
        }
      });
    }else{
      //this.loadData();
    }
    })
  }
}
export class ExampleDataSource extends DataSource<fleetmanager> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: fleetmanager[] = [];
  renderedData: fleetmanager[] = [];
  constructor(
    public exampleDatabase: FleetManagersService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<fleetmanager[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data
        .slice().filter((fleetmanager: fleetmanager) => {
            const searchStr = (
              fleetmanager.fleet +
              fleetmanager.opmanager +
              fleetmanager.techmanager +
              fleetmanager.code

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

  sortData(data: fleetmanager[]): fleetmanager[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "fleet":
          [propertyA, propertyB] = [a.fleet, b.fleet];
          break;
        case "opmanager":
          [propertyA, propertyB] = [a.opmanager, b.opmanager];
          break;
        case "techmanager":
          [propertyA, propertyB] = [a.techmanager, b.techmanager];
          break;

          case "code":
            [propertyA, propertyB] = [a.code, b.code];
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
