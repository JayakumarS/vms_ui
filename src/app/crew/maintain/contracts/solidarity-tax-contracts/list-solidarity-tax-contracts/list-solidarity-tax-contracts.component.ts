import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SolidarityTaxContractsService } from '../solidarity-tax-contracts.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, ReplaySubject, Subject, fromEvent, map, merge, takeUntil } from 'rxjs';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from 'src/app/common-service/common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SolidarityTaxContracts } from '../solidarity-tax-contracts.model';
import { MatSelect } from '@angular/material/select';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },

};
@Component({
  selector: 'app-list-solidarity-tax-contracts',
  templateUrl: './list-solidarity-tax-contracts.component.html',
  styleUrls: ['./list-solidarity-tax-contracts.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
        },
      }
    }, CommonService
  ]
})
export class ListSolidarityTaxContractsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  currencyList:any=[];

  displayedColumns = [
    "currency",
    "fromDate",
    "toDate",
    "item",
    "proportionalCalculation",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: SolidarityTaxContractsService | null;
  selection = new SelectionModel<SolidarityTaxContracts>(true, []);
  solidarityTaxContracts: SolidarityTaxContracts | null;
  
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public solidarityTaxContractsService: SolidarityTaxContractsService,
    private snackBar: MatSnackBar,
    private cmnService: CommonService,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    private fb: FormBuilder,
  ) {
    super();
    this.docForm = this.fb.group({
      item: [""],
      fromDateObj: ["", [Validators.required]],
      toDateObj: ["", [Validators.required]],
      fromDate: [""],
      toDate: [""],
      itemCategory: [""],
      currency: [""]
    });
  }



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    
    this.loadData();
    this.currencyList = [
      { id: 1, text: 'INR' },
      { id: 2, text: 'USD' },
      { id: 3, text: 'AED' }
    ];
   


   }
  

  refresh(){
    this.loadData();
  }

  reset() {
    this.docForm = this.fb.group({
      item: [""],
      fromDateObj: [""],
      toDateObj: [""],
      fromDate: [""],
      toDate: [""],
      itemCategory: [""],
      currency:[""]
    });
    this.loadData();
  }

  getDateString(event, inputFlag) {
    let cdate = this.cmnService.getDate(event.target.value);
    if (inputFlag == 'fromDate') {
      this.docForm.patchValue({ fromDate: cdate });
    } else if (inputFlag == 'toDate') {
      this.docForm.patchValue({ toDate: cdate });
    }

  };


  search(){
    this.docForm.patchValue({
      type : 'search'
    })
    this.loadData();  
  }

 

 

  editCall(id){

  }

  deleteItem(id){

  }

  public loadData() {
    this.exampleDatabase = new SolidarityTaxContractsService(this.httpClient,this.serverUrl,this.httpService);
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


export class ExampleDataSource extends DataSource<SolidarityTaxContracts> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: SolidarityTaxContracts[] = [];
  renderedData: SolidarityTaxContracts[] = [];
  constructor(
    public exampleDatabase: SolidarityTaxContractsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<SolidarityTaxContracts[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((solidarityTaxContracts: SolidarityTaxContracts) => {
            const searchStr = (
              solidarityTaxContracts.currency +
              solidarityTaxContracts.fromDate +
              solidarityTaxContracts.toDate+
              solidarityTaxContracts.item+
              solidarityTaxContracts.proportionalCalculation
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

  sortData(data: SolidarityTaxContracts[]): SolidarityTaxContracts[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "currency":
          [propertyA, propertyB] = [a.currency, b.currency];
          break;
        case "fromDate":
          [propertyA, propertyB] = [a.fromDate, b.fromDate];
          break;
        case "toDate":
          [propertyA, propertyB] = [a.toDate, b.toDate];
          break;
          case "item":
            [propertyA, propertyB] = [a.item, b.item];
            break;
            case "proportionalCalculation":
              [propertyA, propertyB] = [a.proportionalCalculation, b.proportionalCalculation];
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
