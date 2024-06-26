import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  docForm: FormGroup;
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
      this.docForm = this.fb.group({
        rankCode: [""],
        certifiCode: [""],
      });
    
      this.docForm.value.rankCode = this.data.action.rankCode;
    
      this.httpService.get<any>(this.applicationsService.getCertificate + "?rankCode=" + this.docForm.value.rankCode).subscribe({
        next: (data) => {
          this.certificateList = data.list.map(item => ({
            certifiCode: item.CertifiCode,
            splitCertificateNames: item.certificateName.split(',').map(name => ({
              name,
              mandatoryFlag: false,
              mandatoryInvalidFlag: false,
              optionalFlag: false
            }))
          }));
        },
      });
    }
    
  
    check(certificateIndex: number, nameIndex: number, value: string) {
      const certificate = this.certificateList[certificateIndex].splitCertificateNames[nameIndex];
      if (value === 'mandatoryValidCheckbox') {
        certificate.mandatoryFlag = true;
        certificate.mandatoryInvalidFlag = false;
        certificate.optionalFlag = false;
      } else if (value === 'mandatoryInvalidCheckbox') {
        certificate.mandatoryInvalidFlag = true;
        certificate.mandatoryFlag = false;
        certificate.optionalFlag = false;
      } else if (value === 'optionalInvalidCheckbox') {
        certificate.optionalFlag = true;
        certificate.mandatoryFlag = false;
        certificate.mandatoryInvalidFlag = false;
      }
    }
  

    onSubmit() {
      if (this.docForm.valid) {
        const selectedCertificates = this.certificateList
          .filter(certificate => certificate.splitCertificateNames.some(nameObj =>
            nameObj.mandatoryFlag || nameObj.mandatoryInvalidFlag || nameObj.optionalFlag
          ))
          .map(certificate => {
            return {
              certifiCode: certificate.certifiCode,
              splitCertificateNames: certificate.splitCertificateNames.map(nameObj => ({
                name: nameObj.name,
                mandatoryValid: nameObj.mandatoryFlag,
                mandatoryInvalid: nameObj.mandatoryInvalidFlag,
                optionalInvalid: nameObj.optionalFlag
              }))
            };
          });
    
        if (selectedCertificates.length > 0) {
          const payload = {
            ...this.docForm.value,
            certificates: selectedCertificates
          };
    
          this.applicationsService.savecertificate(payload, this.router, this.notificationService);
        } else {
          this.notificationService.showNotification(
            "snackbar-danger",
            "Please select at least one checkbox",
            "top",
            "right"
          );
        }
      } else {
        this.notificationService.showNotification(
          "snackbar-danger",
          "Please fill the required details",
          "top",
          "right"
        );
      }
    }
    
    

}
