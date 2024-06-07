import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-define-evaluation-legends',
  templateUrl: './add-define-evaluation-legends.component.html',
  styleUrls: ['./add-define-evaluation-legends.component.sass']
})
export class AddDefineEvaluationLegendsComponent implements OnInit {

  docForm: FormGroup;
  evaluationCriteriaList:any=[];
  evaluationScaleList:any=[];
  public evaluationScaleFilterCtrl: FormControl = new FormControl();
  evaluationScaleFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('contractsevaluationScale', { static: true }) contractsevaluationScale: MatSelect;

  protected onDestroy = new Subject<void>();

  public evaluationCriteriaFilterCtrl: FormControl = new FormControl();
  evaluationCriteriaFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('contractsevaluationCriteria', { static: true }) contractsevaluationCriteria: MatSelect;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router) { 
      this.docForm = this.fb.group({
        firstDetailRow: this.fb.array([
          this.fb.group({
            select: [""],
            evaluationCriteria: [""],
            evaluationScale: [""],
            evaluationlegends: [""]
          })
        ]),
      });
    }
    
   
  ngOnInit(): void {
     this.evaluationScaleList = [{id:1,text:"ABILITY"},{id:2,text:"CONDUCT"},{id:3,text:" PMS & COMPUTER AWARWNESS-INCL DANAOS"},{id:4,text:"ISM COMPLIANCE"},{id:5,text:"DILIGNCE"},{id:6,text:"DISCIPLINE"},{id:7,text:"INTEGRITY"}];
    this.evaluationScaleFilteredOptions.next(this.evaluationScaleList.slice());
    
    this.evaluationScaleFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterevaluationScale();
      });


      this.evaluationCriteriaList = [{id:1,text:"NA"},{id:2,text:"YES"},{id:3,text:"NO"},{id:4,text:"HEALTHY"},{id:5,text:"REGULAR MEDCIAL ISSUES"},{id:6,text:"POOR"},{id:7,text:"FAIR"},{id:8,text:"GOOD"},{id:9,text:"V.GOOD"},{id:10,text:"EXCELLENT"}];
      this.evaluationCriteriaFilteredOptions.next(this.evaluationCriteriaList.slice());
      
      this.evaluationCriteriaFilterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterevaluationCriteria();
        });
  }


   filterevaluationScale(){
    if (!this.evaluationScaleList) {
      return;
    }
    let search = this.evaluationScaleFilterCtrl.value;
    if (!search) {
      this.evaluationScaleFilteredOptions.next(this.evaluationScaleList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.evaluationScaleFilteredOptions.next(
      this.evaluationScaleList.filter(title => title.text.toLowerCase().includes(search))
    );
   }


   filterevaluationCriteria(){
    if (!this.evaluationCriteriaList) {
      return;
    }
    let search = this.evaluationCriteriaFilterCtrl.value;
    if (!search) {
      this.evaluationCriteriaFilteredOptions.next(this.evaluationCriteriaList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.evaluationCriteriaFilteredOptions.next(
      this.evaluationCriteriaList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

  addRow() {
    
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      evaluationCriteria: [""],
      evaluationScale: [""],
      evaluationlegends: [""]
     
    })
    firstDetailRow.insert(arraylen, newUsergroup);
  
  }

  removeRow(){
    
    let count = 0;
    const deleteRow = this.docForm.controls.firstDetailRow as FormArray;
    let i=0;

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

  save(){}

  cancel(){
    this.router.navigate(['/crew/application-properties/define-crew-evaluation-legends/list-define-crew-evaluation-legends']);
  }

 
}
