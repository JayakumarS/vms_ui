import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { serverLocations } from 'src/app/auth/serverLocations';
import { SetupRankCertificatesService } from '../setup-rank-certificates.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject, fromEvent, map, merge, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { setuprank } from '../setup-rank-certificates.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-add-setup-rank-certificates',
  templateUrl: './add-setup-rank-certificates.component.html',
  styleUrls: ['./add-setup-rank-certificates.component.sass']
})
export class AddSetupRankCertificatesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  edit: boolean = false;
  requestId: number;
  setuprank: setuprank;
  exampleDatabase: SetupRankCertificatesService | null;
  selection = new SelectionModel<setuprank>(true, []);
  showTable: boolean = false;
  showMasterColumns = false;
  showBMasterColumns = false;
  ranklist: any = [];
  certificatelist:any=[];
  public srankcodeFilterCtrl: FormControl = new FormControl();
  srankcodeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('srank', { static: true }) srank: MatSelect;
  protected onDestroy = new Subject<void>();
  certificatecode: any;
  rankcode: string;
  filteredColumns: string[] = [];
  displayedColumns: any;
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
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.docForm = this.fb.group({
      srank: ["A"],
      certificatecode: [""],
      rankcode: [""],
    });

    this.httpService.get<any>(this.setupRankCertificatesService.ranklist).subscribe((res: any) => {
      this.ranklist = res;
      this.displayedColumns = this.ranklist.map(rank => rank.id); // Assuming ranklist contains rank ids
      this.filteredColumns = [...this.displayedColumns];
      this.srankcodeFilteredOptions.next(this.ranklist.slice());
    }, (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    });


    this.httpService.get<any>(this.setupRankCertificatesService.list).subscribe((res: any) => {
      this.certificatelist = res.list;
      this.updateDisplayedColumns('A');  // Initially display all columns
      this.fetchAndCheckSavedCertificates();
    }, (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    });


  
    this.srankcodeFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterrank();
      });

    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
      }
    });

    this.docForm.get("srank")?.valueChanges.subscribe((selectedRank: string) => {
      this.updateDisplayedColumns(selectedRank);
      this.fetchAndCheckSavedCertificates();
    });

    
  }

  filterrank() {
    if (!this.ranklist) {
      return;
    }
    let search = this.srankcodeFilterCtrl.value;
    if (!search) {
      this.srankcodeFilteredOptions.next(this.ranklist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.srankcodeFilteredOptions.next(
      this.ranklist.filter(title => title.text.toLowerCase().includes(search))
    );
  }
  updateDisplayedColumns(selectedRank: string): void {
    if (selectedRank === 'A') {
      this.displayedColumns = this.ranklist.filter(rank => rank.id !== 'A').map(rank => rank.id);
    } else {
      this.displayedColumns = ['Certificates', selectedRank];
    }
  }
  
  
  

  fetchAndCheckSavedCertificates(): void {
    this.httpService.get<any>(this.setupRankCertificatesService.getsaveList).subscribe((savedData: any) => {
        this.updateCheckboxes(savedData.list);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching saved certificates:', error);
      }
    );
  }


  updateCheckboxes(savedData: any[]): void {
    // Reset all checkboxes
    this.certificatelist.forEach(row => {
      this.displayedColumns.forEach(column => {
        row[column] = false;
      });
    });

    // Set the checkboxes based on the saved data
    savedData.forEach(item => {
      const row = this.certificatelist.find(r => r.certificatecode === item.certificatecode);
      if (row) {
        row[item.rankcode] = true;
      }
    });

    // Refresh the table to show updated checkboxes
    this.certificatelist = [...this.certificatelist];
  }


 
  // onRankChange(selectedRank: string) {
  //   if (selectedRank === 'A') {
  //     this.filteredColumns = [...this.displayedColumns];
  //   } else {
  //     this.filteredColumns = [selectedRank];
  //   }
  // }


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


onCheckboxChange(checked: boolean, row: any, column: string) {
  row[column] = checked;
}




  

onSubmit() {
  if (this.docForm.valid) {
    let selectedCertificates: any = [];
    for (let row of this.certificatelist) {
      for (let column of this.filteredColumns) {
        if (row[column]) {
          selectedCertificates.push({ certificatecode: row.certificatecode, rankcode: column });
        }
      }
    }
    this.setupRankCertificatesService.addrank(selectedCertificates, this.router, this.notificationService);
  } else {
    this.notificationService.showNotification(
      'snackbar-danger',
      'Please fill all details',
      'bottom',
      'center'
    );
  }
}

}




