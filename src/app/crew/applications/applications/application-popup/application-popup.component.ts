import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  mandatoryFlag : boolean = false;
  mandatoryInvalidFlag : boolean = false;
  optionalFlag : boolean = false;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private applicationsService: ApplicationsService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private encryptionService: EncryptionService,
    private serverUrl: serverLocations,
    public notificationService: NotificationService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private authService: AuthService, ) { }

  ngOnInit(): void {

      this.httpService.get<any>(this.applicationsService.getCertificate).subscribe((res: any) => {
    
        this.certificateList = res.list;
    
      });

  }

  check(value){
       if (value == 'mandatoryValidCheckbox'){
        this.mandatoryFlag = true;
       }else{
        this.mandatoryInvalidFlag = false;
        this.optionalFlag = false;
       }
       

       if (value == 'mandatoryInvalidCheckbox'){
        this.mandatoryInvalidFlag = true;
       }else{
        this.mandatoryFlag = false;
        this.optionalFlag = false;
       }

       if (value == 'optionalInvalidCheckbox'){
        this.optionalFlag = true;
       }else{
        this.mandatoryFlag = false;
        this.mandatoryInvalidFlag = false;
       }
  }


  

}
