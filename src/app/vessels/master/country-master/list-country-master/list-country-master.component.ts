import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CountryMasterService} from '../country-master.service'
import { CountryMaster} from '../country-master.model';
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
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { DeleteCountryMasterComponent } from '../delete-country-master/delete-country-master.component';
@Component({
  selector: 'app-list-country-master',
  templateUrl: './list-country-master.component.html',
  styleUrls: ['./list-country-master.component.sass']
})
export class ListCountryMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
   // "select",
    "countryCode",
    "countryName",
    "currencyCode",
    "phoneCode",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: CountryMasterService | null;
  selection = new SelectionModel<CountryMaster>(true, []);
  index: number;
  id: number;
  customerMaster: CountryMaster | null;
  permissionList: any=[];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public countryMasterService: CountryMasterService,
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
    const permissionObj = {
      formCode: 'F9001',
      userId: this.tokenStorageService.getUserId()
    }
    // this.spinner.show();
    // this.purchaseRequestService.getAllPagePermission(permissionObj).subscribe({
    //   next: (data) => {
    //     this.spinner.hide();
    //     if (data.success) {
    //       this.permissionList = data;
    //     }
    //   },
    //   error: (error) => {
    //     this.spinner.hide();
    //   }
    // });

    this.loadData();
  }

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new CountryMasterService(this.httpClient,this.serverUrl,this.httpService);
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
    this.router.navigate(['/vessels/master/country-Master/add-CountryMaster/', row.countryCode]);
  }

  viewCall(row) {
    var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countryCode);
    this.router.navigate(['/master/country-Master/viewCountryMaster/', encrypted]);
  }

  // deleteItem(row) {
  //   this.id = row.countryCode;
  //   let tempDirection;
  //   if (localStorage.getItem("isRtl") === "true") {
  //     tempDirection = "rtl";
  //   } else {
  //     tempDirection = "ltr";
  //   }
  //   const dialogRef = this.dialog.open(DeleteCountryMasterComponent, {
  //     height: "270px",
  //     width: "400px",
  //     data: row,
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
  //     this.loadData();
  //   });
  // }

  deleteItem(row){ 
    this.id = row.countryCode;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    const dialogRef = this.dialog.open(DeleteCountryMasterComponent, {
         height: "270px",
           width: "400px",
           data: row,
           direction: tempDirection,
         });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      if (data.data == true) {
        this.spinner.show();
        this.countryMasterService.countryDelete(this.id).subscribe({
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

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
// context menu
  onContextMenu(event: MouseEvent, item: CountryMaster) {
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

export class ExampleDataSource extends DataSource<CountryMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: CountryMaster[] = [];
  renderedData: CountryMaster[] = [];
  constructor(
    public exampleDatabase: CountryMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<CountryMaster[]> {
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
          .filter((customerMaster: CountryMaster) => {
            const searchStr = (
              customerMaster.countryCode +
              customerMaster.countryName +
              customerMaster.currency
             
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
  sortData(data: CountryMaster[]): CountryMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "countryCode":
          [propertyA, propertyB] = [a.countryCode, b.countryCode];
          break;
        case "countryName":
          [propertyA, propertyB] = [a.countryName, b.countryName];
          break;
        case "currency":
          [propertyA, propertyB] = [a.currency, b.currency];
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