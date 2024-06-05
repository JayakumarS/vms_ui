import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import { Familiarization } from '../familiarization-type.model';
import { FamiliarizationTypesService } from '../familiarization-types.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';

@Component({
  selector: 'app-add-familiarization-types',
  templateUrl: './add-familiarization-types.component.html',
  styleUrls: ['./add-familiarization-types.component.sass']
})
export class AddFamiliarizationTypesComponent implements OnInit {
  docForm: FormGroup;

  constructor( private fb: FormBuilder,
    private commonService: CommonService,
    public familiarizationTypesService: FamiliarizationTypesService,
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
      sorting: [""]  
    });
  }

  save(){
    
  }

  
  cancel(){
    this.router.navigate(['/crew/application-properties/familiarization-types/list-familiarization-type']);
  }

}

