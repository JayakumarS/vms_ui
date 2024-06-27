
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable, ReplaySubject, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DeleteComponent } from 'src/app/master/country-master/list-country-master/dialog/delete/delete.component';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { offSign } from '../off-sign.model';
import { OffSignService } from '../off-sign.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-list-off-sign',
  templateUrl: './list-off-sign.component.html',
  styleUrls: ['./list-off-sign.component.sass']
})
export class ListOffSignComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
   // "select",
    "offSignVesselType",
    "createdBy",
    "createdDate",
    "actions"
  ];
  docForm: FormGroup;

  dataSource: ExampleDataSource | null;
  exampleDatabase: OffSignService | null;
  selection = new SelectionModel<offSign>(true, []);
  index: number;
  id: number;
  customerMaster: offSign | null;
  permissionList: any=[];
  vessaltypelist: any;

  constructor(
    public httpClient: HttpClient,private fb: FormBuilder,
    public dialog: MatDialog,
    public OffSignService: OffSignService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    private EncrDecr:EncrDecrService,
    private spinner: NgxSpinnerService,
    private tokenStorageService : TokenStorageService,
  ) {
    super();
    this.docForm = this.fb.group({
      vessaltype: [""],
   
    });
  }
  public vessaltypeFilterCtrl: FormControl = new FormControl();
  vessaltypeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vessaltype', { static: true }) vessaltype: MatSelect;
  protected onDestroy = new Subject<void>();

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
 
    this.vessaltypelist = [
      { id: "RO RO VESSAL", text: "RO RO VESSAL" },
      { id: "TANKER", text: "TANKER" },
    
    ];
    
    this.vessaltypeFilteredOptions.next(this.vessaltypelist.slice());

// listen for origin List  search field value changes
this.vessaltypeFilterCtrl.valueChanges
  .pipe(takeUntil(this.onDestroy))
  .subscribe(() => {
    this.filteritemvessaltypelist();
  });


   }
   filteritemvessaltypelist(){
    if (!this.vessaltypelist) {
      return;
    }
    // get the search keyword
    let search = this.vessaltypeFilterCtrl.value;
    if (!search) {
      this.vessaltypeFilteredOptions.next(this.vessaltypelist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.vessaltypeFilteredOptions.next(
      this.vessaltypelist.filter(title => title.text.toLowerCase().includes(search))
    );
   }

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new OffSignService(this.httpClient,this.serverUrl,this.httpService);
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
    this.router.navigate(['/crew/maintain/off-sign/add-off-sign/', row.offSignId]);
  }

  viewCall(row) {
    var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countryCode);
    this.router.navigate(['/master/country-Master/viewCountryMaster/', encrypted]);
  }

  search(){

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
      this.OffSignService.delete(row.offSignId).subscribe({
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
              "Error in delete",
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

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
// context menu
  onContextMenu(event: MouseEvent, item: offSign) {
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

export class ExampleDataSource extends DataSource<offSign> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: offSign[] = [];
  renderedData: offSign[] = [];
  constructor(
    public exampleDatabase: OffSignService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<offSign[]> {
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
          .filter((offSign: offSign) => {
            const searchStr = (
              offSign.offSignVesselType +
              offSign.createdBy +
              offSign.createdDate    
             
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
  sortData(data: offSign[]): offSign[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "offSignVesselType":
          [propertyA, propertyB] = [a.offSignVesselType, b.offSignVesselType];
          break;
        case "createdBy":
            [propertyA, propertyB] = [a.createdBy, b.createdBy];
          break;
        case "createdDate":
              [propertyA, propertyB] = [a.createdDate, b.createdDate];
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