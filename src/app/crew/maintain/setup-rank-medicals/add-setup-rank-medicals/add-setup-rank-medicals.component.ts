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
import { MatSelect } from '@angular/material/select';
import { setupmedical } from '../setup-rank-medicals.model';
import { SetupRankMedicalsService } from '../setup-rank-medicals.service';

@Component({
  selector: 'app-add-setup-rank-medicals',
  templateUrl: './add-setup-rank-medicals.component.html',
  styleUrls: ['./add-setup-rank-medicals.component.sass']
})
export class AddSetupRankMedicalsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  edit: boolean = false;
  requestId: number;
  setupmedical: setupmedical;
  displayedColumns: any[];
  exampleDatabase: SetupRankMedicalsService | null;
  selection = new SelectionModel<setupmedical>(true, []);
  showTable: boolean = false;
  showMasterColumns = false;
  showBMasterColumns = false;
  public srankcodeFilterCtrl: FormControl = new FormControl();
  srankcodeFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('srank', { static: true }) srank: MatSelect;
  protected onDestroy = new Subject<void>();
  ranklist: any = [];
  medicallist: any = [];
  filteredColumns: string[] = [];
  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private setupRankMedicalsService: SetupRankMedicalsService,
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
      srank: ["0"], // Initial value set to '0'
      medicalcode: [""],
      rankcode: [""],
    });
    this.loadRankList();

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


  loadRankList() {
    this.httpService.get<any>(this.setupRankMedicalsService.ranklist).subscribe((res: any) => {
      this.ranklist = res;
      this.srankcodeFilteredOptions.next(this.ranklist.slice());
      this.loadCertificateList();  // Load certificates after ranks are loaded
    }, (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    });
  }

  loadCertificateList() {
    this.httpService.get<any>(this.setupRankMedicalsService.list).subscribe((res: any) => {
      this.medicallist = res.list;
      this.updateDisplayedColumns('0');  // Initially display columns excluding '0'
      this.fetchAndCheckSavedCertificates();
    }, (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
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
    if (selectedRank === '0') {
      this.displayedColumns = this.ranklist.filter(rank => rank.id !== '0').map(rank => rank.text); // Display all header texts
    } else {
      const selectedRankText = this.ranklist.find(rank => rank.id === selectedRank)?.text ?? ''; // Get the text for the selectedRank
      this.displayedColumns = ['Certificates', selectedRankText];
    }
    this.filteredColumns = [...this.displayedColumns];
  }

  fetchAndCheckSavedCertificates(): void {
    this.httpService.get<any>(this.setupRankMedicalsService.getsaveList).subscribe((savedData: any) => {
      this.updateCheckboxes(savedData.list);
    }, (error: HttpErrorResponse) => {
      console.error('Error fetching saved certificates:', error);
    });
  }

  updateCheckboxes(savedData: any[]): void {
    // Reset all checkboxes
    this.medicallist.forEach(row => {
      this.displayedColumns.forEach(column => {
        row[column] = false;
      });
    });

    // Set the checkboxes based on the saved data
    savedData.forEach(item => {
      const row = this.medicallist.find(r => r.medicalcode == item.medicalcode);
      if (row) {
          const rankText = this.ranklist.find(rank => rank.id == item.rankcode)?.text ?? '';
          row[rankText] = true;
      }
  });

    // Refresh the table to show updated checkboxes
    this.medicallist = [...this.medicallist];
  }

  onSubmit() {
    if (this.docForm.valid) {
      let selectedCertificates: any = [];
      for (let row of this.medicallist) {
        for (let column of this.filteredColumns) {
          if (row[column]) {
            // Push the IDs instead of the text values
          const selectedRankId = this.ranklist.find(rank => rank.text === column)?.id;
          selectedCertificates.push({ medicalcode: row.medicalcode, rankcode: selectedRankId });
        }
          
        }
      }
      this.setupRankMedicalsService.addmedical(selectedCertificates, this.router, this.notificationService);
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
