import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationsService } from '../applications.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Component({
  selector: 'app-application-popup',
  templateUrl: './application-popup.component.html',
  styleUrls: ['./application-popup.component.css']
})
export class ApplicationPopupComponent implements OnInit {
  docForm: FormGroup;
  certificateList: any = [];
  MedicalcertificateList: any = [];
  edit:boolean=false;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private applicationsService: ApplicationsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    public dialogRef: MatDialogRef<ApplicationPopupComponent>
  ) {}

  ngOnInit(): void {
     this.edit==true;
    this.docForm = this.fb.group({
      rankCode: [''],
      certifiCode: [''],
      mandatoryValid: [false], 
      mCertificatecode: [''],
      optionalInvalid: [false],
      mandatoryInvalid:[false],
      certificateList: this.fb.array([
        this.fb.group({
          mandatoryValid:[""],
          mandatoryInValid:[""],
          optionalInValid:[""],

        })
      ]),
      MedicalcertificateList: this.fb.array([
        this.fb.group({
          mmandatoryValid:[""],
          mmandatoryInValid:[""],
          moptionalInValid:[""],

        })
      ]),
    });
    
    let val = [];
    val = this.applicationsService.getPopArr();

    this.docForm.get('rankCode').setValue(this.data.action.rankCode);
    this.edit = this.data.action.edit;
    
    if (this.edit == false) {
      // Fetch certificate data based on rankCode
      this.httpService.get<any>(this.applicationsService.getCertificate + "?rankCode=" + this.docForm.value.rankCode)
        .subscribe({
          next: (data) => {
            this.certificateList = data.list.map((item, index) => ({
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
    
      // Fetch medical certificate data based on rankCode
      this.httpService.get<any>(this.applicationsService.getmedicalCertificate + "?rankCode=" + this.docForm.value.rankCode)
        .subscribe({
          next: (data) => {
            this.MedicalcertificateList = data.list1.map((item, index) => ({
              sno: index + 1,
              mcertificateCode: item.mcertificateCode,
              splitCertificateMedicalNames: item.mcertificateName.split(',').map(mname => ({
                mname,
                mmandatoryFlag: false,
                mmandatoryInvalidFlag: false,
                moptionalFlag: false
              }))
            }));
          },
          error: (error) => {
            console.error('Error fetching medical certificate data', error);
          }
        });
    } else {
      const certificatesArray = val.filter(item => item.CertifiCode);
      const medicalCertificatesArray = val.filter(item => item.mcertificateCode);
    
      this.populateCertificates(certificatesArray);
      this.populateMedicalCertificates(medicalCertificatesArray);
    }
  }
    populateCertificates(data: any[]): void {
      // const certificatesArray = this.docForm.get('certificateList') as FormArray;
      data.forEach(item => {
        const certificateGroup = this.fb.group({
          certifiCode: [item.CertifiCode],
          splitCertificateNames: this.fb.array(item.certificateName.split(',').map(name => this.fb.group({
            name: [name],
            mandatoryFlag: item.mandatoryValid,
            mandatoryInvalidFlag: item.mandatoryInvalid,
            optionalFlag: item.optionalInvalid
          })))
        });
        this.certificateList.push(certificateGroup.value);
      });
    }
    
    populateMedicalCertificates(data: any[]): void {
      // const medicalCertificatesArray = this.docForm.get('MedicalcertificateList') as FormArray;
      data.forEach(item => {
        const medicalGroup = this.fb.group({
          mcertificateCode: [item.mcertificateCode],
          splitCertificateMedicalNames: this.fb.array(item.mcertificateName.split(',').map(mname => this.fb.group({
            mname: [mname],
            mmandatoryFlag: item.mandatoryValid,
            mmandatoryInvalidFlag: item.mandatoryInvalid,
            moptionalFlag: item.optionalInvalid
          })))
        });
        this.MedicalcertificateList.push(medicalGroup.value);
      });
    }
     
  check(certificateIndex: number, nameIndex: number, value: string, type: string) {
    if (type === 'regular') {
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
    } else if (type === 'medical') {
      const certificate = this.MedicalcertificateList[certificateIndex].splitCertificateMedicalNames[nameIndex];
      if (value === 'mandatoryValidCheckbox') {
        certificate.mmandatoryFlag = true;
        certificate.mmandatoryInvalidFlag = false;
        certificate.moptionalFlag = false;
      } else if (value === 'mandatoryInvalidCheckbox') {
        certificate.mmandatoryInvalidFlag = true;
        certificate.mmandatoryFlag = false;
        certificate.moptionalFlag = false;
      } else if (value === 'optionalInvalidCheckbox') {
        certificate.moptionalFlag = true;
        certificate.mmandatoryFlag = false;
        certificate.mmandatoryInvalidFlag = false;
      }
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

      const selectedMedicalCertificates = this.MedicalcertificateList
        .filter(certificate => certificate.splitCertificateMedicalNames.some(mnameObj =>
          mnameObj.mmandatoryFlag || mnameObj.mmandatoryInvalidFlag || mnameObj.moptionalFlag
        ))
        .map(certificate => {
          return {
            sno: certificate.sno,
            mcertificateCode: certificate.mcertificateCode,
            splitCertificateMedicalNames: certificate.splitCertificateMedicalNames.map(mnameObj => ({
              mname: mnameObj.mname,
              mmandatoryValid: mnameObj.mmandatoryFlag,
              mmandatoryInValid: mnameObj.mmandatoryInvalidFlag,
              moptionalInvalid: mnameObj.moptionalFlag
            }))
          };
        });

      if (selectedCertificates.length > 0 || selectedMedicalCertificates.length > 0) {
        const payload = {
          ...this.docForm.value,
          certificates: selectedCertificates,
          medicalcertificates: selectedMedicalCertificates
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
