import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ApplicationsService } from '../applications.service';

@Component({
  selector: 'app-application-popup',
  templateUrl: './application-popup.component.html',
  styleUrls: ['./application-popup.component.css']
})
export class ApplicationPopupComponent implements OnInit {
  docForm: FormGroup;
  certificateList: any = [];

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private applicationsService: ApplicationsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ApplicationPopupComponent>
  ) {}

  ngOnInit(): void {
    this.docForm = this.fb.group({
      rankCode: [""],
      certifiCode: [""],
    });
    
    this.docForm.get('rankCode').setValue(this.data.action.rankCode);

    // Fetch certificate data based on rankCode
    this.httpService.get<any>(this.applicationsService.getCertificate + "?rankCode=" + this.docForm.value.rankCode)
      .subscribe({
        next: (data) => {
          this.certificateList = data.list.map((item,index)=> ({
            sno: index + 1,
            certifiCode: item.CertifiCode,
            splitCertificateNames: item.certificateName.split(',').map(name => ({
              name,
              mandatoryFlag: false,
              mandatoryInvalidFlag: false,
              optionalFlag: false
            }))
          }));
        },
        error: (error) => {
          console.error('Error fetching certificate data', error);
        }
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
            sno: certificate.sno,
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

        // Close the dialog and pass payload back to AddApplicationsComponent
        this.dialogRef.close(payload);
      } else {
        this.snackBar.open(
          "Please select at least one checkbox",
          "Close",
          { duration: 3000 }
        );
      }
    } else {
      this.snackBar.open(
        "Please fill the required details",
        "Close",
        { duration: 3000 }
      );
    }
  }
}
