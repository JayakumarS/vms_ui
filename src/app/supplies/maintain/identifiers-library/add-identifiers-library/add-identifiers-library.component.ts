import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import {  DataSource, SelectionModel } from '@angular/cdk/collections';
import { IdentifiersLibraryService } from '../identifiers-library.service';
import { identifier } from '../identifiers-library.model';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Code } from 'angular-feather/icons';
import { DeleteComponent } from 'src/app/master/country-master/list-country-master/dialog/delete/delete.component';
import { ViewFreightTypeComponent } from '../view-freight-type/view-freight-type.component';
import { ViewStoragePlaceComponent } from '../view-storage-place/view-storage-place.component';
import { ViewFunctionsComponent } from '../view-functions/view-functions.component';

@Component({
  selector: 'app-add-identifiers-library',
  templateUrl: './add-identifiers-library.component.html',
  styleUrls: ['./add-identifiers-library.component.sass']
})
export class AddIdentifiersLibraryComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  display = [
    "code",
   "description",

   "actions"
  ];
  displaystorage= [
    "code1",
   "description",

   "actions"
  ];
  displayfunction= [
    "code2",
   "description",

   "actions"
  ];
  docForm: FormGroup;
  edit:boolean=false;
  currentCategory: string = ''; 

  decryptRequestId: any;
  requestId: any;
  dataSource: ExampleDataSource | null;
  dataSource2: ExampleDataSourcestorage | null;
  dataSource3: ExampleDataSourcefunction | null;
  exampleDatabasestorage: IdentifiersLibraryService | null;
 exampleDatabase: IdentifiersLibraryService | null;
 exampleDatabasefunction: IdentifiersLibraryService | null;
 selection = new SelectionModel<identifier>(true, []);
 application:identifier | null;
 selectedGroupHead: string = '';
 filteredGroupHead: any[];
 searchTerm: string = '';
 searchTermtext: string = '';
 isNewFormVisible: boolean = false;
 isNewFormVisiblestoarge: boolean = false;
 isNewFormVisiblefunction: boolean = false;
 currentCode: number = 1; 
 filteredData: any[];
 filteredResults: any[] = [];
 index: number;
 id: number;
 customerMaster: identifier | null;
 permissionList: any=[];

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
  {groupHeadName:'Type Of Freight' },

]
  functionshowcard: boolean=false;
  showcard: boolean=false;
  storageshowcard: boolean=false;
  displayedColumns: string[];
  type: any;
 constructor(
   public httpClient: HttpClient,private fb: FormBuilder,
   public dialog: MatDialog,
   public IdentifiersLibraryService: IdentifiersLibraryService,
   private snackBar: MatSnackBar,
   public route: ActivatedRoute,
   public EncrDecr: EncrDecrService,
   private serverUrl:serverLocations,
   private notificationService: NotificationService,
   public matError : MatErrorService,
   private httpService:HttpServiceService,
   public router: Router,    private spinner: NgxSpinnerService,
 ) {
   super();
 }

 @ViewChild(MatPaginator, { static: true }) paginatorfunction: MatPaginator;
 @ViewChild(MatSort, { static: true }) sortfunction: MatSort;
 
 @ViewChild(MatPaginator, { static: true }) paginatorstorage: MatPaginator;
 @ViewChild(MatSort, { static: true }) sortstoarge: MatSort;

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
    // { description: 'AIS', code: 'NAVEQAS'},
    // { description: '1ST DECK', code: 'DECK1ST' }
  ],
  'Locations': [
    // { description: 'AIS', code: 'NAVEQAS'},
    // { description: '1ST DECK', code: 'DECK1ST' }
  ],
  'Functions': [
    // { description: 'PURIFIERS/SEPARATORS,FO SUPPLY UNITS', code: 'PUR'},
    // { description: 'SAFETY EQUIPMENT', code: 'SFTEQ' }
  ],
  'Countries': [
    // { description: 'REMOTE CONTROL VALVES/TANK GAUGING', code: 'FN006'},
    // { description: 'SHAFT SYSTEM', code: 'F00079' }
  ],

  'Origin': [
    // { description: 'REMOTE CONTROL VALVES/TANK GAUGING', code: 'FN006'},
    // { description: 'SHAFT SYSTEM', code: 'F00079' }
  ],
  'Storage Places': [
    // { description: 'AC COMPRESSOR AREA/PLATFORM/ROOM', code: 'VSL031'},
    // { description: 'AHU ROOM', code: 'VSL027' }
  ],
  'Type Of Freight': [

  
  ],
};
categories = {
  'Type Of Freight': ['code', 'description', 'actions']
};



 ngOnInit(): void {
  this.loadData(this.type=4);
  this.loadDatastorage();


  this.docForm = this.fb.group({
    code:[""],
    description:[""],
    code1 :  [""],
    storageId:  [""],
    code2:[""],
    functionId:[""],
    identifiertable: this.fb.array([
      this.fb.group({
        code :  [""],
        code1 :  [""],
        description :  [""],
        Payment:[""],
        scale:[""]
      })
    ]),
    identifiertable1: this.fb.array([
      this.fb.group({
       code1 :  [""],
      description :  [""],
      
      })
    ]),
    identifiertable2: this.fb.array([
      this.fb.group({
       code2 :  [""],
      description :  [""],
      
      })
    ]),
    
  })
  this.updateDisplayedColumns();
  this.displayedColumns = this.categories[this.currentCategory];
  this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
    this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
      this.edit=true;
      this.fetchDetails(this.decryptRequestId,this.currentCategory) ;
    }
  })
 this.detailList(this.currentCategory)
  this.updateFormArrayWithDefaults('Countries');
  this.filteredGroupHead = this.groupHead;


  
  
 }
 
 tablechange(groupHeadName: string) {
  this.selectedGroupHead = groupHeadName;
  this.updateFormArrayWithDefaults(groupHeadName);

}

