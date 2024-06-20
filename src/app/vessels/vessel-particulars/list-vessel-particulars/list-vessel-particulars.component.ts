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

import { FormBuilder, FormGroup } from '@angular/forms';
import { VesselsParticularsService } from '../vessel-particulars.service';
import { vesselsParticulars } from '../vessal-particulars.model';
// import * as XLSX from 'xlsx';



@Component({
  selector: 'app-list-vessel-particulars',
  templateUrl: './list-vessel-particulars.component.html',
  styleUrls: ['./list-vessel-particulars.component.sass']
})
export class ListVesselParticularsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "vesselcode",
    "vesselname",
    "fleet",
    "vesseltype",

    "actions"
  ];
  docForm: FormGroup;

  dataSource: ExampleDataSource | null;
  exampleDatabase: VesselsParticularsService | null;
  selection = new SelectionModel<vesselsParticulars>(true, []);
  index: number;
  id: number;
  customerMaster: vesselsParticulars | null;
  permissionList: any = [];
  constructor(
    public httpClient: HttpClient, private fb: FormBuilder,
    public dialog: MatDialog,
    public VessalParticularsService: VesselsParticularsService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
    private EncrDecr: EncrDecrService,
    private spinner: NgxSpinnerService,
    private tokenStorageService: TokenStorageService,
  ) {
    super();
    this.docForm = this.fb.group({
      vessaltype: [""],

    });
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

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new VesselsParticularsService(this.httpClient, this.serverUrl, this.httpService);
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
    // var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countryCode);
    this.router.navigate(['/vessels/vessel-particulars/add-vessel-particulars/', row.code]);
  }

  viewCall(row) {
    // var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countryCode);
    this.router.navigate(['/vessels/vessel-particulars/view-vessel-particulars/', row.code]);
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
      data: row.code,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    if (data.data == true) {
      this.spinner.show();
      this.VessalParticularsService.delete(row.code).subscribe({
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
              "Unable to delete",
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

  // exportToExcel() {
  //   const selectedColumns = this.dataSource.filteredData.map(item => ({
  //     VesselCode: item.code,
  //     VesselName: item.name,
  //     Fleet: item.fleet,
  //     VesselType: item.vesseltype,
  //   }));

  //   const ws = XLSX.utils.json_to_sheet(selectedColumns);

  //   const colWidths = selectedColumns.reduce((widths, row) => {
  //     return Object.keys(row).map((key, i) => {
  //       const value = row[key] || '';
  //       return Math.max(widths[i] || 10, value.toString().length);
  //     });
  //   }, []);
    
  //   ws['!cols'] = colWidths.map(w => ({ wch: w }));
    
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Employee Data');
    
  //   const blob = new Blob([this.s2ab(XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }))], {
  //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  //   });
    
  //   const downloadLink = document.createElement('a');
  //   downloadLink.href = URL.createObjectURL(blob);
  //   downloadLink.download = 'Referral-list.xlsx';
  //   downloadLink.click();
  //   URL.revokeObjectURL(downloadLink.href);
  // }

  // private s2ab(s: string): ArrayBuffer {
  //   const buf = new ArrayBuffer(s.length);
  //   const view = new Uint8Array(buf);
  //   for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  //   return buf;
  // }

  search() {

  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  // context menu
  onContextMenu(event: MouseEvent, item: vesselsParticulars) {
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

export class ExampleDataSource extends DataSource<vesselsParticulars> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: vesselsParticulars[] = [];
  renderedData: vesselsParticulars[] = [];
  constructor(
    public exampleDatabase: VesselsParticularsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<vesselsParticulars[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((vesselsParticulars: vesselsParticulars) => {
            const searchStr = (
              vesselsParticulars.vesselcode +
              vesselsParticulars.vesselname +
              vesselsParticulars.fleet +
              vesselsParticulars.vesseltype 


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
  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: vesselsParticulars[]): vesselsParticulars[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "vesselcode":
          [propertyA, propertyB] = [a.vesselcode, b.vesselcode];
          break;
        case "vesselname":
          [propertyA, propertyB] = [a.vesselname, b.vesselname];
          break;
        case "fleet":
          [propertyA, propertyB] = [a.fleet, b.fleet];
          break;
        case "vesseltype":
          [propertyA, propertyB] = [a.vesseltype, b.vesseltype];
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