import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonMaintenanceService } from 'src/app/crew/applications/person-maintenance/person-maintenance.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-person-details-popup',
  templateUrl: './person-details-popup.component.html',
  styleUrls: ['./person-details-popup.component.sass']
})
export class PersonDetailsPopupComponent implements OnInit {
  docForm:FormGroup;
  persondtls:any=[];
  id:any;
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private personservice: PersonMaintenanceService,
    public dialogRef:MatDialogRef<PersonDetailsPopupComponent>,
  ){

  }

  ngOnInit(): void {
    this.fetchDetails("CM0003");
  }

  fetchDetails(id){
    this.httpService.get<any>(this.personservice.detailsUrl+"?id="+id).subscribe({next: (data: any) => {
      this.persondtls = data.personMaintenanceBean;
      }, error: (err) => console.log(err)
     });
  }

  onCancel(){
    this.dialogRef.close();
  }

}