cancel(){
  this.isNewFormVisible = false;
  this.showcard=true;

}
createNewfunction()
{
  this.isNewFormVisiblefunction=true;

   this.isNewFormVisible = false;
   this.storageshowcard=false;
   this.showcard=false;
   this.isNewFormVisiblestoarge = false;
   this.functionshowcard=false;


  this.edit = false;
  this.docForm.reset();
}
createNew() {
  this.httpService.get<any>(this.IdentifiersLibraryService.codeUrl).subscribe((res: any) => {

      
    this.docForm.patchValue({
      'code':res.code
    })
  }) 
   this.isNewFormVisible = true;
   this.storageshowcard=false;
   this.showcard=false;
   this.isNewFormVisiblestoarge = false;
   this.functionshowcard=false;
   this.isNewFormVisiblefunction=false;

  this.edit = false;
  this.docForm.reset();
}
cancelstorage(){
  this.isNewFormVisiblestoarge = false;
  this.storageshowcard=true;
  

}
createNewstorage() {
  this.httpService.get<any>(this.IdentifiersLibraryService.getSequenceCode).subscribe((res: any) => {

      
    this.docForm.patchValue({
      'code1':res.code1
    })
  }) 
   this.isNewFormVisiblestoarge = true;
this.isNewFormVisible = false;
this.storageshowcard=false;
this.showcard=false;
this.functionshowcard=false;
this.isNewFormVisiblefunction=false;

  this.edit = false;
  this.docForm.reset();
}
createIdentifierTableGroup(data): FormGroup {
  return this.fb.group({
    description: [data.description || ''],
    code: [data.code || ''],
    scale: [data.scale || ''],
    Payment: [data.Payment || false]
  });
}
selectCategory(category: string) {
  if(category=='Type Of Freight'){
  this.currentCategory = category;
  this.showcard=true;
  this.storageshowcard=false;
  this.isNewFormVisiblestoarge = false;
  this.isNewFormVisible = false;
  this.functionshowcard=false;
  this.isNewFormVisiblefunction=false;
  
   this.loadData(this.type=4);
  }
  else if(category=='Storage Places'){
     this.storageshowcard=true;
     this.showcard=false;
     this.isNewFormVisiblestoarge = false;
     this.isNewFormVisible = false;
     this.functionshowcard=false;
     this.isNewFormVisiblefunction=false;

     this.loadDatastorage();
  }

  else if(category=='Functions'){

    this.functionshowcard=true;
    this.storageshowcard=false;
    this.showcard=false;
    this.isNewFormVisiblestoarge = false;
    this.isNewFormVisible = false;
this.isNewFormVisiblefunction=false;
    this.loadDatafunction();
 }
  }
