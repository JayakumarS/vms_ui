import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PortMasterService } from '../port-master.service';
import { PortMaster } from '../port-master.model';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent, BehaviorSubject, Observable, merge, map } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DeletePortMasterComponent } from '../delete-port-master/delete-port-master.component';

@Component({
  selector: 'app-list-port-master',
  templateUrl: './list-port-master.component.html',
  styleUrls: ['./list-port-master.component.sass']
})
export class ListPortMasterComponent extends UnsubscribeOnDestroyAdapter {
  displayedColumns = [
    // "select",
     "portCode",
     "portName",
     "portType",
     "isActive",
     "actions"
   ];
 
   dataSource: ExampleDataSource | null;
   exampleDatabase: PortMasterService | null;
   selection = new SelectionModel<PortMaster>(true, []);
   index: number;
   id: number;
   customerMaster: PortMaster | null;
   permissionList: any=[];
   constructor(
     public httpClient: HttpClient,
     public dialog: MatDialog,
     public portMasterService: PortMasterService,
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

 public loadData() {
    this.exampleDatabase = new PortMasterService(this.httpClient,this.serverUrl,this.httpService);
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
    //var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countryCode);
    this.router.navigate(['/vessels/master/port-Master/add-port-master', row.portId]);
  }

  viewCall(row) {
    this.router.navigate(['/vessels/master/port-Master/view-port-master/', row.portId]);
  }

  deleteItem(row){ 
    this.id = row.portCode;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    const dialogRef = this.dialog.open(DeletePortMasterComponent, {
         height: "270px",
           width: "400px",
           data: row,
           direction: tempDirection,
         });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      if (data.data == true) {
        this.spinner.show();
        this.portMasterService.portDelete(this.id).subscribe({
          next: (data) => {
            this.spinner.hide();
            if (data.success) {
              this.loadData();
              this.showNotification(
                "snackbar-success",
                "Delete Record Successfully...!!!",
                "bottom",
                "center"
              );
            }
            else{
              this.showNotification(
                "snackbar-danger",
                "You Can't Delete Related Data Exist...!!!",
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
        this.loadData();
      }
  });
    };

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}

export class ExampleDataSource extends DataSource<PortMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: PortMaster[] = [];
  renderedData: PortMaster[] = [];
  constructor(
    public exampleDatabase: PortMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PortMaster[]> {
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
          .filter((portMaster: PortMaster) => {
            const searchStr = (
              portMaster.portCode +
              portMaster.portName +
              portMaster.portType +
              portMaster.isActive
             
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
  sortData(data: PortMaster[]): PortMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "portCode":
          [propertyA, propertyB] = [a.portCode, b.portCode];
          break;
        case "portName":
          [propertyA, propertyB] = [a.portName, b.portName];
          break;
        case "portType":
          [propertyA, propertyB] = [a.portType, b.portType];
          break;
        
          case "isActive":
            [propertyA, propertyB] = [a.isActive, b.isActive];
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