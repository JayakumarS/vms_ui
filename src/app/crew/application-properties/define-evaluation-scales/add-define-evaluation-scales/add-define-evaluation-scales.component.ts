import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/common-service/common.service';


@Component({
  selector: 'app-add-define-evaluation-scales',
  templateUrl: './add-define-evaluation-scales.component.html',
  styleUrls: ['./add-define-evaluation-scales.component.sass']
})
export class AddDefineEvaluationScalesComponent implements OnInit {

  docForm: FormGroup;
  scaleDescriptionList:any=[];


  protected onDestroy = new Subject<void>();

  public scaleDescriptionFilterCtrl: FormControl = new FormControl();
  scaleDescriptionFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('contractsscaleDescription', { static: true }) contractsscaleDescription: MatSelect;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router) { 
      this.docForm = this.fb.group({
        firstDetailRow: this.fb.array([
          this.fb.group({
            select: [""],
            scale: [""],
            scaleDescription: [""],
           
          })
        ]),
      });
    }

   
  ngOnInit(): void {
     this.scaleDescriptionList = [{id:1,text:"NA"},{id:2,text:"YES"},{id:3,text:"NO"},{id:4,text:"HEALTHY"},{id:5,text:"REGULAR MEDCIAL ISSUES"},{id:6,text:"POOR"},{id:7,text:"FAIR"},{id:8,text:"GOOD"},{id:9,text:"V.GOOD"},{id:10,text:"EXCELLENT"}];
    this.scaleDescriptionFilteredOptions.next(this.scaleDescriptionList.slice());
    
    this.scaleDescriptionFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterCurrency();
      });
  }


   filterCurrency(){
    if (!this.scaleDescriptionList) {
      return;
    }
    let search = this.scaleDescriptionFilterCtrl.value;
    if (!search) {
      this.scaleDescriptionFilteredOptions.next(this.scaleDescriptionList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.scaleDescriptionFilteredOptions.next(
      this.scaleDescriptionList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

  addRow() {
    
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      scale: [""],
      scaleDescription: [""],
     
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
    this.router.navigate(['/crew/application-properties/define-crew-evaluation-scales/list-define-crew-evaluation-scales']);
  }

 
}
