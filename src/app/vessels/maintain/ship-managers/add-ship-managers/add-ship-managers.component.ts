import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-add-ship-managers',
  templateUrl: './add-ship-managers.component.html',
  styleUrls: ['./add-ship-managers.component.sass']
})
export class AddShipManagersComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  docForm: FormGroup;

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
    private cmnService: CommonService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private EncrDecr: EncrDecrService,
  ) {
    super();
    this.docForm=this.formbuilder.group({
      firstDetailRow:this.formbuilder.array([
        this.formbuilder.group({
          select:[''],
          shipman:['',Validators.required],
          name:['',Validators.required],
          det1:[""],
          det2:[""],
          det3:[""],
          det4:[""],
          det5:[""],
          det6:[""],
          vatreg:[""]
        })
      ]),
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){

  }
  onCancel(){
    this.router.navigate(['/vessels/maintain/ship-managers/list-ship-managers']);

  }
  addRow() {
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.formbuilder.group({
          select:[""],
          shipman:['',Validators.required],
          name:['',Validators.required],
          det1:[""],
          det2:[""],
          det3:[""],
          det4:[""],
          det5:[""],
          det6:[""],
          vatreg:[""]
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
