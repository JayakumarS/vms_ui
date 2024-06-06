import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-define-crew-evaluation-criteria',
  templateUrl: './add-define-crew-evaluation-criteria.component.html',
  styleUrls: ['./add-define-crew-evaluation-criteria.component.sass']
})
export class AddDefineCrewEvaluationCriteriaComponent implements OnInit {

  docForm: FormGroup;
  edit = false;
  editorList: any[] = []; 
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router
  ) { 
    
    this.docForm = this.fb.group({
      createEvaluationDetail: this.fb.array([
        this.fb.group({
          select: [""],
          editorList: [""],
          evaluationCriteria: [""],
          sorting: [""],
          evaluationDescription: [""],
          vsl: [""],
          
        })
      ]),
    });


  }


  ngOnInit(): void {
    this.docForm = this.fb.group({
      evaluationDetailBean: this.fb.array([this.createEvaluationDetail()]),
     
    });
  }

 

  
  evaluationDetailBean(): void {
    this.editorList.forEach(() => {
      this.addRow();
    });
  }





  createEvaluationDetail(): FormGroup {
    return this.fb.group({
      select: [""],
      editorList: [""],
      evaluationCriteria: ['', Validators.required],
      evaluationDescription: ['', Validators.required],
      sorting: ['', Validators.required], // Set sorting count
      vsl: [false]
    });
  }
  
  addRow() {
    let evaluationDetailBean = this.docForm.controls.evaluationDetailBean as FormArray;
    let arraylen = evaluationDetailBean.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      editorList: [""],
      evaluationCriteria: [""],
          sorting: [""],
          evaluationDescription: [""],
          vsl: [""],
    })
    evaluationDetailBean.insert(arraylen, newUsergroup);
  }

  removeRow(){
    let count = 0;
    this.docForm.controls.evaluationDetailBean.value.forEach((element,i) => {
      if(element.select){
        let deleteRow = this.docForm.controls.evaluationDetailBean as FormArray;
        deleteRow.removeAt(i);
        count++;
      }
    });

    if(count == 0){
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }
  }
  

  
  save() {
    console.log(this.docForm.value);
  }

  update() {
    console.log(this.docForm.value);
  }

  reset() {
    this.docForm.reset();
  }

  
  cancel() {
    this.router.navigate(['/crew/application-properties/define-crew-evaluation-criteria/list-define-crew-evaluation-criteria']);
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
