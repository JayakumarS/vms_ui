import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonMaintenanceService } from 'src/app/crew/applications/person-maintenance/person-maintenance.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-person-details-popup',
  templateUrl: './person-details-popup.component.html',
  styleUrls: ['./person-details-popup.component.sass']
})
export class PersonDetailsPopupComponent implements OnInit {
  docForm:FormGroup;
  persondtls:any=[];
  id:any;
  certificateList:any=[];
  crewAppId:any;
  bookDtls:any=[];
  constructor(
    public router:Router,
    public route:ActivatedRoute, 
    private httpService: HttpServiceService,
    private personservice: PersonMaintenanceService,
    public dialogRef:MatDialogRef<PersonDetailsPopupComponent>,
    public spinner : NgxSpinnerService,
  ){

  }

  ngOnInit(): void {
    this.fetchDetails("CM0001");
    this.getCheckListDtl("52");
  }

  fetchDetails(id){
    this.httpService.get<any>(this.personservice.detailsUrl+"?id="+id).subscribe({next: (data: any) => {
      this.persondtls = data.personMaintenanceBean;
      }, error: (err) => console.log(err)
     });
  }

  getCheckListDtl(id:any){
    this.spinner.show();
    this.httpService.get(this.personservice.checkListUrl+'?id='+parseInt(id)).subscribe({next: (res: any) => {
      this.certificateList = res.list;
      this.bookDtls = res.crewMasterDtls;
      this.spinner.hide();
    }, error: (err) => console.log(err)
  });
  }

  onCancel(){
    this.dialogRef.close();
  }

}

