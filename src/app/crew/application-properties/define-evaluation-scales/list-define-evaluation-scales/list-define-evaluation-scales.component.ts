import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
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
import { DefineEvaluationScalesService } from '../define-evaluation-scales.service';
import { DefineEvaluationScales } from '../define-evaluation-scales.model';

@Component({
  selector: 'app-list-define-evaluation-scales',
  templateUrl: './list-define-evaluation-scales.component.html',
  styleUrls: ['./list-define-evaluation-scales.component.sass']
})
export class ListDefineEvaluationScalesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
   "scaleDescription",
   "scale",
    "actions"
  ];

 dataSource: ExampleDataSource | null;
 exampleDatabase: DefineEvaluationScalesService | null;
 selection = new SelectionModel<DefineEvaluationScales>(true, []);
 defineEvaluationScales: DefineEvaluationScales | null;
 subs: any;
 constructor(
   public httpClient: HttpClient,
   public dialog: MatDialog,
   public defineEvaluationScalesService: DefineEvaluationScalesService,
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
   this.exampleDatabase = new DefineEvaluationScalesService(this.httpClient,this.serverUrl,this.httpService);
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

export class ExampleDataSource extends DataSource<DefineEvaluationScales> {
 filterChange = new BehaviorSubject("");
 get filter(): string {
   return this.filterChange.value;
 }
 set filter(filter: string) {
   this.filterChange.next(filter);
 }
 filteredData: DefineEvaluationScales[] = [];
 renderedData: DefineEvaluationScales[] = [];
 constructor(
   public exampleDatabase: DefineEvaluationScalesService,
   public paginator: MatPaginator,
   public _sort: MatSort
 ) {
   super();
   this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
 }

 connect(): Observable<DefineEvaluationScales[]> {
   const displayDataChanges = [
     this.exampleDatabase.dataChange,
     this._sort.sortChange,
     this.filterChange,
     this.paginator.page,
   ];

   this.exampleDatabase.getList();
   return merge(...displayDataChanges).pipe(map(() => {
       this.filteredData = this.exampleDatabase.data.slice().filter((defineEvaluationScales: DefineEvaluationScales) => {
           const searchStr = (
            defineEvaluationScales.scaleDescription +
            defineEvaluationScales.scale 
            
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

 sortData(data: DefineEvaluationScales[]): DefineEvaluationScales[] {
   if (!this._sort.active || this._sort.direction === "") {
     return data;
   }
   return data.sort((a, b) => {
     let propertyA: number | string = "";
     let propertyB: number | string = "";
     switch (this._sort.active) {
       case "code":
         [propertyA, propertyB] = [a.scaleDescription, b.scaleDescription];
         break;
       case "surName":
         [propertyA, propertyB] = [a.scale, b.scale];
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
