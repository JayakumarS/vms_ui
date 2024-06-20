import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementRef, ViewChild } from '@angular/core';
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
import { PrefixesService } from '../prefixes.service';
import { PrefixesModel } from '../prefixes.model';
import { DeleteComponent } from 'src/app/master/country-master/list-country-master/dialog/delete/delete.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-prefixes',
  templateUrl: './list-prefixes.component.html',
  styleUrls: ['./list-prefixes.component.sass']
})
export class ListPrefixesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns=[
    "code",
    "description",
    "actions"
  ];
  dataSource: ExampleDataSource | null;
  exampleDatabase: PrefixesService | null;
  selection = new SelectionModel<PrefixesModel>(true, []);
  prefixesmodel: PrefixesModel | null;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public prefixeservice: PrefixesService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    private spinner: NgxSpinnerService,
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
    this.exampleDatabase = new PrefixesService(this.httpClient,this.serverUrl,this.httpService);
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

  editCall(row) {
    this.router.navigate(['/vessels/maintain/prefixes/add-prefixes/', row.code]);
  }

  viewCall(row){
    this.router.navigate(['/vessels/maintain/prefixes/view-prefixes/', row.code]);
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
      this.prefixeservice.delete(row.code).subscribe({
        next: (data) => {
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
              "Error in save",
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

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
export class ExampleDataSource extends DataSource<PrefixesModel>{
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: PrefixesModel[] = [];
  renderedData: PrefixesModel[] = [];
  constructor(
    public exampleDatabase: PrefixesService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<PrefixesModel[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((prefixesmodel: PrefixesModel) => {
            const searchStr = (
              prefixesmodel.code +
              prefixesmodel.description

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

  sortData(data: PrefixesModel[]): PrefixesModel[] {
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
        case "description":
          [propertyA, propertyB] = [a.description, b.description];
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

