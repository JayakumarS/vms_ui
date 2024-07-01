import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
import { UnitsPackingsService } from '../units-packings.service';

@Component({
  selector: 'app-add-units-packings',
  templateUrl: './add-units-packings.component.html',
  styleUrls: ['./add-units-packings.component.sass']
})
export class AddUnitsPackingsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {


  docForm: FormGroup;
  unitGroupList: any[];
  conversionFactor: FormControl;
  edit:boolean=false;
  uomList:any=[];

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
    public unit:UnitsPackingsService
  ) {
    super();
    this.docForm = this.formbuilder.group({
      id: [""],
      impaUnit: [""],
      abbreviation: [""],
      conversionFactor: [""],
      interfaceCode: [""],
      shipservUnit: [""],
      procureShipUnit: [""],
      mespasUnit: [""],
      unitGroup:[""]
    })
  }

  ngOnInit(): void {
    this.conversionFactor = new FormControl(1);
    this.unitGroupList = [{ id: 1, text: "Energy" }, { id: 2, text: "Kgr" }, { id: 3, text: "LT" }, { id: 4, text: "M" }, { id: 5, text: "M2" }, { id: 6, text: "Pc" }, { id: 7, text: "Time" }];

    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ 
      this.edit=true;
      this.fetchDetails(params.id) ;
     }
    });

    this.getUomList();
    this.generateCode();
  }

  getUomList(){
    this.httpService.get(this.unit.uomUrl).subscribe({next: (res: any) => {
      this.uomList = res.lCommonUtilityBean;
    }, error: (err) => console.log(err)
  });
  }

  generateCode(){
    if(!this.edit){
      this.httpService.get(this.unit.generateCodeUrl).subscribe({next: (res: any) => {
        console.log(res);
          this.docForm.patchValue({
            'id':res.code
          })
      }, error: (err) => console.log(err)
    });
    }
  }

  fetchDetails(id){

  }

  cancel() {
    this.router.navigate(['/supplies/maintain/units-packings/list-units-packings']);
  }
  

  save() {
    
    }


  addRow() {
    let firstDetailRow = this.docForm.controls.firstDetailRow as FormArray;
    let arraylen = firstDetailRow.length;
    let newUsergroup: FormGroup = this.formbuilder.group({
      select: [""],
      id: [arraylen+1],
      impaUnit: [""],
      abbreviation: [""],
      conversionFactor: [""],
      interfaceCode: [""],
      shipservUnit: [""],
      procureShipUnit: [""],
      mespasUnit: [""]
     
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

  keyPressNumberDouble(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
      event.preventDefault();
    }
  }



}
