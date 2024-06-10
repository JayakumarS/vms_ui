import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { UtilitiesService } from '../utilities.service';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-utilities',
  templateUrl: './add-utilities.component.html',
  styleUrls: ['./add-utilities.component.sass']
})
export class AddUtilitiesComponent implements OnInit {
  docForm: FormGroup;
  vesselList : any = [];
  optionList : any = [];

  public vesselFilterCtrl: FormControl = new FormControl();
  vesselFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vesselFilter', { static: true }) vesselFilter: MatSelect;
  protected onDestroy = new Subject<void>();

  public optionFilterCtrl: FormControl = new FormControl();
  optionFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('optionFilter', { static: true }) optionFilter: MatSelect;


  constructor( private fb: FormBuilder,
    private commonService: CommonService,
    public utilitiesService: UtilitiesService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router) { }

  ngOnInit(): void {
    this.docForm = this.fb.group({
      vessel: [""],
      option: [""],
      startFrom: [""],
      formate: [""]  
    });

    this.vesselList = [{id:1,text:"GODA-GODAVARI"},{id:2,text:"RJG-RAJIV GANDHI"},{id:3,text:"IDG-INDIRA GANDHI"},{id:4,text:"ARJ-TCI ARJUN"}];
    this.vesselFilteredOptions.next(this.vesselList.slice());

    this.vesselFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filtervessel();
      });

      this.optionList = [{id:1,text:"Manual Counters"},{id:2,text:"Per Vessel Only"},{id:3,text:"Per Vessel and Departments"}];
      this.optionFilteredOptions.next(this.optionList.slice());
  
      this.optionFilterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterOption();
        });
  }

  filterOption(){
    if (!this.optionList) {
      return;
    }
    let search = this.optionFilterCtrl.value;
    if (!search) {
      this.optionFilteredOptions.next(this.optionList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.optionFilteredOptions.next(
      this.optionList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filtervessel(){
    if (!this.vesselList) {
      return;
    }
    let search = this.vesselFilterCtrl.value;
    if (!search) {
      this.vesselFilteredOptions.next(this.vesselList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.vesselFilteredOptions.next(
      this.vesselList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

  save(){
    
  }
  
  info(){
    this.router.navigate(['/supplies/maintain/utilities/user-log']);
  }

  exit(){

  }
}