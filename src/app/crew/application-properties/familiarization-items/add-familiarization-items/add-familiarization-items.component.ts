import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { FamiliarizationItemsService } from '../familiarization-items.service';

@Component({
  selector: 'app-add-familiarization-items',
  templateUrl: './add-familiarization-items.component.html',
  styleUrls: ['./add-familiarization-items.component.sass']
})
export class AddFamiliarizationItemsComponent implements OnInit {

  docForm: FormGroup;

  constructor( private fb: FormBuilder,
    private commonService: CommonService,
    public familiarizationItemsService: FamiliarizationItemsService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router) {

     }


  ngOnInit(): void {
    this.docForm = this.fb.group({
      code: [""],
      description: [""],
      sorting: [""],
      reference: [""]
    });
  }

  save(){
    
  }

  
  cancel(){
    this.router.navigate(['/crew/application-properties/familiarization-items/list-familiarization-items']);
  }
}
