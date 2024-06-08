import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { debounce } from 'lodash';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject, Observable, ReplaySubject, Subject, debounceTime, distinctUntilChanged, fromEvent, map, merge, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSort } from '@angular/material/sort';
import { IdentifiersLibraryService } from '../identifiers-library.service';
import { identifier } from '../identifiers-library.model';


@Component({
  selector: 'app-add-identifiers-library',
  templateUrl: './add-identifiers-library.component.html',
  styleUrls: ['./add-identifiers-library.component.sass']
})
export class AddIdentifiersLibraryComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

 

  displayedColumns1 = [
   "description",
   "code"
  ];
  docForm: FormGroup;
  dataSource: ExampleDataSource | null;
 exampleDatabase: IdentifiersLibraryService | null;
 selection = new SelectionModel<identifier>(true, []);
 application:identifier | null;
 groupHead=[
  {groupHeadName:'Countries',subGroupBean:[{subGroupCode:''}]},
  {groupHeadName:'Functions',subGroupBean:[{subGroupCode:'Item Delivery Evaluation'}]},
  {groupHeadName:'Location Numbers',subGroupBean:[{subGroupCode:''}]},
  {groupHeadName:'Locations',subGroupBean:[{subGroupCode:''}]},
  {groupHeadName:'Lub Oil Categories',subGroupBean:[{subGroupCode:''}]},
  {groupHeadName:'Origin',subGroupBean:[{subGroupCode:''}]},
  {groupHeadName:'Payment Terms',subGroupBean:[{subGroupCode:''}]},
  {groupHeadName:'Ship Class',subGroupBean:[{subGroupCode:''}]},
  {groupHeadName:'Storage Places',subGroupBean:[{subGroupCode:''}]},
  {groupHeadName:'Supplier (office) Evaluation Subfactors',subGroupBean:[{subGroupCode:''}]},
  {groupHeadName:'Supplier Evaluation Scores',subGroupBean:[{subGroupCode:''}]},
  {groupHeadName:'Supplier Evaluation SubFactors',subGroupBean:[{subGroupCode:''}]},
  {groupHeadName:'Type Of Freight',subGroupBean:[{subGroupCode:''}]},

]
 constructor(
   public httpClient: HttpClient,private fb: FormBuilder,
   public dialog: MatDialog,
   public identifiersLibraryService: IdentifiersLibraryService,
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
  this.docForm = this.fb.group({
    identifiertable: this.fb.array([
      this.fb.group({
        code :  [""],
        description :  [""],
      })
    ]),
    
  })
   this.loadData();
 }


 addRow(){

  let identifiertableArray=this.docForm.controls.identifiertable as FormArray;
  let arraylen=identifiertableArray.length;
  let newUsergroup:FormGroup = this.fb.group({
    
    code : '',
    description : '',
   
  })
  identifiertableArray.insert(arraylen,newUsergroup);

 }



 deleteRow(i){
  let deleteRow = this.docForm.controls.identifiertable as FormArray;
  deleteRow.removeAt(i);
}



 public loadData() {
  this.exampleDatabase = new IdentifiersLibraryService(this.httpClient,this.serverUrl,this.httpService);
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
export class ExampleDataSource extends DataSource<identifier> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: identifier[] = [];
  renderedData: identifier[] = [];
  constructor(
    public exampleDatabase: IdentifiersLibraryService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
 
  connect(): Observable<identifier[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
 
    // this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((identifier: identifier) => {
            const searchStr = (
              identifier.countries +
              identifier.functions +
              identifier.locationnumbers +
              identifier.locations +
              identifier.luboil+ 
               identifier.origin +
              identifier.paymentterms +
              identifier.requisition +
              identifier.shipclass +
              identifier.storage+
              identifier.suppliersubfactors +
              identifier.supplierscores +
              identifier.supplierfactors +
              identifier.typeoffreight 
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
  
  sortData(data: identifier[]): identifier[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "countries":
          [propertyA, propertyB] = [a.countries, b.countries];
          break;
        case "functions":
          [propertyA, propertyB] = [a.functions, b.functions];
          break;
        case "locationnumbers":
          [propertyA, propertyB] = [a.locationnumbers, b.locationnumbers];
          break;
        case "locations":
          [propertyA, propertyB] = [a.locations, b.locations];
          break;
          case "luboil":
           [propertyA, propertyB] = [a.luboil, b.luboil];
           break;
           case "origin":
            [propertyA, propertyB] = [a.origin, b.origin];
            break;
          case "paymentterms":
            [propertyA, propertyB] = [a.paymentterms, b.paymentterms];
            break;
          case "requisition":
            [propertyA, propertyB] = [a.requisition, b.requisition];
            break;
            case "shipclass":
             [propertyA, propertyB] = [a.shipclass, b.shipclass];
             break;
             case "paymentterms":
              [propertyA, propertyB] = [a.storage, b.storage];
              break;
            case "requisition":
              [propertyA, propertyB] = [a.suppliersubfactors, b.suppliersubfactors];
              break;
              case "supplierscores":
               [propertyA, propertyB] = [a.supplierscores, b.supplierscores];
               break;
               case "supplierfactors":
                [propertyA, propertyB] = [a.supplierfactors, b.supplierfactors];
                break;
                case "typeoffreight":
                 [propertyA, propertyB] = [a.typeoffreight, b.typeoffreight];
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
