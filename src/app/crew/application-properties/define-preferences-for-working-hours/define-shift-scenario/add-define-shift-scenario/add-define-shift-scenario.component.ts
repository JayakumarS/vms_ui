import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-define-shift-scenario',
  templateUrl: './add-define-shift-scenario.component.html',
  styleUrls: ['./add-define-shift-scenario.component.sass']
})
export class AddDefineShiftScenarioComponent implements OnInit {

  public placeFilterCtrl: FormControl = new FormControl();
  placeFilterCtrlOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('placeTest', { static: true }) placeTest: MatSelect;
  protected onDestroy = new Subject<void>();

  docForm: FormGroup;
  placeList:any=[];
  timingList:any=[];

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
          code: [""],
          decription: [""]
        })
      ]),

      secondDetailRow: this.fb.array([
        this.fb.group({
          select: [""],
          shiftStart: [""],
          shiftEnd: [""],
          place: [""],
          watchKeeping: [true],
          readOnly: [true],
          type:[""]
        })
      ])
    });
  }

  ngOnInit(): void {
    const deleteRow = this.docForm.controls.secondDetailRow as FormArray;
    deleteRow.removeAt(0);

    this.placeList = [{id:1,text:"At Sea"},{id:2,text:"In Port"}];
   // this.timingList = [{id:1,text:"0:00"},{id:2,text:"0:30"},{id:3,text:"1:00"},{id:4,text:"1:30"}];

    let id = 1;

    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        this.timingList.push({ id: id++, text: timeString });
      }
    }

    this.placeFilterCtrlOptions.next(this.placeList.slice());
  
    this.placeFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.placeListFilter();
    });
  }

  placeListFilter(){
    if (!this.placeList) {
      return;
    }
    let search = this.placeFilterCtrl.value;

    if(!search) {
      this.placeFilterCtrlOptions.next(this.placeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.placeFilterCtrlOptions.next(
      this.placeList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

  addRow(){
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      code: [""],
      decription: [""]
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

  addRowTwo(){
    let secondDetailRow = this.docForm.controls.secondDetailRow as FormArray;
    let arraylen = secondDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: [""],
      shiftEnd: [""],
      place: [""],
      watchKeeping: [true],
      readOnly: [false],
      type:[""]
    })
    secondDetailRow.insert(arraylen, newUsergroup);
  }

  removeRowTwo(){
    let count = 0;
    const deleteRow = this.docForm.controls.secondDetailRow as FormArray;
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

  shiftOne(){
    let secondDetailRow = this.docForm.controls.secondDetailRow as FormArray;
    for (let i = this.docForm.controls.secondDetailRow.value.length - 1; i >= 0; i--) {
      let element = this.docForm.controls.secondDetailRow.value[i];
      if (element.type == "1") {
          secondDetailRow.removeAt(i);
      }
    }
    
    let arraylen = secondDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["18.30"],
      shiftEnd: ["22.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["1"]
    })
    secondDetailRow.insert(arraylen, newUsergroup);

    let newUsergroupTwo: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["6.30"],
      shiftEnd: ["10.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["1"]
    })
    secondDetailRow.insert(arraylen, newUsergroupTwo);
  }

  shiftTwo(){
    let secondDetailRow = this.docForm.controls.secondDetailRow as FormArray;
    for (let i = this.docForm.controls.secondDetailRow.value.length - 1; i >= 0; i--) {
      let element = this.docForm.controls.secondDetailRow.value[i];
      if (element.type == "2") {
          secondDetailRow.removeAt(i);
      }
    }

    let arraylen = secondDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["22.30"],
      shiftEnd: ["02.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["2"]
    })
    secondDetailRow.insert(arraylen, newUsergroup);

    let newUsergroupTwo: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["10.30"],
      shiftEnd: ["14.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["2"]
    })
    secondDetailRow.insert(arraylen, newUsergroupTwo);
  }

  shiftThree(){
    let secondDetailRow = this.docForm.controls.secondDetailRow as FormArray;
    for (let i = this.docForm.controls.secondDetailRow.value.length - 1; i >= 0; i--) {
      let element = this.docForm.controls.secondDetailRow.value[i];
      if (element.type == "3") {
          secondDetailRow.removeAt(i);
      }
    } 

    let arraylen = secondDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["02.30"],
      shiftEnd: ["06.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["3"]
    })
    secondDetailRow.insert(arraylen, newUsergroup);

    let newUsergroupTwo: FormGroup = this.fb.group({
      select: [""],
      shiftStart: ["14.30"],
      shiftEnd: ["18.30"],
      place: [""],
      watchKeeping: [true],
      readOnly: [true],
      type:["3"]
    })
    secondDetailRow.insert(arraylen, newUsergroupTwo);
  }

  // isReadOnly(i): boolean {
  //   return this.docForm.controls.secondDetailRow.value[i].readOnly;
  // }

  save(){

  }

  cancel(){
    this.router.navigate(['/crew/application-properties/define-preferences-for-working-hours/define-shift-scenario/list-define-shift-scenario']);
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

}
