import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CompanyEmployees } from '../company-employees.model';
import { CompanyEmployeesService } from '../company-employees.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-list-company-employees',
  templateUrl: './list-company-employees.component.html',
  styleUrls: ['./list-company-employees.component.sass']
})
export class ListCompanyEmployeesComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "employeeCode",
    "employeeName",
    "employeeSurname",
    "fatherName",
    "passportNo",
    "remarks",
     "actions"
   ];
  
  dataSource: ExampleDataSource | null;
  exampleDatabase: CompanyEmployeesService | null;
  selection = new SelectionModel<CompanyEmployees>(true, []);
  companyEmployees: CompanyEmployees | null;
  subs: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public companyEmployeesService: CompanyEmployeesService,
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
    this.exampleDatabase = new CompanyEmployeesService(this.httpClient,this.serverUrl,this.httpService);
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
 
 export class ExampleDataSource extends DataSource<CompanyEmployees> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: CompanyEmployees[] = [];
  renderedData: CompanyEmployees[] = [];
  constructor(
    public exampleDatabase: CompanyEmployeesService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
 
  connect(): Observable<CompanyEmployees[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
   
    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((companyEmployees: CompanyEmployees) => {
            const searchStr = (
              companyEmployees.employeeCode +
              companyEmployees.employeeName + 
              companyEmployees.employeeSurname +
              companyEmployees.fatherName +
              companyEmployees.passportNo +
              companyEmployees.remarks 
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
 
  sortData(data: CompanyEmployees[]): CompanyEmployees[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "employeeCode":
          [propertyA, propertyB] = [a.employeeCode, b.employeeCode];
          break;
        case "employeeName":
          [propertyA, propertyB] = [a.employeeName, b.employeeName];
          break;
          case "employeeSurname":
            [propertyA, propertyB] = [a.employeeSurname, b.employeeSurname];
            break;
            case "fatherName":
              [propertyA, propertyB] = [a.fatherName, b.fatherName];
              break;
              case "passportNo":
                [propertyA, propertyB] = [a.passportNo, b.passportNo];
                break;
                case "remarks":
                  [propertyA, propertyB] = [a.remarks, b.remarks];
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
 