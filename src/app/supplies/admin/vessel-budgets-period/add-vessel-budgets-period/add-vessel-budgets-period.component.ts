import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-vessel-budgets-period',
  templateUrl: './add-vessel-budgets-period.component.html',
  styleUrls: ['./add-vessel-budgets-period.component.sass']
})
export class AddVesselBudgetsPeriodComponent implements OnInit {
  
  docForm:FormGroup;
  vesselList:any=[];
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    public dialog: MatDialog
  ) { 
    this.docForm = this.fb.group({
      vessel:[""],
      type:[""]
    });
  }

  ngOnInit(): void {
    this.vesselList = [{id:1,text:"GFS JUNO"},{id:2,text:"GFS PEARL"},{id:3,text:"GFS PERFECT"},{id:4,text:"GFS PRIDE"}];
  }

  save(){}

  cancel(){
    this.router.navigate(['/supplies/admin/vessel-budgets-period/list-vessel-budgets-period']);
  }

}
