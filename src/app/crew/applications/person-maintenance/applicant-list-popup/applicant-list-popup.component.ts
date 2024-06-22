import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { PersonMaintenanceService } from '../person-maintenance.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-applicant-list-popup',
  templateUrl: './applicant-list-popup.component.html',
  styleUrls: ['./applicant-list-popup.component.sass']
})
export class ApplicantListPopupComponent implements OnInit {

  applicantList:any=[];
  tempList:any=[];
  disableSelect : boolean = false;
  constructor(
    private httpService: HttpServiceService,
    private personMaintenanceService : PersonMaintenanceService,
    public spinner : NgxSpinnerService,
    public dialogRef: MatDialogRef<ApplicantListPopupComponent>,
    public notificationService:NotificationService 
  ) { }

  ngOnInit(): void {
    this.getApplicantList();
  }

  getApplicantList(){
    this.spinner.show();
    this.httpService.get(this.personMaintenanceService.applicantListUrl).subscribe({next: (res: any) => {
      this.applicantList = res.list;
      this.spinner.hide();
    }, error: (err) => console.log(err)
  });
  }

  select(event,value,i){
    if(event.checked){
      this.tempList.push(value);
    }else{
      this.tempList.splice(i,1);
    }
  }

  onSubmit(){
    if(this.tempList.length > 0){
      this.dialogRef.close({ data: this.tempList });
    }else{
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }
  }

  onClick(){
    this.dialogRef.close({ data: 'CANCEL' });
  }

}
