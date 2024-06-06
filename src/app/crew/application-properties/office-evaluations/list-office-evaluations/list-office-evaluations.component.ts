import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { OfficeEvaluationsService } from '../office-evaluations.service';
import { ofcevaluation } from '../office-evaluations.model';
@Component({
  selector: 'app-list-office-evaluations',
  templateUrl: './list-office-evaluations.component.html',
  styleUrls: ['./list-office-evaluations.component.sass']
})
export class ListOfficeEvaluationsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [

     "name",
     "vessel",
     "evaluationDate",
     
   ];
   dataSource: ExampleDataSource | null;
   exampleDatabase: OfficeEvaluationsService | null;
   selection = new SelectionModel<ofcevaluation>(true, []);
   index: number;
   id: number;
   ofcevaluation: ofcevaluation | null;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public officeEvaluationsService: OfficeEvaluationsService,
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
  this.exampleDatabase = new OfficeEvaluationsService(this.httpClient,this.serverUrl,this.httpService);
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
onContextMenu(event: MouseEvent, item: ofcevaluation) {
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

export class ExampleDataSource extends DataSource<ofcevaluation> {
filterChange = new BehaviorSubject("");
get filter(): string {
  return this.filterChange.value;
}
set filter(filter: string) {
  this.filterChange.next(filter);
}
filteredData: ofcevaluation[] = [];
renderedData: ofcevaluation[] = [];
constructor(
  public exampleDatabase: OfficeEvaluationsService,
  public paginator: MatPaginator,
  public _sort: MatSort
) {
  super();
  // Reset to the first page when the user changes the filter.
  this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
}
/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<ofcevaluation[]> {
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
        .filter((ofcevaluation: ofcevaluation) => {
          const searchStr = (
            ofcevaluation.name +
            ofcevaluation.vessel +
            ofcevaluation.evaluationDate 

           
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
sortData(data: ofcevaluation[]): ofcevaluation[] {
  if (!this._sort.active || this._sort.direction === "") {
    return data;
  }
  return data.sort((a, b) => {
    let propertyA: number | string = "";
    let propertyB: number | string = "";
    switch (this._sort.active) {
      case "name":
        [propertyA, propertyB] = [a.name, b.name];
        break;
      case "vessel":
        [propertyA, propertyB] = [a.vessel, b.vessel];
        break;
      case "evaluationDate":
        [propertyA, propertyB] = [a.evaluationDate, b.evaluationDate];
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