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
   "code",
   "Payment",
   "scale"
  ];
  docForm: FormGroup;
  dataSource: ExampleDataSource | null;
 exampleDatabase: IdentifiersLibraryService | null;
 selection = new SelectionModel<identifier>(true, []);
 application:identifier | null;
 selectedGroupHead: string = '';
 filteredGroupHead: any[];
 searchTerm: string = '';
 searchTermtext: string = '';
 filteredData: any[];
 filteredResults: any[] = [];


 groupHead=[
  {groupHeadName:'Countries'},
  {groupHeadName:'Functions'},
  {groupHeadName:'Item Delivery Evaluation'},
  {groupHeadName:'Location Numbers'},
  {groupHeadName:'Locations'},
  {groupHeadName:'Lub Oil Categories'},
  {groupHeadName:'Origin'},
  {groupHeadName:'Payment Terms'},
  {groupHeadName:'Ship Class'},
  {groupHeadName:'Storage Places'},
  {groupHeadName:'Supplier (office) Evaluation Subfactors'},
  {groupHeadName:'Supplier Evaluation Scores'},
  {groupHeadName:'Supplier Evaluation SubFactors'},
  {groupHeadName:'Type Of Freight'},

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

// Default values for each category
defaultValues = {
  'Item Delivery Evaluation': [
    { description: 'BAD QUALITY', code: 'BD', scale: 0 },
    { description: 'GOOD QUALITY', code: 'GD', scale: 0 }
  ],
  'Supplier Evaluation Scores': [
    { description: 'Excellent', code: 'E', scale: 100 },
    { description: 'Poor', code: 'P', scale: 25 }
  ],
  'Payment Terms': [
    { description: '30 days payment term', code: '2', scale: '', Payment: false },
    { description: '45 days payment term', code: '3', scale: '', Payment: false }
  ],
  'Supplier Evaluation SubFactors': [
    { description: 'Accuracy of Invoices', code: 'Q203' },
    { description: 'Delivery Performance', code: 'Q303' }
  ],
  'Supplier (office) Evaluation Subfactors': [
    { description: 'Accuracy of Invoices', code: 'Q203'},
    { description: 'Consistency of Performance', code: 'Q402'}
  ],
  'Ship Class': [
    { description: 'BUREA VERITAS', code: 'BV'},
    { description: 'DNV -GL', code: 'GERLO' }
  ],
  'Lub Oil Categories': [
    { description: 'AUXILIARY GRADES', code: '2'},
    { description: 'MAIN GRADES', code: '1' }
  ],
  'Location Numbers': [
    { description: 'AIS', code: 'NAVEQAS'},
    { description: '1ST DECK', code: 'DECK1ST' }
  ],
  'Locations': [
    { description: 'AIS', code: 'NAVEQAS'},
    { description: '1ST DECK', code: 'DECK1ST' }
  ],
  'Functions': [
    { description: 'PURIFIERS/SEPARATORS,FO SUPPLY UNITS', code: 'PUR'},
    { description: 'SAFETY EQUIPMENT', code: 'SFTEQ' }
  ],
  'Countries': [
    { description: 'REMOTE CONTROL VALVES/TANK GAUGING', code: 'FN006'},
    { description: 'SHAFT SYSTEM', code: 'F00079' }
  ],

  'Origin': [
    { description: 'REMOTE CONTROL VALVES/TANK GAUGING', code: 'FN006'},
    { description: 'SHAFT SYSTEM', code: 'F00079' }
  ],
  'Storage Places': [
    { description: 'AC COMPRESSOR AREA/PLATFORM/ROOM', code: 'VSL031'},
    { description: 'AHU ROOM', code: 'VSL027' }
  ],
  'Type Of Freight': [
    { description: 'Air Freight', code: '2'},
    { description: 'DHL', code: '4' }
  ],
};




 ngOnInit(): void {
  this.docForm = this.fb.group({
    identifiertable: this.fb.array([
      this.fb.group({
        code :  [""],
        description :  [""],
        Payment:[""],
        scale:[""]
      })
    ]),
    
  })
  this.updateFormArrayWithDefaults('Countries');
  // Initialize the filteredGroupHead with the full list
  this.filteredGroupHead = this.groupHead;
   this.loadData();
 }

 tablechange(groupHeadName: string) {
  this.selectedGroupHead = groupHeadName;
  this.updateFormArrayWithDefaults(groupHeadName);

}
createIdentifierTableGroup(data): FormGroup {
  return this.fb.group({
    description: [data.description || ''],
    code: [data.code || ''],
    scale: [data.scale || ''],
    Payment: [data.Payment || false]
  });
}
updateFormArrayWithDefaults(groupHeadName: string) {
  const control = <FormArray>this.docForm.controls['identifiertable'];
  control.clear();
  const defaultData = this.defaultValues[groupHeadName] || [];
  defaultData.forEach(data => {
    control.push(this.createIdentifierTableGroup(data));
  });
}
 addRow(){
  const control = <FormArray>this.docForm.controls['identifiertable'];
  control.push(this.createIdentifierTableGroup({}));

  // let identifiertableArray=this.docForm.controls.identifiertable as FormArray;
  // let arraylen=identifiertableArray.length;
  // let newUsergroup:FormGroup = this.fb.group({
    
  //   code : '',
  //   description : '',
  //   Payment:'',
  //  scale:''
   
  // })
  // identifiertableArray.insert(arraylen,newUsergroup);

 }



 deleteRow(i){
  let deleteRow = this.docForm.controls.identifiertable as FormArray;
  deleteRow.removeAt(i);
}

onSearchClick() {
  const searchValue = this.searchTerm.toLowerCase();
  this.filteredGroupHead = this.groupHead.filter(group =>
    group.groupHeadName.toLowerCase().includes(searchValue)
  );
}
onSearch() {
  const searchTerm = this.searchTermtext.toLowerCase();
  const identifiertableArray = this.docForm.get('identifiertable')['controls'];
  identifiertableArray.forEach(row => {
    const description = row.get('description').value.toLowerCase();
    const code = row.get('code').value.toLowerCase();
    const scale = row.get('scale').value?.toString().toLowerCase(); 
    if (description.includes(searchTerm) || code.includes(searchTerm) || (scale && scale.includes(searchTerm))) {
      row.enable(); 
    } else {
      row.disable(); 
    }
  });
}




// getDefaultRows(groupHeadName: string): any[] {
//   switch (groupHeadName) {
//     case  'Item Delivery Evaluation':return  [
//     { description: 'BAD QUALITY', code: 'BD', scale: 0 },
//     { description: 'GOOD QUALITY', code: 'GD', scale: 0 }
//   ];
//   case 'Supplier Evaluation Scores': return [
//     { description: 'Excellent', code: 'E', scale: 100 },
//     { description: 'Poor', code: 'P', scale: 25 }
//   ];
//   case'Payment Terms':return  [
//     { description: '30 days payment term', code: '2', scale: '', Payment: false },
//     { description: '45 days payment term', code: '3', scale: '', Payment: false }
//   ];
//   case'Supplier Evaluation SubFactors': return [
//     { description: 'Accuracy of Invoices', code: 'Q203' },
//     { description: 'Delivery Performance', code: 'Q303' }
//   ];
//   case'Supplier (office) Evaluation Subfactors': return [
//     { description: 'Accuracy of Invoices', code: 'Q203'},
//     { description: 'Consistency of Performance', code: 'Q402'}
//   ];
//   case 'Ship Class':return  [
//     { description: 'BUREA VERITAS', code: 'BV'},
//     { description: 'DNV -GL', code: 'GERLO' }
//   ];
//   case 'Lub Oil Categories': return [
//     { description: 'AUXILIARY GRADES', code: '2'},
//     { description: 'MAIN GRADES', code: '1' }
//   ];
//   case'Location Numbers': return [
//     { description: 'AIS', code: 'NAVEQAS'},
//     { description: '1ST DECK', code: 'DECK1ST' }
//   ];
//   case'Locations': return [
//     { description: 'AIS', code: 'NAVEQAS'},
//     { description: '1ST DECK', code: 'DECK1ST' }
//   ];
//   case 'Functions': return [
//     { description: 'PURIFIERS/SEPARATORS,FO SUPPLY UNITS', code: 'PUR'},
//     { description: 'SAFETY EQUIPMENT', code: 'SFTEQ' }
//   ];
//   case'Countries': return [
//     { description: 'REMOTE CONTROL VALVES/TANK GAUGING', code: 'FN006'},
//     { description: 'SHAFT SYSTEM', code: 'F00079' }
//   ];

//   case'Origin': return [
//     { description: 'REMOTE CONTROL VALVES/TANK GAUGING', code: 'FN006'},
//     { description: 'SHAFT SYSTEM', code: 'F00079' }
//   ];
//   case'Storage Places':return  [
//     { description: 'AC COMPRESSOR AREA/PLATFORM/ROOM', code: 'VSL031'},
//     { description: 'AHU ROOM', code: 'VSL027' }
//   ];
//   case'Type Of Freight':return  [
//     { description: 'Air Freight', code: '2'},
//     { description: 'DHL', code: '4' }
//   ];
//   default:
//         return [];
//     }
// };
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
