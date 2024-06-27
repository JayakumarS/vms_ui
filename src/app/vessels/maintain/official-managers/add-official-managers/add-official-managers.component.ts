import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  excel:any = [];
  files:any = [];
  excelfile:[];
  tempForm:any = [];
  tempfiles:any = [];
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
    this.docForm = this.fb.group({
          select: [""],
          offmanagerid:[""],
          code: ["",Validators.required],
          description: ["",Validators.required],
          city: ["",Validators.required],
          address: ["",Validators.required],
          poscode: ["",Validators.required],
          phone: ["",Validators.required],
          remarks: [""],
          blogofileName: [""],
          blogofilePath: [""],
          plogofileName: [""],
          plogofilePath: [""],
     

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
   
    if(this.docForm.valid){
      this.officialManagersService.updateOffManagerModel(this.docForm.value, this.router, this.notificationService);
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
    this.httpService.get<any>(this.officialManagersService.editUrl+"?id="+parseInt(id)).subscribe({next: (data: any) => {
        this.docForm.patchValue({
        'offmanagerid' :data.list[0].offmanagerid,
        'code': data.list[0].code,
        'description' :  data.list[0].description,
        'city' :  data.list[0].city,
        'address' : data.list[0].address,
        'poscode' :  data.list[0].poscode,
        'phone' : data.list[0].phone,
        'remarks' : data.list[0].remarks,
        
       

     
      });
    }
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
          blogofileName: [""],
          blogofilePath: [""],
          plogofileName: [""],
          plogofilePath: [""],
    })
    officialManagersBeanDtls.insert(arraylen, newUsergroup);


  }

  // uploadFileDoc1(event) {
  //   // Check if the 'S.Book' field has a value
  
  //   var excelfile = event.target.files[0];
  //   var blob = excelfile.slice(0, excelfile.size, ''); 
  //   excelfile = new File([blob], excelfile.name.replaceAll("#","_"), {type: ''});
  //   console.log(excelfile);
  
  //   this.excel = excelfile;
  
  //     var fileExtension = excelfile.name;
  //     var frmData: FormData = new FormData();
  //     frmData.append("file", excelfile);
  //     frmData.append("fileName", fileExtension);
  //     this.httpService.post<any>(this.officialManagersService.uploadFilePI,frmData).subscribe((data) => {
  //       console.log(data);
  //       let multiSeamenArray = this.docForm.controls.officialManagersBeanDtls as FormArray;
  //       multiSeamenArray.controls.forEach(control => {
  //         control.patchValue({
  //           blogofileName: fileExtension, 
  //           blogofilePath: data.path
  //         });
  //       });
       
  //     });
   
  
  //     console.log(frmData);
  //     this.tempForm.push(frmData);

  
      
  // }
  uploadFileDoc1(event) {
    // Check if the 'S.Book' field has a value
   
      var excelfile = event.target.files[0];
    var blob = excelfile.slice(0, excelfile.size, ''); 
    excelfile = new File([blob], excelfile.name.replaceAll("#","_"), {type: ''});
    console.log(excelfile);
  
    this.excel = excelfile;
  
      var fileExtension = excelfile.name;
      var frmData: FormData = new FormData();
      frmData.append("file", excelfile);
      frmData.append("fileName", fileExtension);
      this.httpService.post<any>(this.officialManagersService.uploadFilePI,frmData).subscribe((data) => {
        console.log(data);
        this.docForm.value.blogofileName=fileExtension
        this.docForm.value.blogofilePath=data.path
        this.docForm.patchValue({
          'blogofileName':fileExtension,
          'blogofilePath':data.path
        })
      });
   
  
      console.log(frmData);
      this.tempForm.push(frmData);
    } 

  // uploadFileDoc2(event,index) {
  
  //    var excelfile = event.target.files[0];
  //   var blob = excelfile.slice(0, excelfile.size, ''); 
  //   excelfile = new File([blob], excelfile.name.replaceAll("#","_"), {type: ''});
  //   console.log(excelfile);
  
  //   this.excel = excelfile;
  
  //     var fileExtension = excelfile.name;
  //     var frmData: FormData = new FormData();
  //     frmData.append("file", excelfile);
  //     frmData.append("fileName", fileExtension);
  //     this.httpService.post<any>(this.officialManagersService.uploadFilePI,frmData).subscribe((data) => {
  //       console.log(data);
  //       let multiSeamenArray = this.docForm.controls.officialManagersBeanDtls as FormArray;
  //       multiSeamenArray.controls.forEach(control => {
  //         control.patchValue({
  //           plogofileName: fileExtension, 
  //           plogofilePath: data.path
  //         });
  //       });
  //       // multiSeamenArray.at(index).patchValue({
  //       //     plogofileName: 'fileExtension',
  //       //     plogofilePath: data.path
  //       //   });    
  //            });
   
  
  //     console.log(frmData);
  //     this.tempForm.push(frmData);

  
      
  // }
  uploadFileDoc2(event) {
    // Check if the 'S.Book' field has a value
   
      var excelfile = event.target.files[0];
    var blob = excelfile.slice(0, excelfile.size, ''); 
    excelfile = new File([blob], excelfile.name.replaceAll("#","_"), {type: ''});
    console.log(excelfile);
  
    this.excel = excelfile;
  
      var fileExtension = excelfile.name;
      var frmData: FormData = new FormData();
      frmData.append("file", excelfile);
      frmData.append("fileName", fileExtension);
      this.httpService.post<any>(this.officialManagersService.uploadFilePI,frmData).subscribe((data) => {
        console.log(data);
        this.docForm.value.plogofileName=fileExtension
        this.docForm.value.plogofilePath=data.path
        this.docForm.patchValue({
          'plogofileName':fileExtension,
          'plogofilePath':data.path
        })
      });
   
  
      console.log(frmData);
      this.tempForm.push(frmData);
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
