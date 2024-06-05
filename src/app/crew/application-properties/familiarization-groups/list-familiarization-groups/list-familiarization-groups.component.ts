import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, BehaviorSubject, Observable, merge, map } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Familiarization } from '../../familiarization-types/familiarization-type.model';
import { FamiliarizationTypesService } from '../../familiarization-types/familiarization-types.service';
import { FamiliarizationGroups } from '../familiarization-groups.model';
import { FamiliarizationGroupsService } from '../familiarization-groups.service';

@Component({
  selector: 'app-list-familiarization-groups',
  templateUrl: './list-familiarization-groups.component.html',
  styleUrls: ['./list-familiarization-groups.component.sass']
})
export class ListFamiliarizationGroupsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "code",
    "description",
    "sorting",
    "actions"
  ];

 dataSource: ExampleDataSource | null;
 exampleDatabase: FamiliarizationGroupsService | null;
 selection = new SelectionModel<Familiarization>(true, []);
 familiarization: Familiarization | null;

  constructor( private fb: FormBuilder,
    private commonService: CommonService,
    public familiarizationGroupsService: FamiliarizationGroupsService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router) {
      super();

     }
  ngOnInit(): void {
    
  }

     @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
     @ViewChild(MatSort, { static: true }) sort: MatSort;
     @ViewChild("filter", { static: true }) filter: ElementRef;
     @ViewChild(MatMenuTrigger)
     contextMenu: MatMenuTrigger;
     contextMenuPosition = { x: "0px", y: "0px" };

     public loadData() {
      this.exampleDatabase = new FamiliarizationGroupsService(this.httpClient,this.serverUrl,this.httpService);
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
  
  export class ExampleDataSource extends DataSource<FamiliarizationGroups> {
    filterChange = new BehaviorSubject("");
    get filter(): string {
      return this.filterChange.value;
    }
    set filter(filter: string) {
      this.filterChange.next(filter);
    }
    filteredData: FamiliarizationGroups[] = [];
    renderedData: FamiliarizationGroups[] = [];
    constructor(
      public exampleDatabase: FamiliarizationGroupsService,
      public paginator: MatPaginator,
      public _sort: MatSort
    ) {
      super();
      this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    }
  
    connect(): Observable<FamiliarizationGroups[]> {
      const displayDataChanges = [
        this.exampleDatabase.dataChange,
        this._sort.sortChange,
        this.filterChange,
        this.paginator.page,
      ];
  
      this.exampleDatabase.getList();
      return merge(...displayDataChanges).pipe(map(() => {
          this.filteredData = this.exampleDatabase.data.slice().filter((familiarizationGroups: FamiliarizationGroups) => {
              const searchStr = (
                familiarizationGroups.code +
                familiarizationGroups.description +
                familiarizationGroups.sorting
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
  
    sortData(data: FamiliarizationGroups[]): FamiliarizationGroups[] {
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
