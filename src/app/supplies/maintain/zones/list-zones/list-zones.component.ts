import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DeleteComponent } from 'src/app/master/country-master/list-country-master/dialog/delete/delete.component';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ZonesService } from '../zones.service';
import { Zones } from '../zones.model';

@Component({
  selector: 'app-list-zones',
  templateUrl: './list-zones.component.html',
  styleUrls: ['./list-zones.component.sass']
})
export class ListZonesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [

    "dtlcode",
    "dtldescription",
   
    
  ];
  dataSource: ExampleDataSource | null;
  exampleDatabase: ZonesService | null;
  selection = new SelectionModel<Zones>(true, []);
  index: number;
  id: number;
  Zones: Zones | null;

 constructor(public httpClient: HttpClient,
   public dialog: MatDialog,
   public zonesService: ZonesService,
   private snackBar: MatSnackBar,
   private serverUrl:serverLocations,
   private httpService:HttpServiceService,
   public router: Router,
   private EncrDecr:EncrDecrService,
   private spinner: NgxSpinnerService,
   private tokenStorageService : TokenStorageService,
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
refresh(){
  this.loadData();
}

public loadData() {
  this.exampleDatabase = new ZonesService(this.httpClient,this.serverUrl,this.httpService);
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
}

viewCall(row) {
 
}
deleteItem(row){ 
   
};
private refreshTable() {
  this.paginator._changePageSize(this.paginator.pageSize);
}
// context menu
onContextMenu(event: MouseEvent, item: Zones) {
  event.preventDefault();
  this.contextMenuPosition.x = event.clientX + "px";
  this.contextMenuPosition.y = event.clientY + "px";
  this.contextMenu.menuData = { item: item };
  this.contextMenu.menu.focusFirstItem("mouse");
  this.contextMenu.openMenu();
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

export class ExampleDataSource extends DataSource<Zones> {
filterChange = new BehaviorSubject("");
get filter(): string {
  return this.filterChange.value;
}
set filter(filter: string) {
  this.filterChange.next(filter);
}
filteredData: Zones[] = [];
renderedData: Zones[] = [];
constructor(
  public exampleDatabase: ZonesService,
  public paginator: MatPaginator,
  public _sort: MatSort
) {
  super();
  // Reset to the first page when the user changes the filter.
  this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
}
/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<Zones[]> {
  // Listen for any changes in the base data, sorting, filtering, or pagination
  const displayDataChanges = [
    this.exampleDatabase.dataChange,
    this._sort.sortChange,
    this.filterChange,
    this.paginator.page,
  ];
  this.exampleDatabase.getAllList();
  return merge(...displayDataChanges).pipe(
    map(() => {
      // Filter data
      this.filteredData = this.exampleDatabase.data
        .slice()
        .filter((Zones: Zones) => {
          const searchStr = (
            Zones.dtlcode +
            Zones.dtldescription 
            
           
          ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });
      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());
      // Grab the page's slice of the filtered sorted data.
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
/** Returns a sorted copy of the database data. */
sortData(data: Zones[]): Zones[] {
  if (!this._sort.active || this._sort.direction === "") {
    return data;
  }
  return data.sort((a, b) => {
    let propertyA: number | string = "";
    let propertyB: number | string = "";
    switch (this._sort.active) {
      case "dtlcode":
        [propertyA, propertyB] = [a.dtlcode, b.dtlcode];
        break;
      case "dtldescription":
        [propertyA, propertyB] = [a.dtldescription, b.dtldescription];
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