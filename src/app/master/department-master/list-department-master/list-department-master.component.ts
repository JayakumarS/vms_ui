import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DepartmentMasterService} from '../department-master.service'
import { DepartmentMaster} from '../department-master.model';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { DeleteDepartmentComponent } from './delete-department/delete-department.component';
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-list-department-master',
  templateUrl: './list-department-master.component.html',
  styleUrls: ['./list-department-master.component.sass']
})
export class ListDepartmentMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

 
  displayedColumns = [
   
    "deptCode",
    "departmentName",
    "departmentHead",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: DepartmentMasterService | null;
  selection = new SelectionModel<DepartmentMaster>(true, []);
  index: number;
  id: number;
  customerMaster: DepartmentMaster | null;

  docForm: FormGroup;
  data2: any;
  permissionList: any=[];
  
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public departmentMasterService: DepartmentMasterService,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router:Router,
    private notificationService : NotificationService,
    private EncrDecr:EncrDecrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private tokenStorageService : TokenStorageService,
  ) {
    super();

    this.docForm = this.fb.group({
      departmentName: [""],
      deptCode: [""]
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
      formCode: 'F9003',
      userId: this.tokenStorageService.getUserId()
    }
    this.spinner.show();
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
    this.onSubmit();
  }

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new DepartmentMasterService(this.httpClient,this.serverUrl,this.httpService);
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
    var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.deptCode);
    this.router.navigate(['/master/department-Master/add-department/', encrypted]);
  }

  viewCall(row) {
    var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.deptCode);
    this.router.navigate(['/master/department-Master/viewDepartment/', encrypted]);
  }

  // deleteItem(row){

  //   this.id = row.deptCode;
  //   let tempDirection;
  //   if (localStorage.getItem("isRtl") === "true") {
  //     tempDirection = "rtl";
  //   } else {
  //     tempDirection = "ltr";
  //   }
  //   const dialogRef = this.dialog.open(DeleteDepartmentComponent, {
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
    this.id = row.deptCode;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    const dialogRef = this.dialog.open(DeleteDepartmentComponent, {
         height: "270px",
           width: "400px",
           data: row,
           direction: tempDirection,
         });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {

      if (data.data == true) {
        
        this.spinner.show();
        this.departmentMasterService.departmentDelete(this.id).subscribe({
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

  onSubmit(){
   
      this.customerMaster = this.docForm.value;
      // console.log(this.customerMaster);
      this.loadData();
  }


  // context menu
  onContextMenu(event: MouseEvent, item: DepartmentMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<DepartmentMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: DepartmentMaster[] = [];
  renderedData: DepartmentMaster[] = [];
  constructor(
    public exampleDatabase: DepartmentMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DepartmentMaster[]> {
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
          .filter((departmentMaster: DepartmentMaster) => {
            const searchStr = (
              departmentMaster.deptCode +
              departmentMaster.departmentName +
              departmentMaster.departmentHead 
             
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
  sortData(data: DepartmentMaster[]): DepartmentMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "deptCode":
          [propertyA, propertyB] = [a.deptCode, b.deptCode];
          break;
        case "departmentName":
          [propertyA, propertyB] = [a.departmentName, b.departmentName];
          break;
        case "departmentHead":
          [propertyA, propertyB] = [a.departmentHead, b.departmentHead];
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