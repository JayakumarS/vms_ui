
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-add-accountants',
  templateUrl: './add-accountants.component.html',
  styleUrls: ['./add-accountants.component.sass']
})
export class AddAccountantsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  docForm: FormGroup;
  acclist: any[];


  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private encryptionService: EncryptionService,
    private serverUrl: serverLocations,
    public notificationService: NotificationService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private EncrDecr: EncrDecrService,
  ) {
    super();
    this.docForm = this.formbuilder.group({
      firstDetailRow: this.formbuilder.array([
        this.formbuilder.group({
          select: [""],
          code: [""],
          name: [""],
          surname: [""],
          address: [""],
          vatNo: [""],
          taxOffice: [""],
          registerNo: [""],
          category: [""],


        })
      ]),
    })


  }

  ngOnInit(): void {
    this.acclist = [{ id: 1, text: "Admin" }, { id: 3, text: "Officer" }];
  }
  onCancel() {
    this.router.navigate(['/vessels/maintain/accountants/list-accountants']);

  }
  onSubmit() {

  }
  addRow() {
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.formbuilder.group({
      select: [""],
      code: [""],
      name: [""],
      surname: [""],
      address: [""],
      vatNo: [""],
      taxOffice: [""],
      registerNo: [""],
      category: [""],
    })
    firstDetailRow.insert(arraylen, newUsergroup);


  }
  removeRow() {
    let count = 0;
    const deleteRow = this.docForm.controls.firstDetailRow as FormArray;
    let i = 0;

    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if (count == 0) {
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }


  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: [colorName, 'snackbar-text'],
      data: {
        html: true
      }
    });
  }



}
