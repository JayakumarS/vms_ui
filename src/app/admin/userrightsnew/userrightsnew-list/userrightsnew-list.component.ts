import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, startWith } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AutoComplete } from 'src/app/common-service/AutoComplete';
import { CommonService } from 'src/app/common-service/common.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserRightsNewResultBean } from '../userrightsnew-result-bean';
import { UserrightsnewService } from '../userrightsnew.service';

@Component({
  selector: 'app-userrightsnew-list',
  templateUrl: './userrightsnew-list.component.html',
  styleUrls: ['./userrightsnew-list.component.scss']
})
export class UserrightsnewListComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  docForm: FormGroup;
  userList: AutoComplete[] = [];
  moduleList: [];
  formList = [];
  propertyList = [];
  userRightsPropertyList = [];
  checkAllFormPropertysFlag: boolean = false;
  formPropertyList = [];
  selectedFormPropertyList = [];

  submitted: boolean;

  customerArray: AutoComplete[] = [];
  customerOptions: AutoComplete[] = [];
  userFilterOptions: Observable<AutoComplete[]>;
  myControlUser = new FormControl(undefined, [Validators.required, this.requireMatch.bind(this)]);

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    private userrightsnewService: UserrightsnewService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    public el: ElementRef,
    private authService: AuthService,
    //  public commonService: CommonService,
    //  private tokenStorage: TokenStorageService,

  ) {
    super();
    this.docForm = this.fb.group({
      userId: [""],
      moduleId: [""]

    });
  }

  //For AutoComplete
  valueForForm = {
    user: [''],
  }

  ngOnInit(): void {
    // this.httpService.get<any>(this.userrightsnewService.roleListUrl).subscribe({
    //   next: (data) => {
    //     this.userList = data.userList;
    //   },
    //   error: (error) => {
    //     console.log(error.name + " " + error.message);
    //   }
    // });

    this.httpService.get<any>(this.userrightsnewService.roleListUrl).subscribe((res: any) => {
      this.userList = res.userList;
      this.userFilterOptions = this.myControlUser.valueChanges.pipe(
        startWith(''),
        map(value => this._filterForUser(value || '')),
      );
    });

    this.httpService.get<any>(this.userrightsnewService.moduleList).subscribe(
      (data) => {
        this.moduleList = data.moduleList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.docForm.value.userId = this.valueForForm.user;
    if (!this.docForm.valid) {
      if (this.docForm.controls['userId'].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + 'userId' + '"]');
        invalidControl.focus();
        return;
      }
      if (this.docForm.controls['moduleId'].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + 'moduleId' + '"]');
        invalidControl.focus();
        return;
      }
    }
    this.selectedFormPropertyList = this.formPropertyList.filter((value, index) => {
      return value.isCheckFormProperty
    });
    setTimeout(() => {
      // if (this.selectedFormPropertyList.length == 0 || this.selectedFormPropertyList == null || this.selectedFormPropertyList == undefined) {
      //   this.showNotification(
      //     "snackbar-danger",
      //     "You must check at least one Forms",
      //     "top",
      //     "right"
      //   );
      //   return;
      // }
      if (this.docForm.valid) {
        const addRoleRightObj = {
          userId: this.docForm.value.userId,
          moduleId: this.docForm.value.moduleId,
          selectedFormPropertyList: this.selectedFormPropertyList,
          isAvailable: true
        }
        this.spinner.show();
        this.userrightsnewService.roleRightsMasterAddUpdate(addRoleRightObj).subscribe({
          next: (data) => {
            this.spinner.hide();
            if (data.success) {
              this.showNotification(
                "snackbar-success",
                "Submitted Successfully....!!!",
                "bottom",
                "center"
              );
              this.submitted = false;
            } else {
              this.showNotification(
                "snackbar-danger",
                data.message + "...!!!",
                "bottom",
                "center"
              );
            }
            error: (error) => {
              this.spinner.hide();
              this.showNotification(
                "snackbar-danger",
                error.message + "...!!!",
                "bottom",
                "center"
              );
            }
          },

        });

      } else {
        this.showNotification(
          "snackbar-danger",
          "Please fill required details.",
          "top",
          "right"
        );
      }
    }, 400);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }


  reset() {
    this.formList = [];
    this.propertyList = [];
    this.formPropertyList = [];
    this.userRightsPropertyList = [];
    this.docForm.patchValue({
      'userId': '',
    });
  }


  roleBasedFormList(userId) {
    this.formList = [];
    this.propertyList = [];
    this.formPropertyList = [];
    this.userRightsPropertyList = [];
    this.checkAllFormPropertysFlag = false;

    if (userId != 0) {
      this.spinner.show();
      this.httpService.get<any>(this.userrightsnewService.roleFormUrl + "?userId=" + userId).subscribe((data: any) => {
        this.spinner.hide();
        this.formList = data.formList;
        this.propertyList = data.propertyList;
        this.formPropertyList = data.formPropertyList;
        this.userRightsPropertyList = data.userRightsPropertyList;
        // this.roleremarks = data.roleremarks;

        if (data.formPropertyList.length >= 1 && data.userRightsPropertyList.length >= 1) {
          data.formPropertyList.forEach((formProperty) => {
            data.userRightsPropertyList.forEach((roleRightsProperty) => {
              if (formProperty.formPropertyId === roleRightsProperty.formPropertyId) {
                formProperty.isCheckFormProperty = true;
              }
            });
          });
        }
        error: (error) => {
          this.spinner.hide();
          console.log(error.name + " " + error.message);
        }
      },

      );
    }
  }

  moduleBasedFormList(moduleId: any) {
    this.formList = [];
    this.propertyList = [];
    this.formPropertyList = [];
    this.userRightsPropertyList = [];
    this.checkAllFormPropertysFlag = false;

    var user = this.valueForForm.user;
    var userId = user.toString();
    // var userId=this.valueForForm.user;

    if (userId != "") {
      this.spinner.show();
      this.httpService.get<any>(this.userrightsnewService.roleFormUrlModule + "?userId=" + userId + "&moduleCode=" + moduleId).subscribe((data: any) => {
        this.spinner.hide();
        this.formList = data.formList;
        this.propertyList = data.propertyList;
        this.formPropertyList = data.formPropertyList;
        this.userRightsPropertyList = data.userRightsPropertyList;
        // this.roleremarks = data.roleremarks;

        if (data.formPropertyList.length >= 1 && data.userRightsPropertyList.length >= 1) {
          data.formPropertyList.forEach((formProperty) => {
            data.userRightsPropertyList.forEach((roleRightsProperty) => {
              if (formProperty.formPropertyId === roleRightsProperty.formPropertyId) {
                formProperty.isCheckFormProperty = true;
              }
            });
          });
        }
        error: (error) => {
          this.spinner.hide();
          console.log(error.name + " " + error.message);
        }
      },

      );
    }
  }

  selectCheckAllFormPropertyList(isChecked: any, selectItem: any) {
    if (isChecked === "on") {
      this.formPropertyList.forEach((formProperty) => {
        if (formProperty.formCode === selectItem.item_id) {
          formProperty.isCheckFormProperty = true;
        }
      });
    } else {
      this.formPropertyList.forEach((formProperty) => {
        if (formProperty.formCode === selectItem.item_id) {
          formProperty.isCheckFormProperty = false;
        }
      });
    }
  }
  selectCheckFormPropertyList(isChecked: any, formItem: any) {
    if (isChecked === "on") {
      this.formPropertyList.forEach((formProperty) => {
        if (formProperty.formPropertyId === formItem.formPropertyId) {
          formProperty.isCheckFormProperty = true;
        }
      });
    } else {
      this.formPropertyList.forEach((formProperty) => {
        if (formProperty.formPropertyId === formItem.formPropertyId) {
          formProperty.isCheckFormProperty = false;
        }
      });
    }
  }
  checkAllFormPropertys(isChecked: any) {
    if (isChecked === "on") {
      this.formPropertyList.forEach((formProperty) => {
        formProperty.isCheckFormProperty = true;
      });
      this.formList.forEach((form) => {
        form.isFormChecked = true;
      });
    } else {
      this.formPropertyList.forEach((formProperty) => {
        formProperty.isCheckFormProperty = false;
      });
      this.formList.forEach((form) => {
        form.isFormChecked = false;
      });
    }
  }

  private _filterForUser(value) {
    const filterValue = value.toLowerCase();

    return this.userList.filter(obj => obj.text.toLowerCase().includes(filterValue));
  }

  getUser(custId) {
    var value;
    this.userList.forEach(element => {
      if (element.id === custId) {
        value = element.text;
      }
    });
    return value;
  }

  getUserId(userId) {
    var id;
    this.userList.forEach(element => {
      if (element.id === userId) {
        id = element.id;
      }
    });
    return id;
  }

  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    var userValue = this.getUserId(control.value);
    if (userValue === control.value) {
      return null;
    }
    else {
      return { requireMatch: true };
    }
  }


}
