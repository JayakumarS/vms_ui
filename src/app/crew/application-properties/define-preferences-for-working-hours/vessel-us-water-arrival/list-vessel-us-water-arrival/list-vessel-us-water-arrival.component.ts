import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VesselUsWaterArrivalService } from '../vessel-us-water-arrival.service';
import { VesselUSwaterArrival } from '../vessel-us-water-arrival.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-list-vessel-us-water-arrival',
  templateUrl: './list-vessel-us-water-arrival.component.html',
  styleUrls: ['./list-vessel-us-water-arrival.component.sass']
})
export class ListVesselUsWaterArrivalComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "vessel",
    "port",
    "arrival",
    "departure",
    "actions"
  ];

 dataSource: ExampleDataSource | null;
 exampleDatabase: VesselUsWaterArrivalService | null;
 selection = new SelectionModel<VesselUSwaterArrival>(true, []);
 vesselUSwaterArrival: VesselUSwaterArrival | null;

 constructor(
   public httpClient: HttpClient,
   public dialog: MatDialog,
   public vesselUsWaterArrivalService: VesselUsWaterArrivalService,
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
   this.exampleDatabase = new VesselUsWaterArrivalService(this.httpClient,this.serverUrl,this.httpService);
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

export class ExampleDataSource extends DataSource<VesselUSwaterArrival> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: VesselUSwaterArrival[] = [];
  renderedData: VesselUSwaterArrival[] = [];
  constructor(
    public exampleDatabase: VesselUsWaterArrivalService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<VesselUSwaterArrival[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((vesselUSwaterArrival: VesselUSwaterArrival) => {
            const searchStr = (
              vesselUSwaterArrival.vessel +
              vesselUSwaterArrival.port +
              vesselUSwaterArrival.arrival +
              vesselUSwaterArrival.departure 
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

  sortData(data: VesselUSwaterArrival[]): VesselUSwaterArrival[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "vessel":
          [propertyA, propertyB] = [a.vessel, b.vessel];
          break;
        case "port":
          [propertyA, propertyB] = [a.port, b.port];
          break;
        case "arrival":
            [propertyA, propertyB] = [a.arrival, b.arrival];
            break;  
        case "departure":
          [propertyA, propertyB] = [a.departure, b.departure];
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
