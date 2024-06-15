import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-ticket-types',
  templateUrl: './add-ticket-types.component.html',
  styleUrls: ['./add-ticket-types.component.sass']
})
export class AddTicketTypesComponent implements OnInit {

  docForm: FormGroup;
  scaleDescriptionList:any=[];


 

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router) { 
      this.docForm = this.fb.group({
        firstDetailRow: this.fb.array([
          this.fb.group({
            select: [""],
            code: [""],
            desc: [""],
           
          })
        ]),
      });
    }

   
  ngOnInit(): void {
     this.scaleDescriptionList = [{id:1,text:"NA"},{id:2,text:"YES"},{id:3,text:"NO"},{id:4,text:"HEALTHY"},{id:5,text:"REGULAR MEDCIAL ISSUES"},{id:6,text:"POOR"},{id:7,text:"FAIR"},{id:8,text:"GOOD"},{id:9,text:"V.GOOD"},{id:10,text:"EXCELLENT"}];
    
  }



  addRow() {
    
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      code: [""],
            desc: [""],
     
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
    this.router.navigate(['/crew/maintain/crew-ticketing/ticket-types/list-ticket-types']);
  }

 
}
