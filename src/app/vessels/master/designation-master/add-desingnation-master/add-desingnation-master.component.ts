import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { DesignationMaster } from '../designation-master.model';
import { DesignationMasterResultBean } from '../designation-master-result-bean';
import { DesignationMasterService } from '../designation-master.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { serverLocations } from 'src/app/auth/serverLocations';

@Component({
  selector: 'app-add-desingnation-master',
  templateUrl: './add-desingnation-master.component.html',
  styleUrls: ['./add-desingnation-master.component.sass']
})
export class AddDesingnationMasterComponent implements OnInit {

  docForm: FormGroup;
  edit: boolean = false;
  designationMaster: DesignationMaster;

  // For Encryption
  requestId: any;
  decryptRequestId: any;

  constructor(private fb: FormBuilder,
    private designationMasterService: DesignationMasterService,
    private httpService: HttpServiceService,
    private notificationService: NotificationService,
    public route: ActivatedRoute,
    private router: Router,
    public EncrDecr: EncrDecrService,
    private serverUrl: serverLocations,
    private encryptionService: EncryptionService
  ) {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      designationName: ["", [Validators.required]],
      desgnCode: [""],
      remarks: [""],
      active: ["true"]
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.decryptRequestId = params.id;
        this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
        this.edit = true;
        //For User login Editable mode
        this.fetchDetails(this.requestId);



      }
    });
  }

  onSubmit() {
    if (this.docForm.valid) {
      this.designationMaster = this.docForm.value;
      // console.log(this.designationMaster);
      this.designationMasterService.addDesignation(this.designationMaster, this.router, this.notificationService);
    }
    else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  }

  // Edit
  fetchDetails(desgnCode: any): void {
    this.httpService.get(this.designationMasterService.editDesignationMaster + "?designationMaster=" + encodeURIComponent(this.encryptionService.encryptAesToString(desgnCode, this.serverUrl.secretKey).toString())).subscribe((res: any) => {
      // console.log(desgnCode);

      this.docForm.patchValue({
        'designationName': res.designationMasterBean.designationName,
        'remarks': res.designationMasterBean.remarks,
        'desgnCode': res.designationMasterBean.desgnCode,
        'active': res.designationMasterBean.active,
      })
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }

  update() {

    this.designationMaster = this.docForm.value;
    this.designationMasterService.designationMasterUpdate(this.designationMaster, this.router, this.notificationService);

  }

  onCancel() {
    this.router.navigate(['/master/designation-Master/list-designation']);
  }

  reset() {
    if (!this.edit) {
      this.docForm = this.fb.group({
        designationName: [""],
        desgnCode: [""],
        remarks: [""],
        active: ["true"]
      });
    } else {
      this.fetchDetails(this.docForm.value.desgnCode);
    }

  }


  validateDesignation(event) {
    this.httpService.get<any>(this.designationMasterService.validateDesignation + "?tableName=" + "designation" + "&columnName=" + "desgn_name" + "&columnValue=" + event).subscribe((res: any) => {
      if (res) {
        this.docForm.controls['designationName'].setErrors({ Designation: true });
      } else {
        this.docForm.controls['designationName'].setErrors(null);
      }
    });
  }

  keyPressText(event: any) {
    const pattern = /^[A -Za-z]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
