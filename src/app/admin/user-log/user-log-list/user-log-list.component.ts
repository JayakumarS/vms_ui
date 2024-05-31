import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, fromEvent, map, merge, Observable, startWith } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserLogMasterResultBean } from '../user-log-result-bean';
import { UserLogMaster } from '../user-log.model';
import { UserLogService } from '../user-log.service';

@Component({
  selector: 'app-user-log-list',
  templateUrl: './user-log-list.component.html',
  styleUrls: ['./user-log-list.component.sass'],
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
export class UserLogListComponent extends UnsubscribeOnDestroyAdapter implements OnInit {


  displayedColumns = [
    "userName",
    "status",
    "dateTime"

  ];

  filePath: any;
  dataSource: ExampleDataSource | null;
  exampleDatabase: UserLogService | null;
  selection = new SelectionModel<UserLogMaster>(true, []);
  index: number;
  id: number;
  userLogMaster: UserLogMaster | null;
  data2: any;
  docForm: FormGroup;
  //  myControlusername = new FormControl(undefined, [Validators.required, this.requireMatch.bind(this)]);
  userNameList: any;
  userfilteredOptions: Observable<string[]>;
  userOptions: string[];
  selectedUser: any;
  userArray = [];
  formArray = [];
  form: String;
  myControlUser = new FormControl('');





  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public userLogService: UserLogService,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
    private notificationService: NotificationService,
    private EncrDecr: EncrDecrService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private cmnService: CommonService

  ) {
    super();
    this.docForm = this.fb.group({
      userName: [""],
      status: [""],
      dateTime: [""],
      fromDate: [""],
      toDate: [""],
      fromDateObj: [""],
      toDateObj: [""]
    });
  }
  valueforForm = {
    formName: '',
    userName: ''
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };




  ngOnInit(): void {
    this.loadData();

    //  this.httpService.get<UserLogMasterResultBean>(this.userLogService.userNameList).subscribe(
    //   (data) => {
    //     this.userNameList = data.userNameList;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error.name + " " + error.message);
    //   }
    // );


    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error.name + " " + error.message);
    //   }
    // );
   
  }

  refresh() {
    this.docForm = this.fb.group({
      userName: [""],
      status: [""],
      dateTime: [""],
      fromDate: [""],
      toDate: [""],
      fromDateObj: [""],
      toDateObj: [""]
    });
    this.valueforForm.userName = "";
    this.exampleDatabase.getAllList(this.docForm.value);
  }

  //  private requireMatch1(control: FormControl): ValidationErrors | null {
  //   const selection: any = control.value;
  //   var custValue = this.getitemcategory(control.value);
  //   if (custValue === control.value) {
  //     return null;
  //   }
  //   else {
  //     return { requireMatch1: true };
  //   }
  // }

  // getitemcategory(POD) {
  //   var value;
  //   var value1;
  //   if(this.userfilteredOptions != undefined){
  //     this.userfilteredOptions.forEach(element => {
  //       if (element.userOption === POD) {
  //         value1 = element.userOption;
  //         value = element.userOption;
  //       }
  //     });
  //   }

  //   return value1;
  // }

  public loadData() {
    this.exampleDatabase = new UserLogService(this.httpClient, this.serverUrl, this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.docForm

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


  onSubmit() {

    this.userLogMaster = this.docForm.value;
    this.docForm.value.userName = this.valueforForm.userName;
    // console.log(this.userLogMaster);
    this.exampleDatabase.getAllList(this.userLogMaster);

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.userOptions.filter(obj => obj.toLowerCase().includes(filterValue));
  }



  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getDateString(event, inputFlag, index) {
    let cdate = this.cmnService.getDate(event.target.value);
    if (inputFlag == 'fromDate') {
      this.docForm.patchValue({ fromDate: cdate });
    } else if (inputFlag == 'toDate') {
      this.docForm.patchValue({ toDate: cdate });
    }
  }




  // context menu
  onContextMenu(event: MouseEvent, item: UserLogMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }



}

export class ExampleDataSource extends DataSource<UserLogMaster> {
  filterChange = new BehaviorSubject("");

  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UserLogMaster[] = [];
  renderedData: UserLogMaster[] = [];
  constructor(
    public exampleDatabase: UserLogService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserLogMaster[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getAllList(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((customerMaster: UserLogMaster) => {
            const searchStr = (
              customerMaster.userName

            ).toLowerCase();

            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: UserLogMaster[]): UserLogMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "userName":
          [propertyA, propertyB] = [a.userName, b.userName];
          break;
        case "status":
          [propertyA, propertyB] = [a.status, b.status];
          break;
        case "dateTime":
          [propertyA, propertyB] = [a.dateTime, b.dateTime];
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
