import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-link-ticket-types-ledger-cards',
  templateUrl: './add-link-ticket-types-ledger-cards.component.html',
  styleUrls: ['./add-link-ticket-types-ledger-cards.component.sass']
})
export class AddLinkTicketTypesLedgerCardsComponent implements OnInit {
  docForm: FormGroup;
  ledgerCardsList:any=[];
  ticketTypesList:any=[];

 

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router) { 
      this.docForm = this.fb.group({
        firstDetailRow: this.fb.array([
          this.fb.group({
            select: [""],
            ticketTypes: [""],
            ledgerCards: [""],
           
          })
        ]),
      });
    }
    
    
   
  ngOnInit(): void {
     this.ledgerCardsList = [{id:1,text:"NCREW PROVISIONS (5101)A"},{id:2,text:" CREW RECOVERY"},{id:3,text:"CREW TRAINING (5195)"},{id:4,text:"CREW TRAVEL EXPENSES (5130)"},{id:5,text:"CREW UNIFORM (5192)"},{id:6,text:"CREW WAGES (5001)"}];
     this.ticketTypesList = [{id:1,text:"BUSSINESS"},{id:2,text:"FIRST CLASS"},{id:3,text:"ECONOMIC"}];
  }

 
  addRow() {
    
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.fb.group({
      select: [""],
      ticketTypes: [""],
      ledgerCards: [""],
     
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
    this.router.navigate(['/crew/maintain/crew-ticketing/link-ticket-types-ledger-cards/list-link-ticket-types-ledger-cards']);
  }

 
}
