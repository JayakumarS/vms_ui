import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DeleteComponent } from 'src/app/master/country-master/list-country-master/dialog/delete/delete.component';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MedicalsService } from '../medicals.service';
import { Medicals } from '../medicals-model';
import { ViewMedicalsComponent } from '../view-medicals/view-medicals.component';
import { DeleteMedicalsComponent } from './delete-medicals/delete-medicals.component';

@Component({
  selector: 'app-list-medicals',
  templateUrl: './list-medicals.component.html',
  styleUrls: ['./list-medicals.component.sass']
})
export class ListMedicalsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
   
     "mcode",
     "mdescription",
     "actions"
   ];

   docForm: FormGroup;
   dataSource: ExampleDataSource | null;
  exampleDatabase: MedicalsService | null;
  selection = new SelectionModel<Medicals>(true, []);
  index: number;
  id: number;
  Medicals: Medicals | null;

  constructor(public httpClient: HttpClient,private fb: FormBuilder,
    public dialog: MatDialog,
    public medicalsService: MedicalsService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    private EncrDecr:EncrDecrService,
    private spinner: NgxSpinnerService,
    private tokenStorageService : TokenStorageService,
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

    const permissionObj = {
      formCode: 'F9001',
      userId: this.tokenStorageService.getUserId()
    }

    this.loadData();
  }
 
  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new MedicalsService(this.httpClient,this.serverUrl,this.httpService);
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

  deleteItem(row){ 
   
    let tempDirection;
    if (localStorage.getItem("isRtl") == "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    const dialogRef = this.dialog.open(DeleteMedicalsComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    if (data.data == true) {
      this.spinner.show();
      this.medicalsService.delete(row.medicalId).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.loadData();
            this.showNotification(
              "snackbar-success",
              "Record Deleted",
              "bottom",
              "center"
            );
          }
          else{
            this.showNotification(
              "snackbar-danger",
              data.message ||"Error in delete",
              "bottom",
              "center"
            );
          }
        },
        error: (error) => {
          this.spinner.hide();
        }
      });
    }else{
      this.showNotification(
        "snackbar-danger",
        "An error occurred while deleting the record.",
        "bottom",
        "center"
      );
    }
    })
    };
  editCall(row) {
    this.router.navigate(['/crew/maintain/Medicals/add-Medicals/',row.medicalId]);
  }

  viewCall(row) {
    
    let rowId = row.medicalId
    let tempDirection;
    if (localStorage.getItem("isRtl") == "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    const dialogRef = this.dialog.open(ViewMedicalsComponent, {
      height: "270px",
      width: "450px",
      data: rowId,
      direction: tempDirection,
      disableClose: true 

    });

  }

  private refreshTable() {
  this.paginator._changePageSize(this.paginator.pageSize);
}
// context menu
onContextMenu(event: MouseEvent, item: Medicals) {
  event.preventDefault();
  this.contextMenuPosition.x = event.clientX + "px";
  this.contextMenuPosition.y = event.clientY + "px";
  this.contextMenu.menuData = { item: item };
  this.contextMenu.menu.focusFirstItem("mouse");
  this.contextMenu.openMenu();
}

showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
}

export class ExampleDataSource extends DataSource<Medicals> {
filterChange = new BehaviorSubject("");
get filter(): string {
  return this.filterChange.value;
}
set filter(filter: string) {
  this.filterChange.next(filter);
}
filteredData: Medicals[] = [];
renderedData: Medicals[] = [];
constructor(
  public exampleDatabase: MedicalsService,
  public paginator: MatPaginator,
  public _sort: MatSort
) {
  super();
  // Reset to the first page when the user changes the filter.
  this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
}
/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<Medicals[]> {
  // Listen for any changes in the base data, sorting, filtering, or pagination
  const displayDataChanges = [
    this.exampleDatabase.dataChange,
    this._sort.sortChange,
    this.filterChange,
    this.paginator.page,
  ];
  this.exampleDatabase.getList();
  return merge(...displayDataChanges).pipe(
    map(() => {
      // Filter data
      this.filteredData = this.exampleDatabase.data
        .slice()
        .filter((Medicals: Medicals) => {
          const searchStr = (
            Medicals.mcode +
            Medicals.mdescription 
           

           
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
disconnect() {}
/** Returns a sorted copy of the database data. */
sortData(data: Medicals[]): Medicals[] {
  if (!this._sort.active || this._sort.direction === "") {
    return data;
  }
  return data.sort((a, b) => {
    let propertyA: number | string = "";
    let propertyB: number | string = "";
    switch (this._sort.active) {
    
      case "mcode":
        [propertyA, propertyB] = [a.mcode, b.mcode];
        break;
      case "mdescription":
        [propertyA, propertyB] = [a.mdescription, b.mdescription];
        break;
      ;

      
    }
    const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
    return (
      (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
    );
  });
}
}
