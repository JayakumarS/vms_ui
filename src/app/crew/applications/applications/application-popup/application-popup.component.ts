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
    this.edit = this.data.action.edit;
    this.docForm = this.fb.group({
      rankCode: [this.data.action.rankCode],
      certifiCode: [''],
      mandatoryValid: [false], 
      mCertificatecode: [''],
      optionalInvalid: [false],
      mandatoryInvalid: [false],
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
    this.docForm.get('rankCode').setValue(this.data.action.rankCode);


    if (this.edit == false) {

      this.populateFromTemplist(this.data.action.templistsave);

      // Fetch certificate data based on rankCode
      this.httpService.get<any>(this.applicationsService.getCertificate + "?rankCode=" + this.docForm.value.rankCode)
        .subscribe({
          next: (data) => {
            const filteredCertificates = data.list.filter(item => 
              !this.data.action.templistsave.some(temp => temp.CertifiCode === item.CertifiCode)
            );
            this.populateCertificates(filteredCertificates);
            
          },
          error: (error) => {
            console.error('Error fetching certificate data', error);
          }
        });
  
      // Fetch medical certificate data based on rankCode
      this.httpService.get<any>(this.applicationsService.getmedicalCertificate + "?rankCode=" + this.docForm.value.rankCode)
        .subscribe({
          next: (data) => {
            const filteredMedicalCertificates = data.list1.filter(item => 
              !this.data.action.templistsave.some(temp => temp.mcertificateCode === item.mcertificateCode)
            );
            this.populateMedicalCertificates(filteredMedicalCertificates);            
          },
          error: (error) => {
            console.error('Error fetching medical certificate data', error);
          }
        });

      
    } else {
      const templistCertifiCodes = this.data.action.templist.map(item => item.CertifiCode);
      const templistMCertifiCodes = this.data.action.templist.map(item => item.mcertificateCode);
  
      let val = this.applicationsService.getPopArr();
      const certificatesArray = val.filter(item => item.CertifiCode && !templistCertifiCodes.includes(item.CertifiCode));
      const medicalCertificatesArray = val.filter(item => item.mcertificateCode && !templistMCertifiCodes.includes(item.mcertificateCode));
  
      // Populate from templist
      const certificatesArraytemp = this.data.action.templist.filter(item => item.CertifiCode);
      const medicalCertificatesArraytemp = this.data.action.templist.filter(item => item.mcertificateCode);
  
      this.populateCertificatestemp(certificatesArraytemp);
      this.populateMedicalCertificatestemp(medicalCertificatesArraytemp);
  
      // Populate from val excluding duplicates from templist
      this.populateCertificates(certificatesArray);
      this.populateMedicalCertificates(medicalCertificatesArray);
    }
  
  }
  
  populateFromTemplist(templist: any[]): void {
    const certificatesArrayTemp = templist.filter(item => item.CertifiCode);
    const medicalCertificatesArrayTemp = templist.filter(item => item.mcertificateCode);

    this.populateCertificatestemp(certificatesArrayTemp);
    this.populateMedicalCertificatestemp(medicalCertificatesArrayTemp);
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
     
    populateCertificatestemp(data: any[]): void {
      data.forEach(item => {
        const certificateGroup = this.fb.group({
          certifiCode: [item.CertifiCode],
          splitCertificateNames: this.fb.array(item.splitCertificateNames.map(nameObj => this.fb.group({
            name: [nameObj.name],
            mandatoryFlag: nameObj.mandatoryFlag,
            mandatoryInvalidFlag: nameObj.mandatoryInvalidFlag,
            optionalFlag: nameObj.optionalFlag
          })))
        });
        this.certificateList.push(certificateGroup.value);
      });
    }
    
    populateMedicalCertificatestemp(data: any[]): void {
      data.forEach(item => {
        const medicalGroup = this.fb.group({
          mcertificateCode: [item.mcertificateCode],
          splitCertificateMedicalNames: this.fb.array(item.splitCertificateMedicalNames.map(mnameObj => this.fb.group({
            mname: [mnameObj.mname],
            mmandatoryFlag: mnameObj.mmandatoryFlag,
            mmandatoryInvalidFlag: mnameObj.mmandatoryInvalidFlag,
            moptionalFlag: mnameObj.moptionalFlag
          })))
        });
        this.MedicalcertificateList.push(medicalGroup.value);
      });
    }
    

   
  check(certificateIndex: number, nameIndex: number, value: string, type: string) {
    if (type === 'regular') {
      const certificate = this.certificateList[certificateIndex].splitCertificateNames[nameIndex];
      if (value === 'mandatoryValidCheckbox') {
        certificate.mandatoryFlag = !certificate.mandatoryFlag; // Toggle the flag
        certificate.mandatoryInvalidFlag = false;
        certificate.optionalFlag = false;
      } else if (value === 'mandatoryInvalidCheckbox') {
        certificate.mandatoryInvalidFlag = !certificate.mandatoryInvalidFlag; // Toggle the flag
        certificate.mandatoryFlag = false;
        certificate.optionalFlag = false;
      } else if (value === 'optionalInvalidCheckbox') {
        certificate.optionalFlag = !certificate.optionalFlag; // Toggle the flag
        certificate.mandatoryFlag = false;
        certificate.mandatoryInvalidFlag = false;
      }
    } else if (type === 'medical') {
      const certificate = this.MedicalcertificateList[certificateIndex].splitCertificateMedicalNames[nameIndex];
      if (value === 'mandatoryValidCheckbox') {
        certificate.mmandatoryFlag = !certificate.mmandatoryFlag; // Toggle the flag
        certificate.mmandatoryInvalidFlag = false;
        certificate.moptionalFlag = false;
      } else if (value === 'mandatoryInvalidCheckbox') {
        certificate.mmandatoryInvalidFlag = !certificate.mmandatoryInvalidFlag; // Toggle the flag
        certificate.mmandatoryFlag = false;
        certificate.moptionalFlag = false;
      } else if (value === 'optionalInvalidCheckbox') {
        certificate.moptionalFlag = !certificate.moptionalFlag; // Toggle the flag
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
              mmandatoryInvalid: mnameObj.mmandatoryInvalidFlag,
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
        this.dialogRef.close({data: payload});
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



  onupdate(){

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
              mmandatoryInvalid: mnameObj.mmandatoryInvalidFlag,
              moptionalInvalid: mnameObj.moptionalFlag
            }))
          };
        });

      if (selectedCertificates.length > 0 || selectedMedicalCertificates.length > 0) {
        const payloadupdate = {
          ...this.docForm.value,
          certificates: selectedCertificates,
          medicalcertificates: selectedMedicalCertificates
        };

        // Close the dialog and pass payload back to AddApplicationsComponent
        this.dialogRef.close({data:payloadupdate});
      } else {
        this.snackBar.open(
          "Please select at least one checkbox",
          "Close",
          { duration: 3000 }
        );
      }
 

  }
  onCancel(){
    this.dialogRef.close();
  }
}
