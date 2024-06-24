import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ApplicationsService } from '../applications.service';

@Component({
  selector: 'app-application-popup',
  templateUrl: './application-popup.component.html',
  styleUrls: ['./application-popup.component.css']
})
export class ApplicationPopupComponent implements OnInit {
  certificateList : any =[];
  mandatoryFlag = false;
  mandatoryInvalidFlag = false;
  optionalFlag = false;
  rankCode: any;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private applicationsService: ApplicationsService,
    public route: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private encryptionService: EncryptionService,
    private serverUrl: serverLocations,
    public notificationService: NotificationService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private authService: AuthService, ) { }

  ngOnInit(): void {

    this.rankCode = this.data.action.rankCode;

      // this.httpService.get<any>(this.applicationsService.getCertificate).subscribe((res: any) => {
    
      //   this.certificateList = res.list;
    
      // });


      this.httpService.get<any>(this.applicationsService.getCertificate + "?rankCode=" + this.rankCode).subscribe({
        next: (data) => {
          this.certificateList = data.list;
        },
      });
  }

  check(value: string) {
    if (value === 'mandatoryValidCheckbox') {
        this.mandatoryFlag = true;
        this.mandatoryInvalidFlag = false;
        this.optionalFlag = false;
    } else if (value === 'mandatoryInvalidCheckbox') {
        this.mandatoryInvalidFlag = true;
        this.mandatoryFlag = false;
        this.optionalFlag = false;
    } else if (value === 'optionalInvalidCheckbox') {
        this.optionalFlag = true;
        this.mandatoryFlag = false;
        this.mandatoryInvalidFlag = false;
    }
}

  

}
