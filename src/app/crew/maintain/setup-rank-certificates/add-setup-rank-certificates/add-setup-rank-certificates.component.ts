import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { setuprank } from '../setup-rank-certificates.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { serverLocations } from 'src/app/auth/serverLocations';
import { SetupRankCertificatesService } from '../setup-rank-certificates.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-setup-rank-certificates',
  templateUrl: './add-setup-rank-certificates.component.html',
  styleUrls: ['./add-setup-rank-certificates.component.sass']
})
export class AddSetupRankCertificatesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {


  displayedColumns = [
    
    "categories",
    "master",
    "bmaster",   
    "cheifofc",
   "scndofc",
   "thrdofc",
   "JO",
    "TOF",
    "DCT",
    "chiefeng",
    "scndEng",
    "thirdEng",
    "fourthEng",
    "JE",
    "TEG",
    "ECT",
    "EE",
    "ETO",
    "JEE",
    "TEE",
    "ELC",
    "BSN"

  ];
  docForm: FormGroup;
  edit:boolean=false;
  requestId: number;
  setuprank:setuprank;
  dataSource: ExampleDataSource | null;

 exampleDatabase: SetupRankCertificatesService | null;
  selection = new SelectionModel<setuprank>(true, []);
  showTable: boolean = false;
  showMasterColumns = false;
  showBMasterColumns = false;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private setupRankCertificatesService: SetupRankCertificatesService,
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

      srank : ["A"],
      master:[""],
      bmaster:[""],
    });
    // this.removeRow(0);
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
  
      }
     });
    this.docForm.get("srank")?.valueChanges.subscribe((selectedRank: string) => {
      this.updateDisplayedColumns(selectedRank);
    });
    this.loadData();
  }

  updateDisplayedColumns(selectedRank: string): void {
    if (!selectedRank) {
      this.displayedColumns = [
        "categories",
        "master",
        "bmaster",
        "cheifofc",
        "scndofc",
        "thrdofc",
        "JO",
        "TOF",
        "DCT",
        "chiefeng",
        "scndEng",
        "thirdEng",
        "fourthEng",
        "JE",
        "TEG",
        "ECT",
        "EE",
        "ETO",
        "JEE",
        "TEE",
        "ELC",
        "BSN"
      ];
      return;
    }

    // Update displayed columns based on selected rank
    if (selectedRank === "A") {
      this.displayedColumns = [
        "categories",
        "master",
        "bmaster",
        "cheifofc",
        "scndofc",
        "thrdofc",
        "JO",
        "TOF",
        "DCT",
        "chiefeng",
        "scndEng",
        "thirdEng",
        "fourthEng",
        "JE",
        "TEG",
        "ECT",
        "EE",
        "ETO",
        "JEE",
        "TEE",
        "ELC",
        "BSN"
      ];
    } else if (selectedRank === "M") {
      // Master Rank selected, show only Master column and Categories
      this.displayedColumns = ["categories", "master"];
    } else if (selectedRank === "BM") {
      // Branch Master Rank selected, show only Branch Master column and Categories
      this.displayedColumns = ["categories", "bmaster"];
    }
  }

  //save 
onSubmit() {
  if (this.docForm.valid) {
    this.setuprank = this.docForm.value;
    // this.setupRankCertificatesService.addrank(this.setuprank, this.router,this.notificationService, this.spinner);
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
    this.setuprank = this.docForm.value;
    // this.setupRankCertificatesService.Updaterank(this.setuprank, this.router, this.notificationService);
  }
  else {
    this.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
}

}
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 3000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
onCancel(){
  this.router.navigate(['/crew/maintain/setup-rank/add-setuprank']);
}
public loadData() {
  this.exampleDatabase = new SetupRankCertificatesService(this.httpClient,this.serverUrl,this.httpService);
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

export class ExampleDataSource extends DataSource<setuprank> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: setuprank[] = [];
  renderedData: setuprank[] = [];
  constructor(
    public exampleDatabase: SetupRankCertificatesService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<setuprank[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((setuprank: setuprank) => {
            const searchStr = (
              setuprank.categories +
              setuprank.master +
              setuprank.bmaster +
              setuprank.cheifofc +
              setuprank.scndofc +
              setuprank.thrdofc +
              setuprank.JO +
              setuprank.TOF +
              setuprank.DCT +
              setuprank.chiefeng +
              setuprank.scndEng +
              setuprank.thirdEng +
              setuprank.fourthEng +
              setuprank.JE +
              setuprank.TEG +
              setuprank.ECT +
              setuprank.EE +
              setuprank.ETO +
              setuprank.JEE +
              setuprank.TEE +
              setuprank.ELC +
              setuprank.BSN 
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

  sortData(data: setuprank[]): setuprank[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "categories":
          [propertyA, propertyB] = [a.categories, b.categories];
          break;
        case "master":
          [propertyA, propertyB] = [a.master, b.master];
          break;
          case "categories":
            [propertyA, propertyB] = [a.categories, b.categories];
            break;
          case "bmaster":
            [propertyA, propertyB] = [a.bmaster, b.bmaster];
            break;
          case "cheifofc":
           [propertyA, propertyB] = [a.cheifofc, b.cheifofc];
            break;
            case "scndofc":
            [propertyA, propertyB] = [a.scndofc, b.scndofc];
            break;
           case "thrdofc":
             [propertyA, propertyB] = [a.thrdofc, b.thrdofc];
            break;
           case "JO":
              [propertyA, propertyB] = [a.JO, b.JO];
            break;
            case "TOF":
              [propertyA, propertyB] = [a.TOF, b.TOF];
              break;
            case "DCT":
              [propertyA, propertyB] = [a.DCT, b.DCT];
              break;
              case "chiefeng":
                [propertyA, propertyB] = [a.chiefeng, b.chiefeng];
                break;
              case "scndEng":
                [propertyA, propertyB] = [a.scndEng, b.scndEng];
                break;       
              case "thirdEng":
               [propertyA, propertyB] = [a.thirdEng, b.thirdEng];
               break;  
           case "fourthEng":
             [propertyA, propertyB] = [a.fourthEng, b.fourthEng];
               break;  
             case "JE":
             [propertyA, propertyB] = [a.JE, b.JE];
            break;
            case "ETO":
              [propertyA, propertyB] = [a.ETO, b.ETO];
             break;
             case "JEE":
              [propertyA, propertyB] = [a.JEE, b.JEE];
             break;
             case "TEE":
              [propertyA, propertyB] = [a.TEE, b.TEE];
             break;  
             case "ELC":
              [propertyA, propertyB] = [a.ELC, b.ELC];
             break;
             case "BSN":
              [propertyA, propertyB] = [a.BSN, b.BSN];
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
