import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-evaluation-departments-per-user',
  templateUrl: './add-evaluation-departments-per-user.component.html',
  styleUrls: ['./add-evaluation-departments-per-user.component.sass']
})
export class AddEvaluationDepartmentsPerUserComponent implements OnInit {

  docForm: FormGroup;
  departmentList:any=[];
  userIDList:any=[];
 

  // public userIDFilterCtrl: FormControl = new FormControl();
  // userIDFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  // @ViewChild('contractsuserID', { static: true }) contractsuserID: MatSelect;

 

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router) { 
      this.docForm = this.fb.group({
        firstDetailRow: this.fb.array([
          this.fb.group({
            select: [""],
            department: [""],
            userID: [""],
           
          })
        ]),
      });
    }

   
  ngOnInit(): void {
     this.userIDList = [{id:1,text:"E0001"},{id:2,text:"E0002"},{id:3,text:"E0003"},{id:4,text:"E0004"},{id:5,text:"E0005"},{id:6,text:"E0006"},{id:7,text:"E0007"},{id:8,text:"E0008"},{id:9,text:"E0009"},{id:10,text:"E00010"}];
    this.departmentList = [{id:1,text:"DEBT-1"},{id:2,text:"DEBT-2"},{id:3,text:"DEBT-3"}];
   
  }


 

  addRow() {
    
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      department: [""],
      userID: [""],
     
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
    this.router.navigate(['/crew/application-properties/evaluation-departments-per-user/list-evaluation-departments-per-user']);
  }

 
}
