import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SetupRankTrainingsService } from '../setup-rank-trainings.service';
import { setuptraining } from '../setup-rank-trainings.model';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-setup-rank-trainings',
  templateUrl: './add-setup-rank-trainings.component.html',
  styleUrls: ['./add-setup-rank-trainings.component.sass']
})
export class AddSetupRankTrainingsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  edit: boolean = false;
  requestId: number;
  setuptraining: setuptraining;
  displayedColumns: any[];
  exampleDatabase: SetupRankTrainingsService | null;
  selection = new SelectionModel<setuptraining>(true, []);
  showTable: boolean = false;
  showMasterColumns = false;
  showBMasterColumns = false;
  public srankcodeFilterCtrl: FormControl = new FormControl();
  srankcodeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('srank', { static: true }) srank: MatSelect;
  protected onDestroy = new Subject<void>();
  ranklist: any = [];
  traininglist: any = [];
  filteredColumns: string[] = [];

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private setupRankTrainingsService: SetupRankTrainingsService,
    private router: Router,
    private serverUrl: serverLocations,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    private cmnService: CommonService,
    private httpClient: HttpClient,
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
      srank: ["A"], // Initial value set to 'A'
      trainingcode: [""],
      rankcode: [""],
    });

    this.httpService.get<any>(this.setupRankTrainingsService.ranklist).subscribe((res: any) => {
      this.ranklist = res;
      this.srankcodeFilteredOptions.next(this.ranklist.slice());
    }, (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    });

    this.httpService.get<any>(this.setupRankTrainingsService.list).subscribe((res: any) => {
      this.traininglist = res.list;
      this.updateDisplayedColumns('A');  // Initially display columns excluding 'A'
      this.fetchAndCheckSavedCertificates();
    }, (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    });

    this.srankcodeFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.filterrank();
    });

    this.docForm.get("srank")?.valueChanges.subscribe((selectedRank: string) => {
      this.updateDisplayedColumns(selectedRank);
      this.fetchAndCheckSavedCertificates();
    });

    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
      }
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
    this.filteredColumns = [...this.displayedColumns];
  }

  fetchAndCheckSavedCertificates(): void {
    this.httpService.get<any>(this.setupRankTrainingsService.getsaveList).subscribe((savedData: any) => {
      this.updateCheckboxes(savedData.list);
    }, (error: HttpErrorResponse) => {
      console.error('Error fetching saved certificates:', error);
    });
  }

  updateCheckboxes(savedData: any[]): void {
    // Reset all checkboxes
    this.traininglist.forEach(row => {
      this.displayedColumns.forEach(column => {
        row[column] = false;
      });
    });

    // Set the checkboxes based on the saved data
    savedData.forEach(item => {
      const row = this.traininglist.find(r => r.trainingcode === item.trainingcode);
      if (row) {
        row[item.rankcode] = true;
      }
    });

    // Refresh the table to show updated checkboxes
    this.traininglist = [...this.traininglist];
  }

  onSubmit() {
    if (this.docForm.valid) {
      let selectedCertificates: any = [];
      for (let row of this.traininglist) {
        for (let column of this.filteredColumns) {
          if (row[column]) {
            selectedCertificates.push({ trainingcode: row.trainingcode, rankcode: column });
          }
        }
      }
      this.setupRankTrainingsService.addtraining(selectedCertificates, this.router, this.notificationService);
    } else {
      this.notificationService.showNotification(
        'snackbar-danger',
        'Please fill all details',
        'bottom',
        'center'
      );
    }
  }

  onCheckboxChange(checked: boolean, row: any, column: string) {
    row[column] = checked;
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