detailList(currentCategory){
if(currentCategory == ''){

}else if(currentCategory ==''){

}
  
}
updateDisplayedColumns() {
  if (this.currentCategory === 'Type Of Freight') {
    this.displayedColumns = this.categories['Type Of Freight'];
  } else if (this.currentCategory === 'identifier') {
    this.displayedColumns = this.categories['identifier'];
  } else {
    this.displayedColumns = this.categories['Type Of Freight'];
  }
}
updateFormArrayWithDefaults(groupHeadName: string) {
  const control = <FormArray>this.docForm.controls['identifiertable'];
  control.clear();
  const defaultData = this.defaultValues[groupHeadName] || [];
  defaultData.forEach(data => {
    control.push(this.createIdentifierTableGroup(data));
  });
}
setView(view: string) {
  this.currentView = view;
}
currentView: string = 'Storage Places';
//  addRow(){
//   const control = <FormArray>this.docForm.controls['identifiertable'];
//   control.push(this.createIdentifierTableGroup({}));

//  }

get identifiertable(): FormArray {
  return this.docForm.get('identifiertable') as FormArray;
}

get identifiertable1(): FormArray {
  return this.docForm.get('identifiertable1') as FormArray;
}

get identifiertable2(): FormArray {
  return this.docForm.get('identifiertable2') as FormArray;
}
addRow(currentCategory) {
if(this.detailList.length != 0 ){
  this.httpService.get<any>(this.IdentifiersLibraryService.codeUrl).subscribe({
    next: (data: any) => {
      console.log(data.codemax);
  this.currentCode = data.codemax ;
}
});
}
  this.identifiertable.push(this.fb.group({
    code: [this.currentCode++, Validators.required],
    description: ['', Validators.required]
  }));
if('Storage Places'){
  this.identifiertable1.push(this.fb.group({
    code1: ['', Validators.required],
    description: ['', Validators.required]
  }));
  this.httpService.get<any>(this.IdentifiersLibraryService.getSequenceCode).subscribe((data: any) => {
let secondDetailRowArray = this.docForm.controls.identifiertable1 as FormArray;
          secondDetailRowArray.clear();
  
          data.identifiertable1.forEach(element => {
            let arraylen = secondDetailRowArray.length;
  
            let newUsergroup: FormGroup = this.fb.group({
              code1: [element.code1],
              
           
            });
            
            secondDetailRowArray.insert(arraylen, newUsergroup);
          });
        })
}else if('Functions'){
  this.identifiertable2.push(this.fb.group({
    code2: ['', Validators.required],
    description: ['', Validators.required]
  }));
}


}
viewCallstorage(row) {
  // // var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countryCode);
  // this.router.navigate(['/crew/maintain/health-status/view-health-status/', row.healthstatusid]);
   let rowId = row.storageId
  let tempDirection;
  if (localStorage.getItem("isRtl") == "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }

  const dialogRef = this.dialog.open(ViewStoragePlaceComponent, {
    height: "270px",
    width: "450px",
    data: rowId,
    direction: tempDirection,
    disableClose: true 

  });


}

viewCallfunction(row) {
  // // var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countryCode);
  // this.router.navigate(['/crew/maintain/health-status/view-health-status/', row.healthstatusid]);
   let rowId = row.functionId
  let tempDirection;
  if (localStorage.getItem("isRtl") == "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }

  const dialogRef = this.dialog.open(ViewFunctionsComponent, {
    height: "270px",
    width: "450px",
    data: rowId,
    direction: tempDirection,
    disableClose: true 

  });


}
viewCall(row) {
  // // var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countryCode);
  // this.router.navigate(['/crew/maintain/health-status/view-health-status/', row.healthstatusid]);
   let rowId = row.code
  let tempDirection;
  if (localStorage.getItem("isRtl") == "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }

  const dialogRef = this.dialog.open(ViewFreightTypeComponent, {
    height: "270px",
    width: "450px",
    data: rowId,
    direction: tempDirection,
    disableClose: true 

  });


}
deleteItem(row){
  let tempDirection;
  if (localStorage.getItem("isRtl") == "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }

  const dialogRef = this.dialog.open(DeleteComponent, {
    height: "270px",
    width: "400px",
    data: row,
    direction: tempDirection,
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
  if (data.data == true) {
    this.spinner.show();
    this.IdentifiersLibraryService.delete(row.code).subscribe({
      next: (data) => {
        this.spinner.hide();
  if (data.success) {
    this.loadData(this.type=4);
    this.showNotification(
      "snackbar-success",
      "Record Deleted",
      "bottom",
      "center"
    );
  } else {
    this.showNotification(
      "snackbar-danger",
      data.message || "Error in delete",
      "bottom",
      "center"
    );
  }
},
error: (error) => {
  this.spinner.hide();
  this.showNotification(
    "snackbar-danger",
    "An error occurred while deleting the record.",
    "bottom",
    "center"
  );
}
    });
  }else{
    //this.loadData();
  }
  })
}
deleteItemfunction(row){
  let tempDirection;
  if (localStorage.getItem("isRtl") == "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }

  const dialogRef = this.dialog.open(DeleteComponent, {
    height: "270px",
    width: "400px",
    data: row,
    direction: tempDirection,
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
  if (data.data == true) {
    this.spinner.show();
    this.IdentifiersLibraryService.deletefunction(row.functionId).subscribe({
      next: (data) => {
        this.spinner.hide();
  if (data.success) {
    this.loadDatafunction();
    this.showNotification(
      "snackbar-success",
      "Record Deleted",
      "bottom",
      "center"
    );
  } else {
    this.showNotification(
      "snackbar-danger",
      data.message || "Error in delete",
      "bottom",
      "center"
    );
  }
},
error: (error) => {
  this.spinner.hide();
  this.showNotification(
    "snackbar-danger",
    "An error occurred while deleting the record.",
    "bottom",
    "center"
  );
}
    });
  }else{
    //this.loadData();
  }
  })
}
deleteItemstorage(row){
  let tempDirection;
  if (localStorage.getItem("isRtl") == "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }

  const dialogRef = this.dialog.open(DeleteComponent, {
    height: "270px",
    width: "400px",
    data: row,
    direction: tempDirection,
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
  if (data.data == true) {
    this.spinner.show();
    this.IdentifiersLibraryService.deletestorage(row.storageId).subscribe({
      next: (data) => {
        this.spinner.hide();
  if (data.success) {
    this.loadDatastorage();
    this.showNotification(
      "snackbar-success",
      "Record Deleted",
      "bottom",
      "center"
    );
  } else {
    this.showNotification(
      "snackbar-danger",
      data.message || "Error in delete",
      "bottom",
      "center"
    );
  }
},
error: (error) => {
  this.spinner.hide();
  this.showNotification(
    "snackbar-danger",
    "An error occurred while deleting the record.",
    "bottom",
    "center"
  );
}
    });
  }else{
    //this.loadData();
  }
  })
}
editCall(row){
  this.isNewFormVisible = true;
        this.showcard=false;
        this.fetchDetails(row.code,'Type Of Freight')
}
editCallStorage(row){
 
        this.isNewFormVisiblestoarge = true;
this.storageshowcard=false;
        this.fetchDetails(row.storageId,'Storage Places')
}

editCallFunction(row){
 


this.functionshowcard=false;
this.isNewFormVisiblefunction=true;
  this.fetchDetails(row.functionId,'Functions')
}
updatefunction() {
   
  if(this.docForm.valid){


    this.httpService.post<any>(this.IdentifiersLibraryService.updatefunctionUrl,this.docForm.value).subscribe({next: (data: any) => {
      
      if (data.success == true) {
        this.notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        this.functionshowcard=true;
        this.isNewFormVisiblefunction=false;
        this.loadDatafunction();

      }else{
        this.notificationService.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
    }, error: (err) => console.log(err)
     })  }else{
    this.matError.markFormGroupTouched(this.docForm);
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right");
  }
}
update() {
   
  if(this.docForm.valid){


    this.httpService.post<any>(this.IdentifiersLibraryService.updateUrl,this.docForm.value).subscribe({next: (data: any) => {
      
      if (data.success == true) {
        this.notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        this.isNewFormVisible = false;
        this.showcard=true;
        this.loadData(this.type=4);

      }else{
        this.notificationService.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
    }, error: (err) => console.log(err)
     })  }else{
    this.matError.markFormGroupTouched(this.docForm);
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right");
  }
}
updatestorage() {
   
  if(this.docForm.valid){


    this.httpService.post<any>(this.IdentifiersLibraryService.updatestorageUrl,this.docForm.value).subscribe({next: (data: any) => {
      
      if (data.success == true) {
        this.notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        this.isNewFormVisiblestoarge = false;
        this.storageshowcard=true;
                this.loadDatastorage();

      }else{
        this.notificationService.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
    }, error: (err) => console.log(err)
     })  }else{
    this.matError.markFormGroupTouched(this.docForm);
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right");
  }
}
savefunction(currentCategory){
  if(this.docForm.valid){


    this.httpService.post<any>(this.IdentifiersLibraryService.savefunctionUrl,this.docForm.value).subscribe({next: (data: any) => {
      
      if (data.success == true) {
        this.notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        this.functionshowcard=true;
        this.isNewFormVisiblefunction=false;
        this.loadDatafunction();
      }else{
        this.notificationService.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
    }, error: (err) => console.log(err)
     });


  }else{
    this.matError.markFormGroupTouched(this.docForm);
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right");
    }
  
}
save(currentCategory){
  if(this.docForm.valid){


    this.httpService.post<any>(this.IdentifiersLibraryService.saveUrl,this.docForm.value).subscribe({next: (data: any) => {
      
      if (data.success == true) {
        this.notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        this.isNewFormVisible = false;
        this.showcard=true;
        this.loadData(this.type=4);

      }else{
        this.notificationService.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
    }, error: (err) => console.log(err)
     });


  }else{
    this.matError.markFormGroupTouched(this.docForm);
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right");
    }
  
}
savestorage(currentCategory){
  if(this.docForm.valid){


    this.httpService.post<any>(this.IdentifiersLibraryService.savestorageUrl,this.docForm.value).subscribe({next: (data: any) => {
      
      if (data.success == true) {
        this.notificationService.showNotification(
          "snackbar-success",
          "Record Added Successfully",
          "bottom",
          "center"
        );
        this.isNewFormVisiblestoarge = false;
        this.storageshowcard=true;
        this.loadDatastorage();

      }else{
        this.notificationService.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
    }, error: (err) => console.log(err)
     });


  }else{
    this.matError.markFormGroupTouched(this.docForm);
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right");
    }
  
}


fetchDetails(code,category) {
if(category =='Type Of Freight'){
  this.edit=true;
  this.httpService.get<any>(this.IdentifiersLibraryService.editUrl+"?id="+code).subscribe({next: (data: any) => {
    this.docForm.patchValue({
      'code': data.list[0].code,
      'description': data.list[0].description,

    });

  }
});
} else if(category =='Storage Places'){
  this.edit=true;
  this.httpService.get<any>(this.IdentifiersLibraryService.editstorageUrl+"?id="+code).subscribe({next: (data: any) => {
    this.docForm.patchValue({
      'code1': data.list[0].code1,
      'description': data.list[0].description,
       'storageId': data.list[0].storageId,
    });

  }
});

}else if(category =='Functions')
this.edit=true;
this.httpService.get<any>(this.IdentifiersLibraryService.editfunctionUrl+"?id="+code).subscribe({next: (data: any) => {
  this.docForm.patchValue({
    'code2': data.list[0].code2,
    'description': data.list[0].description,
     'functionId': data.list[0].functionId,
  });

}
});

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

public loadData(type) {
  this.exampleDatabase = new IdentifiersLibraryService(this.httpClient,this.serverUrl,this.httpService);
  this.dataSource = new ExampleDataSource(
    this.exampleDatabase,
    this.paginator,
    type,
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

public loadDatafunction() {
  this.exampleDatabasefunction = new IdentifiersLibraryService(this.httpClient,this.serverUrl,this.httpService);
  this.dataSource3 = new ExampleDataSourcefunction(
    this.exampleDatabasefunction,
    this.paginatorfunction,
    this.sortfunction
  );
  this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
    () => {
      if (!this.dataSource3) {
        return;
      }
      this.dataSource3.filter = this.filter.nativeElement.value;
    }
  );
}

public loadDatastorage() {
  this.exampleDatabasestorage = new IdentifiersLibraryService(this.httpClient,this.serverUrl,this.httpService);
  this.dataSource2 = new ExampleDataSourcestorage(
    this.exampleDatabasestorage,
    this.paginatorstorage,
    this.sortstoarge
  );
  this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
    () => {
      if (!this.dataSource2) {
        return;
      }
      this.dataSource2.filter = this.filter.nativeElement.value;
    }
  );
}

private refreshTable() {
  this.paginator._changePageSize(this.paginator.pageSize);
}
// context menu
onContextMenu(event: MouseEvent, item: identifier) {
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
    public type:any, 

    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<identifier[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    if(this.type===4){
      this.exampleDatabase.getList();
    } 
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((maintain: identifier) => {
            const searchStr = (
              maintain.code +
              maintain.description 
             

             
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
  sortData(data: identifier[]): identifier[] {
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

export class ExampleDataSourcestorage extends DataSource<identifier> {
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
    public exampleDatabasestorage: IdentifiersLibraryService,
    public paginatorstorage: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginatorstorage.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<identifier[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabasestorage.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginatorstorage.page,
    ];

      this.exampleDatabasestorage.getListStorage();
    
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabasestorage.data
          .slice()
          .filter((maintain: identifier) => {
            const searchStr = (
              maintain.code1 +
              maintain.description 
             

             
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginatorstorage.pageIndex * this.paginatorstorage.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginatorstorage.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: identifier[]): identifier[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        
        case "code1":
          [propertyA, propertyB] = [a.code1, b.code1];
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

export class ExampleDataSourcefunction extends DataSource<identifier> {
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
    public exampleDatabasefunction: IdentifiersLibraryService,
    public paginatorfunction: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginatorfunction.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<identifier[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabasefunction.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginatorfunction.page,
    ];

      this.exampleDatabasefunction.getListFunction();
    
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabasefunction.data
          .slice()
          .filter((maintain: identifier) => {
            const searchStr = (
              maintain.code2 +
              maintain.description 
             

             
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginatorfunction.pageIndex * this.paginatorfunction.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginatorfunction.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: identifier[]): identifier[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        
        case "code2":
          [propertyA, propertyB] = [a.code2, b.code2];
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
