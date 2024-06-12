import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { MaintainCountersService } from '../maintain-counters.service';

@Component({
  selector: 'app-add-maintain-counters',
  templateUrl: './add-maintain-counters.component.html',
  styleUrls: ['./add-maintain-counters.component.sass']
})
export class AddMaintainCountersComponent implements OnInit {
  filteredGroupHead: any[];
  searchTerm: string = '';
  searchTermtext: string = '';
  filteredData: any[];
  filteredResults: any[] = [];
  selectedGroupHead: string = '';
  docForm: FormGroup;
  vesselList : any = [];
  optionList : any = [];
  tableFalg : boolean = false;
  public vesselFilterCtrl: FormControl = new FormControl();
  vesselFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vesselFilter', { static: true }) vesselFilter: MatSelect;
  protected onDestroy = new Subject<void>();

  public optionFilterCtrl: FormControl = new FormControl();
  optionFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('optionFilter', { static: true }) optionFilter: MatSelect;

  groupHead=[
    {groupHeadName:'ABU SAMRAH'},
    {groupHeadName:'ATHENA'},
    {groupHeadName:'GFS GALAXY'},
    {groupHeadName:'GFS GENESIS'},
    {groupHeadName:'GFS GISELLE'},
    {groupHeadName:'GFS JADE'},
    {groupHeadName:'GFS JUNO'},
    {groupHeadName:'GFS PEARL'},
    {groupHeadName:'GFS PERFECT'},
    {groupHeadName:'GFS PRECIOUS'},
    {groupHeadName:'GFS PRESTIGE'},
    {groupHeadName:'GFS PRIDE'},
  
  ]
  constructor( private fb: FormBuilder,
    private commonService: CommonService,
    public maintainCountersService: MaintainCountersService,
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

    this.vesselList = [{id:1,text:"GFS SHIP MANAGEMENT FZE"},{id:2,text:"INTERWORLD"},{id:3,text:"SAFEEN BULK CARRIERS"},{id:4,text:"SAFEEN CONTAINERS"},
      {id:5,text:"SAFEEN MULTI PURPOSE VESSEl"},{id:6,text:"SAFEEN RORO"},{id:7,text:"SIMA MARINE (INDIA)"}
    ];
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

  test(){
    this.tableFalg =true;
  }

  onSearchClick() {
    const searchValue = this.searchTerm.toLowerCase();
    this.filteredGroupHead = this.groupHead.filter(group =>
      group.groupHeadName.toLowerCase().includes(searchValue)
    );
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
    this.router.navigate(['/supplies/utilities/user-log']);
  }

  exit(){

  }
}
