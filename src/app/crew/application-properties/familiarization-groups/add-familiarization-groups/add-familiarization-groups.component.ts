import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { FamiliarizationGroupsService } from '../familiarization-groups.service';

@Component({
  selector: 'app-add-familiarization-groups',
  templateUrl: './add-familiarization-groups.component.html',
  styleUrls: ['./add-familiarization-groups.component.sass']
})
export class AddFamiliarizationGroupsComponent implements OnInit {
  docForm: FormGroup;
  constructor( private fb: FormBuilder,
    private commonService: CommonService,
    public familiarizationGroupsService: FamiliarizationGroupsService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router) { }

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
    this.router.navigate(['/crew/application-properties/familiarization-groups/list-familiarization-groups']);
  }
}
