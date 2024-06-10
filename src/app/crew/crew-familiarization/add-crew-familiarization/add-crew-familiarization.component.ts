import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { CrewFamiliarizationService } from '../crew-familiarization.service';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-add-crew-familiarization',
  templateUrl: './add-crew-familiarization.component.html',
  styleUrls: ['./add-crew-familiarization.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
      },
  } },CommonService
  ]
})
export class AddCrewFamiliarizationComponent implements OnInit {
  docForm: FormGroup;
  statusList : any = [];
  vesselList : any = [];

  
  public statusFilterCtrl: FormControl = new FormControl();
  statusFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('statusFilter', { static: true }) statusFilter: MatSelect;

  public vesselFilterCtrl: FormControl = new FormControl();
  vesselFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vesselFilter', { static: true }) vesselFilter: MatSelect;

  protected onDestroy = new Subject<void>();
  familiarizationDetailList:any =[];
  
  constructor( private fb: FormBuilder,
    private commonService: CommonService,
    public crewFamiliarizationService: CrewFamiliarizationService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router) {

     }


  ngOnInit(): void {
    this.docForm = this.fb.group({
      vessel: [""],
      name: [""],
      rank: [""],
      famDateDate: [""],
      famDateObj: [""],
      remarks: [""],
      status: [""],

      firstDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          officePersonnel: [""],
          namedetail : [""],
          date: [""],
          signature: [""],
          remarks: [""]
        })
      ])
    });

    this.familiarizationDetailList = [{officePersonnel:"Onboard Ship Safety Officer",namedetail:"Secound Officer",date:"24/05/2024",signature:"pending",remarks:"testing"},
      {officePersonnel:"Onboard Master or VMT",namedetail:"Lavanya",date:"24/05/2023",signature:"pending",remarks:"testing"}
    ];

    this.statusList = [{id:1,text:"Completed"},{id:2,text:"Pending"},{id:3,text:"Finalized"}];
    this.statusFilteredOptions.next(this.statusList.slice());

    this.statusFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterstatus();
      });

    this.vesselList = [{id:1,text:"GODA-GODAVARI"},{id:2,text:"RJG-RAJIV GANDHI"},{id:3,text:"IDG-INDIRA GANDHI"},{id:4,text:"ARJ-TCI ARJUN"}];
    this.vesselFilteredOptions.next(this.vesselList.slice());

    this.vesselFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filtervessel();
      });
      this.addRow();

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

  filterstatus(){
    if (!this.statusList) {
      return;
    }
    let search = this.statusFilterCtrl.value;
    if (!search) {
      this.statusFilteredOptions.next(this.statusList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.statusFilteredOptions.next(
      this.statusList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   addRow() {
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    firstDetailRow.removeAt(0);
    this.familiarizationDetailList.forEach((element,i)=>{
      let arraylen = firstDetailRow.length;
      let newUsergroup: FormGroup = this.fb.group({
            select: [element.select],
            officePersonnel: [element.officePersonnel],
            namedetail: [element.namedetail],
            date: [element.date],
            signature: [element.signature],
            remarks: [element.remarks]
      })
      firstDetailRow.insert(arraylen, newUsergroup);
    })

  }

   
  getDateString(event,id){
    let cdate = this.commonService.getDate(event.target.value);

    if(id == 'famDate'){
      this.docForm.patchValue({
        famDate : cdate
      })
    
    }
  }

  save(){
    
  }

  
  cancel(){
    this.router.navigate(['/crew/application-properties/familiarization-types/list-familiarization-type']);
  }

}