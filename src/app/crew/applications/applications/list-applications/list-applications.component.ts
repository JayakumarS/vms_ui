import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { debounce } from 'lodash';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject, Observable, ReplaySubject, Subject, debounceTime, distinctUntilChanged, fromEvent, map, merge, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApplicationsService } from '../applications.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSort } from '@angular/material/sort';
import { application } from '../applications.model';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-list-applications',
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.sass']
})
export class ListApplicationsComponent extends UnsubscribeOnDestroyAdapter implements OnInit  {
  displayedColumns = [
    "code",
    "name",
    "surname",
    "rank",
    "nation",
    "agent",  
    "actions"
  ];

 dataSource: ExampleDataSource | null;
 exampleDatabase: ApplicationsService | null;
 selection = new SelectionModel<application>(true, []);
 application:application | null;
 constructor(
   public httpClient: HttpClient,
   public dialog: MatDialog,
   public applicationsService: ApplicationsService,
   private snackBar: MatSnackBar,
   private serverUrl:serverLocations,
   private httpService:HttpServiceService,
   public router: Router, private spinner: NgxSpinnerService,
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

 editCall(row){
  this.router.navigate(['/crew/applications/applications/add-applications/', row.code]);

 }
 viewCall(row) {
  this.router.navigate(['/crew/applications/applications/view-applications/', row.code]);

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
    this.applicationsService.delete(row.code).subscribe({
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
            "Error in Deleted",
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
 public loadData() {
   this.exampleDatabase = new ApplicationsService(this.httpClient,this.serverUrl,this.httpService);
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

export class ExampleDataSource extends DataSource<application> {
 filterChange = new BehaviorSubject("");
 get filter(): string {
   return this.filterChange.value;
 }
 set filter(filter: string) {
   this.filterChange.next(filter);
 }
 filteredData: application[] = [];
 renderedData: application[] = [];
 constructor(
   public exampleDatabase: ApplicationsService,
   public paginator: MatPaginator,
   public _sort: MatSort
 ) {
   super();
   this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
 }

 connect(): Observable<application[]> {
   const displayDataChanges = [
     this.exampleDatabase.dataChange,
     this._sort.sortChange,
     this.filterChange,
     this.paginator.page,
   ];

   this.exampleDatabase.getList();
   return merge(...displayDataChanges).pipe(map(() => {
       this.filteredData = this.exampleDatabase.data.slice().filter((application: application) => {
           const searchStr = (
            application.code +
            application.surname +
            application.name +
            application.rank +
            application.nation
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
 
 sortData(data: application[]): application[] {
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
       case "surname":
         [propertyA, propertyB] = [a.surname, b.surname];
         break;
       case "name":
         [propertyA, propertyB] = [a.name, b.name];
         break;
       case "rank":
         [propertyA, propertyB] = [a.rank, b.rank];
         break;
         case "nation":
          [propertyA, propertyB] = [a.nation, b.nation];
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

