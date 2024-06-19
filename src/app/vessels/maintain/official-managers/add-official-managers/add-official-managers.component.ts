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
import { CommonService } from 'src/app/common-service/common.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { OfficialManagersService } from '../official-managers.service';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { DeleteComponent } from '../../vessel-insurance/list-vessel-insurance/delete/delete.component';
import { ExampleDataSource } from '../list-official-managers/list-official-managers.component';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-add-official-managers',
  templateUrl: './add-official-managers.component.html',
  styleUrls: ['./add-official-managers.component.sass']
})
export class AddOfficialManagersComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  docForm: FormGroup;
  acclist: any[];
  edit:boolean=false;
  requestId: any;
  decryptRequestId: any;
  exampleDatabase: any;
  dataSource: any;
  paginator: any;
  sort: any;
  filter: any;

  constructor(private fb: FormBuilder,
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
    public officialManagersService: OfficialManagersService,
    public matError : MatErrorService,

    private cmnService: CommonService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private EncrDecr: EncrDecrService,
  ) {
    super();
    this.docForm = this.formbuilder.group({
      officialManagersBeanDtls: this.formbuilder.array([
        this.formbuilder.group({
          select: [""],
          code: [""],
          description: [""],
          city: [""],
          address: [""],
          poscode: [""],
          phone: [""],
          remarks: [""],
          blogo: [""],
          plogo: [""]


        })
      ]),
    })


  }

  ngOnInit() {
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
     this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       this.fetchDetails(this.decryptRequestId) ;
     }
    });
   }
   viewCall(row) {
    // var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.countryCode);
    this.router.navigate(['/vessels/maintain/official-managers/view-official-managers/', row.code]);
  }
  editCall(row) {
    // var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, row.code);
    this.router.navigate(['/vessels/maintain/official-managers/add-official-managers/', row.code]);
  }
  cancel(){
    this.router.navigate(['/vessels/maintain/official-managers/list-official-managers']);

  }
  public loadData() {
    this.exampleDatabase = new OfficialManagersService(this.httpClient,this.serverUrl,this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
  update() {
    const dtlArray = this.docForm.get('officialManagersBeanDtls') as FormArray;
    dtlArray.controls.forEach(control => {
      control.get('shipman').enable();
    });
    if(this.docForm.valid){
      this.officialManagersService.updateShipModel(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }
  save(){
    if(this.docForm.valid){
      this.officialManagersService.saveOffManagerModel(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }
  }
  fetchDetails(id){
    this.httpService.get<any>(this.officialManagersService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      let dtlArray = this.docForm.controls.officialManagersBeanDtls as FormArray;
      dtlArray.clear();
      data.list.forEach((element, index) => {
        let arraylen = dtlArray.length;
        let newUsergroup: FormGroup = this.fb.group({
          select:[""],
          code: [element.code],
          description: [element.description],
          city: [element.city],
          address:[element.address],
          phone:[element.phone + ""]
        })
        dtlArray.insert(arraylen, newUsergroup);
        newUsergroup.get('shipman').disable();
      });
      }, error: (err) => console.log(err)
     });
  }
  addRow() {
    let officialManagersBeanDtls = this.docForm.controls.officialManagersBeanDtls as FormArray;
    let arraylen = officialManagersBeanDtls.length;
    let newUsergroup: FormGroup = this.formbuilder.group({
      select: [""],
      code: [""],
          description: [""],
          city: [""],
          address: [""],
          poscode: [""],
          phone: [""],
          remarks: [""],
          blogo: [""],
          plogo: [""]
    })
    officialManagersBeanDtls.insert(arraylen, newUsergroup);


  }
  removeRow() {
    let count = 0;
    const deleteRow = this.docForm.controls.officialManagersBeanDtls as FormArray;
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
