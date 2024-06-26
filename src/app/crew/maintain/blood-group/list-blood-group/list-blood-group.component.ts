import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BloodGroupService } from '../blood-group.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { BloodGroup } from '../blood-group.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { DeleteComponent } from './delete/delete.component';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ViewBloodGroupComponent } from '../view-blood-group/view-blood-group.component';

@Component({
  selector: 'app-list-blood-group',
  templateUrl: './list-blood-group.component.html',
  styleUrls: ['./list-blood-group.component.sass']
})
export class ListBloodGroupComponent  extends UnsubscribeOnDestroyAdapter  implements OnInit {

  displayedColumns = [
    "bloodGroupCode",
    "name",
     "actions"
   ];
 
  dataSource: ExampleDataSource | null;
  exampleDatabase: BloodGroupService | null;
  selection = new SelectionModel<BloodGroup>(true, []);
 
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public bloodGroupService: BloodGroupService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    private spinner: NgxSpinnerService,
    public notificationService:NotificationService,
    private EncrDecr: EncrDecrService,
    private tokenStorageService: TokenStorageService
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
 
 

  editCall(row) {
   
    this.router.navigate(['/crew/maintain/blood-group/add-blood-group/', row.bloodGroupId]);
  }

  

  viewCall(row) {
    // // var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countryCode);
    //  this.router.navigate(['/crew/maintain/blood-group/view-blood-group/', row.bloodGroupId]);
     let rowId = row.bloodGroupId
    let tempDirection;
    if (localStorage.getItem("isRtl") == "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    const dialogRef = this.dialog.open(ViewBloodGroupComponent, {
      height: "270px",
      width: "450px",
      data: rowId,
      direction: tempDirection,
      disableClose: true 

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
      this.bloodGroupService.delete(row.bloodGroupId).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.loadData();
            this.notificationService.showNotification(
              "snackbar-success",
              "Record Deleted",
              "bottom",
              "center"
            );
          }
          else{
            this.notificationService.showNotification(
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
 
 
 
  public loadData() {
    this.exampleDatabase = new BloodGroupService(this.httpClient,this.serverUrl,this.httpService);
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


 }


 export class ExampleDataSource extends DataSource<BloodGroup> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: BloodGroup[] = [];
  renderedData: BloodGroup[] = [];
  constructor(
    public exampleDatabase: BloodGroupService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
 
  connect(): Observable<BloodGroup[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
 
    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((bloodGroup: BloodGroup) => {
            const searchStr = (
              bloodGroup.bloodGroupCode +
              bloodGroup.name 
             
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
 
  sortData(data: BloodGroup[]): BloodGroup[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "bloodGroupCode":
          [propertyA, propertyB] = [a.bloodGroupCode, b.bloodGroupCode];
          break;
        case "name":
          [propertyA, propertyB] = [a.name, b.name];
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
 