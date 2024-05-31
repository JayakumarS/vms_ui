import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { UserLogService } from 'src/app/admin/user-log/user-log.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserMaster } from '../user-master.model';
import { UserMasterService } from '../user-master.service';
import { DeleteUserMasterComponent } from './delete-user-master/delete-user-master.component';

@Component({
  selector: 'app-list-user-master',
  templateUrl: './list-user-master.component.html',
  styleUrls: ['./list-user-master.component.sass']
})
export class ListUserMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "UserId",
    "fullName",
    "designation",
    "department",
    "emailId",
    // "contactNumber",
    // "address",
    // "location",
    // "company",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: UserMasterService | null;
  selection = new SelectionModel<UserMaster>(true, []);
  userMaster: UserMaster | null;
  docForm: FormGroup;
  id: any;
  permissionList: any = [];


  constructor(
    private fb: FormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public userMasterService: UserMasterService,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    private EncrDecr: EncrDecrService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private tokenStorageService: TokenStorageService,
  ) {
    super();
    this.docForm = this.fb.group({
      fullName: [""],

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
      formCode: 'F9027',
      userId: this.tokenStorageService.getUserId()
    }
    
    
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new UserMasterService(this.httpClient, this.serverUrl, this.httpService,this.spinner);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.docForm

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
    var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.id);
    this.router.navigate(['/admin/userMaster/add-user-master/', encrypted]);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  deleteItem(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    const dialogRef = this.dialog.open(DeleteUserMasterComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {

      if (data.data == true) {

        this.spinner.show();
        this.userMasterService.userMasterDelete(this.id).subscribe({
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
            else {
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

      } else {
        this.loadData();
      }
    });
  };


}

export class ExampleDataSource extends DataSource<UserMaster> {
  filterChange = new BehaviorSubject("");

  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UserMaster[] = [];
  renderedData: UserMaster[] = [];
  constructor(
    public exampleDatabase: UserMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserMaster[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getAllList(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((userMaster: UserMaster) => {
            const searchStr = (
              userMaster.fullName

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
  sortData(data: UserMaster[]): UserMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "fullName":
          [propertyA, propertyB] = [a.fullName, b.fullName];
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
