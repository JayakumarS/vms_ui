
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-user-agent-link',
  templateUrl: './add-user-agent-link.component.html',
  styleUrls: ['./add-user-agent-link.component.sass'],
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
export class AddUserAgentLinkComponent implements OnInit {

  docForm: FormGroup;
  crewuserList:any=[];
  agentList: any=[];
  timingList: any=[];

  public vesselFilterCtrl: FormControl = new FormControl();
  vesselFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('vesselFilter', { static: true }) vesselFilter: MatSelect;

  public portFilterCtrl: FormControl = new FormControl();
  portFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('portFilter', { static: true }) portFilter: MatSelect;
  protected onDestroy = new Subject<void>();

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router
  ) { 
    this.docForm = this.fb.group({
      firstDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          crewuser: [""],
          agent: [""],
         
        })
      ])
    });
  }

  ngOnInit(): void {
    let id = 1;

    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        this.timingList.push({ id: id++, text: timeString });
      }
    }
    this.crewuserList = [{id:1,text:"GODA-GODAVARI"},{id:2,text:"RJG-RAJIV GANDHI"},{id:3,text:"IDG-INDIRA GANDHI"},{id:4,text:"ARJ-TCI ARJUN"}];
    this.vesselFilteredOptions.next(this.crewuserList.slice());

    this.vesselFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
        this.filtervessel();
    });

    this.agentList = [{id:1,text:"APEX MARINE SERVICES PVT LTD "},{id:2,text:"CEYLINE SHIPPING LTD"},{id:3,text:"ELEKTRANS SHIPPING PVT LTD"},{id:4,text:"EUGENIA LTD"},{id:5,text:"FLY-HI MARINE TRAVEL"},{id:6,text:"GLOBAL SERVICE MARINE AGENCY"}];
    // this.portFilteredOptions.next(this.portList.slice());

    // this.portFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
    //     this.filtervessel();
    // });
  }

   onVesselChange(){}


   filtervessel(){
    if (!this.crewuserList) {
      return;
    }
    let search = this.vesselFilterCtrl.value;
    if (!search) {
      this.vesselFilteredOptions.next(this.crewuserList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.vesselFilteredOptions.next(
      this.crewuserList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   get firstDetailRow() {
    return this.docForm.get('firstDetailRow') as FormArray;
  }

  getDateControl(index: number,name:any) {
    return this.firstDetailRow.at(index).get([name]);
  }


  

  addRow(){
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      crewuser: [""],
      agent: [""],
      
    })
    firstDetailRow.insert(arraylen, newUsergroup);
  }

  removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.firstDetailRow as FormArray;
    let i = 0;
    
    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if(count == 0){
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: [colorName, 'snackbar-text'],
      data: {
        html: true
      }
    });
  }

  save(){

  }

  cancel(){
    this.router.navigate(['/crew/application-properties/user-agent-link/list-user-agent-link']);
  }

}
