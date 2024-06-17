import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-cities-airports',
  templateUrl: './add-cities-airports.component.html',
  styleUrls: ['./add-cities-airports.component.sass']
})
export class AddCitiesAirportsComponent implements OnInit {

  docForm: FormGroup;
  countryList:any=[];


 

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router) { 
      this.docForm = this.fb.group({
        firstDetailRow: this.fb.array([
          this.fb.group({
            select: [""],
            code:['', Validators.required],
            title: ['', Validators.required],
            country: [""]
          })
        ]),
      });
    }

   
  ngOnInit(): void {
     this.countryList = [{id:1,text:"United States"},{id:2,text:"Canada"}];
    
  }
 

  addRow() {
    
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      code: ['', Validators.required],
            title: ['', Validators.required],
            country: [""]
     
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
    this.router.navigate(['/crew/maintain/crew-ticketing/cities-airports/list-cities-airports']);
  }

 
}
