import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Departments } from '../departments.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { DepartmentsService } from '../departments.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.sass']
})
export class ListDepartmentsComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
   "code",
    "department",
    "formType",
    "decimals",
    "itemsToOrderCommends",
    "itemsNotToOrderCommends",
    "availableOffice",
    "availableVessel",
    "officeUndefinedItemsS",
    "vesselUndefinedItemsS",
    "proposedItems",
   "officeUndefinedItemsL",
    "vesselUndefinedItemsL",
    "lockSupplyCaseswithinvoicedate",
    "vesselOrders",
    "tolerance",
    "minimumItems",
     "actions"
   
  ];

 dataSource: ExampleDataSource | null;
 exampleDatabase: DepartmentsService | null;
 selection = new SelectionModel<Departments>(true, []);
 departments: Departments | null;
 
 constructor(
   public httpClient: HttpClient,
   public dialog: MatDialog,
   public departmentsService: DepartmentsService,
   private snackBar: MatSnackBar,
   private serverUrl:serverLocations,
   private httpService:HttpServiceService,
   public router: Router,
   private cdr: ChangeDetectorRef
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
   this.exampleDatabase = new DepartmentsService(this.httpClient,this.serverUrl,this.httpService);
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

export class ExampleDataSource extends DataSource<Departments> {
 filterChange = new BehaviorSubject("");
 get filter(): string {
   return this.filterChange.value;
 }
 set filter(filter: string) {
   this.filterChange.next(filter);
 }
 filteredData: Departments[] = [];
 renderedData: Departments[] = [];
 constructor(
   public exampleDatabase: DepartmentsService,
   public paginator: MatPaginator,
   public _sort: MatSort
 ) {
   super();
   this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
 }

 connect(): Observable<Departments[]> {
   const displayDataChanges = [
     this.exampleDatabase.dataChange,
     this._sort.sortChange,
     this.filterChange,
     this.paginator.page,
   ];

   this.exampleDatabase.getList();
   return merge(...displayDataChanges).pipe(map(() => {
       this.filteredData = this.exampleDatabase.data.slice().filter((departments: Departments) => {
           const searchStr = (
            departments.code +
            departments.department +
            departments.formType +
            departments.decimals +
            departments.itemsToOrderCommends +
            departments.itemsNotToOrderCommends +
            departments.availableOffice +
            departments.availableVessel +
            departments.officeUndefinedItemsS +
            departments.proposedItems +
            departments.vesselUndefinedItemsS +
            departments.officeUndefinedItemsL +
            departments.vesselUndefinedItemsL +
            departments.lockSupplyCaseswithinvoicedate +
            departments.vesselOrders +
            departments.tolerance +
            departments.minimumItems 
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

 sortData(data: Departments[]): Departments[] {
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
       case "formType":
         [propertyA, propertyB] = [a.formType, b.formType];
         break;
       case "department":
         [propertyA, propertyB] = [a.department, b.department];
         break;
         case "department":
         [propertyA, propertyB] = [a.decimals, b.decimals];
         break;
         case "itemsToOrderCommends":
          [propertyA, propertyB] = [a.itemsToOrderCommends, b.itemsToOrderCommends];
          break;
          case "itemsNotToOrderCommends":
            [propertyA, propertyB] = [a.itemsNotToOrderCommends, b.itemsNotToOrderCommends];
            break;
            case "availableOffice":
              [propertyA, propertyB] = [a.availableOffice, b.availableOffice];
              break;
              case "availableVessel":
                [propertyA, propertyB] = [a.availableVessel, b.availableVessel];
                break;
                case "officeUndefinedItemsS":
                  [propertyA, propertyB] = [a.officeUndefinedItemsS, b.officeUndefinedItemsS];
                  break;

                  case "proposedItems":
                    [propertyA, propertyB] = [a.proposedItems, b.proposedItems];
                    break;
                    case "vesselUndefinedItemsS":
                      [propertyA, propertyB] = [a.vesselUndefinedItemsS, b.vesselUndefinedItemsS];
                      break;
                      case "officeUndefinedItemsL":
                        [propertyA, propertyB] = [a.officeUndefinedItemsL, b.officeUndefinedItemsL];
                        break;
                      case "vesselUndefinedItemsL":
                        [propertyA, propertyB] = [a.vesselUndefinedItemsL, b.vesselUndefinedItemsL];
                        break;
                        case "lockSupplyCaseswithinvoicedate":
                          [propertyA, propertyB] = [a.lockSupplyCaseswithinvoicedate, b.lockSupplyCaseswithinvoicedate];
                          break;
                          case "vesselOrders":
                            [propertyA, propertyB] = [a.vesselOrders, b.vesselOrders];
                            break;

                            case "tolerance":
                              [propertyA, propertyB] = [a.tolerance, b.tolerance];
                              break;
  
                              case "minimumItems":
                                [propertyA, propertyB] = [a.minimumItems, b.minimumItems];
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
