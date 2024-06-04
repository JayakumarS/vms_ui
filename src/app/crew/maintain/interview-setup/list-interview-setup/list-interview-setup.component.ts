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

@Component({
  selector: 'app-list-interview-setup',
  templateUrl: './list-interview-setup.component.html',
  styleUrls: ['./list-interview-setup.component.sass']
})
export class ListInterviewSetupComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "code",
    "rank",
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
    public router: Router) { 
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
  
    editCall(id){
  
    }
  
    deleteItem(id){
  
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
                interviewSetup.description +
                interviewSetup.rank 
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
          case "description":
            [propertyA, propertyB] = [a.description, b.description];
            break;
          case "rank":
            [propertyA, propertyB] = [a.rank, b.rank];
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
  


