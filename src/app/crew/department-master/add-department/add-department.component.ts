import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CurrencyMasterService } from '../../currency-master/currency-master.service';
import { DepartmentMasterService } from '../department-master.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.sass']
})
export class AddDepartmentComponent implements OnInit {
  docForm: FormGroup;
  edit: boolean = false;

  constructor(
    public router: Router,
    private formbuilder: FormBuilder,
    private notificationService: NotificationService,
    private departmentService: DepartmentMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl: serverLocations,
    private encryptionService: EncryptionService,
    public snackBar: MatSnackBar,
    public matError: MatErrorService
  ) {
    this.docForm = this.formbuilder.group({
      name: [""],
      head: [""],
      code: [""],
      active: [true],


    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        // this.decryptRequestId = params.id;
        // this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
        this.edit = true;
        this.fetchDetails(params.id);
      }
    });

  }
  fetchDetails(id: any) {

    this.httpService.get(this.departmentService.editUrl + "?id=" + id).subscribe((res: any) => {
      console.log(res);
      if (res.departmentBean.active == 'Y') {
        this.docForm.patchValue({ 'active': true })
      }
      else {
        this.docForm.patchValue({ 'active': false })
      }

      this.docForm.patchValue({


        'name': res.departmentBean.name,
        'head': res.departmentBean.head,
        'code': res.departmentBean.code,
        // 'active': res.departmentBean.active

      });
    });
  }

  save() {
    if (this.docForm.valid) {
      this.departmentService.saveDepartment(this.docForm.value, this.router, this.notificationService);
    } else {
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }
  update() {
    if (this.docForm.valid) {
      this.departmentService.updateDepartment(this.docForm.value, this.router, this.notificationService);
    } else {
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }
  cancel() {
    this.router.navigate(['/crew/department-master/list-department']);

  }

}
