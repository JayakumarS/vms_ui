import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { libraryfile } from '../library-file.model';
import { LibraryFileService } from '../library-file.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { serverLocations } from 'src/app/auth/serverLocations';
@Component({
  selector: 'app-add-library-file',
  templateUrl: './add-library-file.component.html',
  styleUrls: ['./add-library-file.component.sass']
})
export class AddLibraryFileComponent extends UnsubscribeOnDestroyAdapter implements OnInit {


  displayedColumns = [
    // "select",
    "code",
    "description",
   
  ];
  docForm: FormGroup;
  edit:boolean=false;
  requestId: number;
  libraryfile:libraryfile
  dataSource: ExampleDataSource | null;
  exampleDatabase: LibraryFileService | null;
  isIdentifierSelected: boolean = false;
  selection = new SelectionModel<libraryfile>(true, []);
  showTable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private libraryFileService: LibraryFileService,
    private router: Router,
    private serverUrl: serverLocations,
    public route: ActivatedRoute,
    public dialog: MatDialog, public notificationService: NotificationService,
    private cmnService: CommonService, private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
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

      identifier : [""],
      
      libraryfile: this.fb.array([
        this.fb.group({
          check: [false],
          code :  [""],
          description :  [""],
        })
      ]),
    });
    this.removeRow(0);
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
  
      }
     });
    

    
  }


  //save 
onSubmit() {
  if (this.docForm.valid) {
    this.libraryfile = this.docForm.value;
    this.libraryFileService.addfile(this.libraryfile, this.router,this.notificationService, this.spinner);
} else {
  this.showNotification(
    "snackbar-danger",
    "Please fill all details",
    "bottom",
    "center"
  );
}
}
onUpdate(){
  if (this.docForm.valid) {
    this.libraryfile = this.docForm.value;
    this.libraryFileService.Update(this.libraryfile, this.router, this.notificationService);
  }
  else {
    this.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
}

}
onIdentifierChange(event: any) {
  this.isIdentifierSelected = !!event.value;
  
}
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 3000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}

addRow(){

  let libraryfileArray=this.docForm.controls.libraryfile as FormArray;
  let arraylen=libraryfileArray.length;
  let newUsergroup:FormGroup = this.fb.group({
    check: [false],
    code : '',
    description : '',
   
  })
  libraryfileArray.insert(arraylen,newUsergroup);

 
}

removeRow1(index: number) {
  const libraryfileArray = this.docForm.controls.libraryfile as FormArray;
  const uncheckedRows = libraryfileArray.controls.filter((control) => !control.value.check);
  this.docForm.setControl('libraryfile', this.fb.array(uncheckedRows));
}


removeRow(index){
  var value;
  let libraryfileArray = this.docForm.controls.libraryfile as FormArray;
  libraryfileArray.removeAt(index);
}

onCancel(){
  this.router.navigate(['/crew/maintain/libraryfile/list-library']);
}


public loadData() {
  this.exampleDatabase = new LibraryFileService(this.httpClient,this.serverUrl,this.httpService);
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

export class ExampleDataSource extends DataSource<libraryfile> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: libraryfile[] = [];
  renderedData: libraryfile[] = [];
  constructor(
    public exampleDatabase: LibraryFileService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<libraryfile[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    // this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((interviewSetup: libraryfile) => {
            const searchStr = (
              interviewSetup.code +
              interviewSetup.description 
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

  sortData(data: libraryfile[]): libraryfile[] {
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
        case "description":
          [propertyA, propertyB] = [a.description, b.description];
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
