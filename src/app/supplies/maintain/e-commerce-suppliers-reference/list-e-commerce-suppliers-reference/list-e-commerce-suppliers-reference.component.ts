import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ECommerceSuppliersReferenceService } from '../e-commerce-suppliers-reference.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { ECommerceSuppliersReference } from '../e-commerce-suppliers-reference.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-e-commerce-suppliers-reference',
  templateUrl: './list-e-commerce-suppliers-reference.component.html',
  styleUrls: ['./list-e-commerce-suppliers-reference.component.sass']
})
export class ListECommerceSuppliersReferenceComponent extends UnsubscribeOnDestroyAdapter  implements OnInit {
  docForm: FormGroup;
  

  showWebSuppliersReference: boolean = true;
  showShipservSuppliersReference: boolean = false;
  showProcureshipSuppliersReference: boolean = false;
  showMespasSuppliersReference: boolean = false;
  showSeaProcSuppliersReference: boolean = false;

 
  displayedColumns = [
    "webCode",
    "webSupCode",
    "webSupName",
    "actions"
  ];

 


 dataSource: ExampleDataSource | null;
 exampleDatabase: ECommerceSuppliersReferenceService | null;
 selection = new SelectionModel<ECommerceSuppliersReference>(true, []);
 eCommerceSuppliersReference: ECommerceSuppliersReference | null;
 constructor(
   public httpClient: HttpClient,
   public dialog: MatDialog,
   public eCommerceSuppliersReferenceService: ECommerceSuppliersReferenceService,
   private snackBar: MatSnackBar,
   private serverUrl:serverLocations,
   private httpService:HttpServiceService,
   public router: Router,
   private fb: FormBuilder,
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
  this.loadData('WS'); 
}

onRadioChange(event: any): void {
  const value = event.value;
  this.showWebSuppliersReference = value === 'WS';
  this.showShipservSuppliersReference = value === 'SSS';
  this.showProcureshipSuppliersReference = value === 'PS';
  this.showMespasSuppliersReference = value === 'MS';
  this.showSeaProcSuppliersReference = value === 'SPS';

  if (value === 'WS') {
    this.displayedColumns = ['webCode', 'webSupCode', 'webSupName', 'actions'];
  } else if (value === 'SSS') {
    this.displayedColumns = ['shipservCode', 'shipservSupCode', 'shipservSupName', 'shipservContRefer', 'actions'];
  } else if (value === 'PS') {
    this.displayedColumns = ['procureshipCode', 'procureSupCode', 'procureSupName', 'procureContRefer', 'actions'];
  } else if (value === 'MS') {
    this.displayedColumns = ['mespasCode', 'mespasSupCode', 'mespasSupName', 'mespasContRefer', 'actions'];
  } else if (value === 'SPS') {
    this.displayedColumns = ['seaProcCode', 'seaProcSupCode', 'seaProcSupName', 'seaProcContRefer', 'actions'];
  }

  this.loadData(value); 
}




  
  public loadData(value: any) {
    this.exampleDatabase = new ECommerceSuppliersReferenceService(this.httpClient,this.serverUrl,this.httpService);
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

export class ExampleDataSource extends DataSource<ECommerceSuppliersReference> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ECommerceSuppliersReference[] = [];
  renderedData: ECommerceSuppliersReference[] = [];
  constructor(
    public exampleDatabase: ECommerceSuppliersReferenceService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<ECommerceSuppliersReference[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

   
    this.exampleDatabase.getList();
   

    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((eCommerceSuppliersReference: ECommerceSuppliersReference) => {
            const searchStr = (
              eCommerceSuppliersReference.webCode +
              eCommerceSuppliersReference.webSupCode +
              eCommerceSuppliersReference.webSupName 

              // eCommerceSuppliersReference.shipservCode +
              // eCommerceSuppliersReference.shipservSupCode +
              // eCommerceSuppliersReference.shipservSupName +
              // eCommerceSuppliersReference.shipservContRefer +


              // eCommerceSuppliersReference.procureshipCode +
              // eCommerceSuppliersReference.procureSupCode +
              // eCommerceSuppliersReference.procureSupName +
              // eCommerceSuppliersReference.procureContRefer +

              // eCommerceSuppliersReference.mespasContRefer +
              // eCommerceSuppliersReference.mespasSupName +
              // eCommerceSuppliersReference.mespasSupCode +
              // eCommerceSuppliersReference.mespasCode +

              // eCommerceSuppliersReference.seaProcCode +
              // eCommerceSuppliersReference.seaProcSupCode +
              // eCommerceSuppliersReference.seaProcSupName +
              // eCommerceSuppliersReference.seaProcContRefer 
           
             
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

  sortData(data: ECommerceSuppliersReference[]): ECommerceSuppliersReference[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "webCode":
          [propertyA, propertyB] = [a.webCode, b.webCode];
          break;
        case "webSupCode":
          [propertyA, propertyB] = [a.webSupCode, b.webSupCode];
          break;
        case "webSupName":
          [propertyA, propertyB] = [a.webSupName, b.webSupName];
          break;

        // case "shipservCode":
        //   [propertyA, propertyB] = [a.shipservCode, b.shipservCode];
        //   break;
        //   case "shipservSupCode":
        //     [propertyA, propertyB] = [a.shipservSupCode, b.shipservSupCode];
        //     break;
        //   case "shipservSupName":
        //     [propertyA, propertyB] = [a.shipservSupName, b.shipservSupName];
        //     break;
        //   case "shipservContRefer":
        //     [propertyA, propertyB] = [a.shipservContRefer, b.shipservContRefer];
        //     break;


        //   case "procureshipCode":
        //     [propertyA, propertyB] = [a.procureshipCode, b.procureshipCode];
        //     break;
        //     case "procureSupCode":
        //       [propertyA, propertyB] = [a.procureSupCode, b.procureSupCode];
        //       break;
        //     case "procureSupName":
        //       [propertyA, propertyB] = [a.procureSupName, b.procureSupName];
        //       break;
        //     case "procureContRefer":
        //       [propertyA, propertyB] = [a.procureContRefer, b.procureContRefer];
        //       break;

           
        //     case "mespasContRefer":
        //       [propertyA, propertyB] = [a.mespasContRefer, b.mespasContRefer];
        //       break;
        //       case "mespasSupName":
        //         [propertyA, propertyB] = [a.mespasSupName, b.mespasSupName];
        //         break;
        //       case "mespasSupCode":
        //         [propertyA, propertyB] = [a.mespasSupCode, b.mespasSupCode];
        //         break;
        //       case "mespasCode":
        //         [propertyA, propertyB] = [a.mespasCode, b.mespasCode];
        //         break;

        //       case "seaProcCode":
        //         [propertyA, propertyB] = [a.seaProcCode, b.seaProcCode];
        //         break;
        //         case "seaProcSupCode":
        //           [propertyA, propertyB] = [a.seaProcSupCode, b.seaProcSupCode];
        //           break;
        //         case "seaProcSupName":
        //           [propertyA, propertyB] = [a.seaProcSupName, b.seaProcSupName];
        //           break;
        //         case "seaProcContRefer":
        //           [propertyA, propertyB] = [a.seaProcContRefer, b.seaProcContRefer];
        //           break;
              
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
