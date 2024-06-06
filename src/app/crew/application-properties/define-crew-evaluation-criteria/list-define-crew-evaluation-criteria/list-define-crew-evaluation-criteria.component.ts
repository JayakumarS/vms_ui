import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DefineCrewEvaluationCriteria } from '../define-crew-evaluation-criteria.model';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { DefineCrewEvaluationCriteriaService } from '../define-crew-evaluation-criteria.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-list-define-crew-evaluation-criteria',
  templateUrl: './list-define-crew-evaluation-criteria.component.html',
  styleUrls: ['./list-define-crew-evaluation-criteria.component.sass']
})
export class ListDefineCrewEvaluationCriteriaComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

    displayedColumns = [
     "evaluationCriteria",
     "evaluationDescription",
     "vsl",
     "actions"
   ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: DefineCrewEvaluationCriteriaService | null;
  selection = new SelectionModel<DefineCrewEvaluationCriteria>(true, []);
  defineCrewEvaluationCriteria: DefineCrewEvaluationCriteria | null;
  subs: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public defineCrewEvaluationCriteriaService: DefineCrewEvaluationCriteriaService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router
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

  editCall(id){

  }

  deleteItem(id){

  }

  public loadData() {
    this.exampleDatabase = new DefineCrewEvaluationCriteriaService(this.httpClient,this.serverUrl,this.httpService);
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

export class ExampleDataSource extends DataSource<DefineCrewEvaluationCriteria> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: DefineCrewEvaluationCriteria[] = [];
  renderedData: DefineCrewEvaluationCriteria[] = [];
  constructor(
    public exampleDatabase: DefineCrewEvaluationCriteriaService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<DefineCrewEvaluationCriteria[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((defineCrewEvaluationCriteria: DefineCrewEvaluationCriteria) => {
            const searchStr = (
              defineCrewEvaluationCriteria.evaluationCriteria +
              defineCrewEvaluationCriteria.evaluationDescription +
              defineCrewEvaluationCriteria.vsl 
             
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

  sortData(data: DefineCrewEvaluationCriteria[]): DefineCrewEvaluationCriteria[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "code":
          [propertyA, propertyB] = [a.evaluationCriteria, b.evaluationCriteria];
          break;
        case "surName":
          [propertyA, propertyB] = [a.evaluationDescription, b.evaluationDescription];
          break;
        case "name":
          [propertyA, propertyB] = [a.vsl, b.vsl];
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
