import { Component, Inject, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { PersonMaintenanceService } from '../person-maintenance.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-checklist-popup',
  templateUrl: './view-checklist-popup.component.html',
  styleUrls: ['./view-checklist-popup.component.sass']
})
export class ViewChecklistPopupComponent implements OnInit {

  certificateList:any=[];
  crewAppId:any;
  bookDtls:any=[];
  constructor(
    private httpService: HttpServiceService,
    private personMaintenanceService : PersonMaintenanceService,
    public spinner : NgxSpinnerService,
    public dialogRef: MatDialogRef<ViewChecklistPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public values: any,
  ) { }

  ngOnInit(): void {
    this.crewAppId = this.values;
    this.getCheckListDtl();
  }

  getCheckListDtl(){
    this.spinner.show();
    this.httpService.get(this.personMaintenanceService.checkListUrl+'?id='+parseInt(this.crewAppId)).subscribe({next: (res: any) => {
      this.certificateList = res.list;
      this.bookDtls = res.crewMasterDtls;
      this.spinner.hide();
    }, error: (err) => console.log(err)
  });
  }

  isExpired(expiryDate: string): boolean {
    let eDate = expiryDate.split('/');
    let newDate = eDate[2] + '-' + eDate[1] + '-' + eDate[0];
    const currentDate = new Date();
    const expDate = new Date(newDate);
    return expDate < currentDate;
  }

  cancel(){
    this.dialogRef.close({ data: 'CANCEL' });
  }

}
