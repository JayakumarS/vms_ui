import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CrewPromotion } from '../crew-promotion.model';
import { CrewPromotionService } from '../crew-promotion.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-list-crew-promotion',
  templateUrl: './list-crew-promotion.component.html',
  styleUrls: ['./list-crew-promotion.component.sass']
})
export class ListCrewPromotionComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  
  displayedColumns = [
    "currank",
    "prorank",
    "nationality",
    "vesseltype",
    "promoyears",
    
  ];
  dataSource: ExampleDataSource | null;
  exampleDatabase: CrewPromotionService | null;
  selection = new SelectionModel<CrewPromotion>(true, []);
  crewPromotion: CrewPromotion | null;
  

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public crewpromotion: CrewPromotionService,
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

  public loadData() {
    this.exampleDatabase = new CrewPromotionService(this.httpClient,this.serverUrl,this.httpService);
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

  addNew(){

  }

  editCall(item){

  }

}
export class ExampleDataSource extends DataSource<CrewPromotion> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: CrewPromotion[] = [];
  renderedData: CrewPromotion[] = [];
  constructor(
    public exampleDatabase: CrewPromotionService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<CrewPromotion[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((crewpromotion: CrewPromotion) => {
            const searchStr = (
              crewpromotion.currank +
              crewpromotion.prorank +
              crewpromotion.nationality +
              crewpromotion.vesseltype +
              crewpromotion.promoyears

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

  sortData(data: CrewPromotion[]): CrewPromotion[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "currank":
          [propertyA, propertyB] = [a.currank, b.currank];
          break;
        case "prorank":
          [propertyA, propertyB] = [a.prorank, b.prorank];
          break;
        case "nationality":
          [propertyA, propertyB] = [a.nationality, b.nationality];
          break;
        case "vesseltype":
          [propertyA, propertyB] = [a.vesseltype, b.vesseltype];
          break;
        case "promyears":
          [propertyA, propertyB] = [a.promoyears, b.promoyears];
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
