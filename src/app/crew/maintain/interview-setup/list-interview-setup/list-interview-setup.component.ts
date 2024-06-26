import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InterviewSetup } from '../interview-setup.model';
import { InterviewSetupService } from '../interview-setup.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { DeleteComponent } from 'src/app/master/country-master/list-country-master/dialog/delete/delete.component';
@Component({
  selector: 'app-list-interview-setup',
  templateUrl: './list-interview-setup.component.html',
  styleUrls: ['./list-interview-setup.component.sass']
})
export class ListInterviewSetupComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "rank",
    "description",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: InterviewSetupService | null;
  selection = new SelectionModel<InterviewSetup>(true, []);
  interviewSetup: InterviewSetup | null;

  constructor( public httpClient: HttpClient,
    public dialog: MatDialog,
    public interviewSetupService: InterviewSetupService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    private spinner: NgxSpinnerService,
    public notificationService:NotificationService,
    private EncrDecr: EncrDecrService,
    private tokenStorageService: TokenStorageService) { 
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
     
      this.router.navigate(['/crew/maintain/interview-setup/add-interview/', row.interviewsetupid]);
    }
  
    viewCall(row) {
    
      this.router.navigate(['/crew/maintain/interview-setup/view-interview/', row.interviewsetupid]);
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
        this.interviewSetupService.delete(row.interviewsetupid).subscribe({
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
      this.exampleDatabase = new InterviewSetupService(this.httpClient,this.serverUrl,this.httpService);
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

  export class ExampleDataSource extends DataSource<InterviewSetup> {
    filterChange = new BehaviorSubject("");
    get filter(): string {
      return this.filterChange.value;
    }
    set filter(filter: string) {
      this.filterChange.next(filter);
    }
    filteredData: InterviewSetup[] = [];
    renderedData: InterviewSetup[] = [];
    constructor(
      public exampleDatabase: InterviewSetupService,
      public paginator: MatPaginator,
      public _sort: MatSort
    ) {
      super();
      this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    }
  
    connect(): Observable<InterviewSetup[]> {
      const displayDataChanges = [
        this.exampleDatabase.dataChange,
        this._sort.sortChange,
        this.filterChange,
        this.paginator.page,
      ];
  
      this.exampleDatabase.getList();
      return merge(...displayDataChanges).pipe(map(() => {
          this.filteredData = this.exampleDatabase.data.slice().filter((interviewSetup: InterviewSetup) => {
              const searchStr = (
                interviewSetup.rank +
                interviewSetup.description 
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
  
    sortData(data: InterviewSetup[]): InterviewSetup[] {
      if (!this._sort.active || this._sort.direction === "") {
        return data;
      }
      return data.sort((a, b) => {
        let propertyA: number | string = "";
        let propertyB: number | string = "";
        switch (this._sort.active) {
          case "rank":
            [propertyA, propertyB] = [a.rank, b.rank];
            break;
          case "description":
            [propertyA, propertyB] = [a.description, b.description];
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
  


