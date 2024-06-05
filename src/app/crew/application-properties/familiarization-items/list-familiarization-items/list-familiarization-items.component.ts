import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FamiliarizationItems } from '../familiarization-items.model';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { FamiliarizationItemsService } from '../familiarization-items.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { CommonService } from 'src/app/common-service/common.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-list-familiarization-items',
  templateUrl: './list-familiarization-items.component.html',
  styleUrls: ['./list-familiarization-items.component.sass']
})
export class ListFamiliarizationItemsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "code",
    "description",
    "sorting",
    "actions"
  ];

 dataSource: ExampleDataSource | null;
 exampleDatabase: FamiliarizationItemsService | null;
 selection = new SelectionModel<FamiliarizationItems>(true, []);
 familiarizationItems: FamiliarizationItems | null;

  constructor( private fb: FormBuilder,
    private commonService: CommonService,
    public familiarizationItemsService: FamiliarizationItemsService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar, 
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router) {
      super();

     }
  ngOnInit(): void {
    this.loadData();
  }

     @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
     @ViewChild(MatSort, { static: true }) sort: MatSort;
     @ViewChild("filter", { static: true }) filter: ElementRef;
     @ViewChild(MatMenuTrigger)
     contextMenu: MatMenuTrigger;
     contextMenuPosition = { x: "0px", y: "0px" };

     public loadData() {
      this.exampleDatabase = new FamiliarizationItemsService(this.httpClient,this.serverUrl,this.httpService);
      this.dataSource = new ExampleDataSource(
        this.exampleDatabase,
        this.paginator,
        this.sort,
  
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
  
  export class ExampleDataSource extends DataSource<FamiliarizationItems> {
    filterChange = new BehaviorSubject("");
    get filter(): string {
      return this.filterChange.value;
    }
    set filter(filter: string) {
      this.filterChange.next(filter);
    }
    filteredData: FamiliarizationItems[] = [];
    renderedData: FamiliarizationItems[] = [];
    constructor(
      public exampleDatabase: FamiliarizationItemsService,
      public paginator: MatPaginator,
      public _sort: MatSort
    ) {
      super();
      this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    }
  
    connect(): Observable<FamiliarizationItems[]> {
      const displayDataChanges = [
        this.exampleDatabase.dataChange,
        this._sort.sortChange,
        this.filterChange,
        this.paginator.page,
      ];
  
      this.exampleDatabase.getList();
      return merge(...displayDataChanges).pipe(map(() => {
          this.filteredData = this.exampleDatabase.data.slice().filter((familiarizationItems: FamiliarizationItems) => {
              const searchStr = (
                familiarizationItems.code +
                familiarizationItems.description +
                familiarizationItems.sorting
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
  
    sortData(data: FamiliarizationItems[]): FamiliarizationItems[] {
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
          case "description":
            [propertyA, propertyB] = [a.description, b.description];
            break;
          case "sorting":
            [propertyA, propertyB] = [a.sorting, b.sorting];
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
