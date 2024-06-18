
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaintainRank } from '../maintain-rank.model';
import { MaintainRankResultBean } from '../maintain-rank-result-bean';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { MaintainRankService } from '../maintain-rank.service';
@Component({
  selector: 'app-add-maintain-rank',
  templateUrl: './add-maintain-rank.component.html',
  styleUrls: ['./add-maintain-rank.component.sass']
})
export class AddMaintainRankComponent implements OnInit {
  public groupageFilterCtrl: FormControl = new FormControl();
  groupageFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('suppliergroupage', { static: true }) suppliergroupage: MatSelect;

  public departmentFilterCtrl: FormControl = new FormControl();
  departmentFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('suppliergroupage', { static: true }) supplierdepartment: MatSelect;

  protected onDestroy = new Subject<void>();




  docForm: FormGroup;
  countryMaster: MaintainRank;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;
  groupagelist:any;
  departmentlist:any;
  // For Encryption
  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];

  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public MaintainRankService: MaintainRankService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar,public matError : MatErrorService) { 

    this.docForm = this.fb.group({

      maintainRankBeanDtls: this.fb.array([
        this.fb.group({
      select: [""],
      code: [""],
      description: [""],
      groupage: [""],
      oAndt: [""],
      department: [""],
      sno: 1,
      remarks:[""],
    })
  ]),
    });

  }
  
   ngOnInit() {
    
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
        this.edit=true;
        this.fetchDetails(this.decryptRequestId) ;
      }
     });

     this.groupageFilterCtrl.valueChanges
     .pipe(takeUntil(this.onDestroy))
     .subscribe(() => {
       this.filtergroupage();
     });
   

     this.groupagelist = [
      { id: "g1", text: "junior officer" },
      { id: "g2", text: "  officer" },
      {  id: "g3", text: "petty officer"},
      {  id: "g4", text: "senior officer"},
      {  id: "g5", text: "SuperNumerary"},
      {  id: "g6", text: "Trainee"},
      {  id: "g7", text: "Visitor"}

    ];
      
    //  this.httpService.get<any>(this.MaintainRankService.getgrouppage).subscribe((res: any) => {

    //   this.groupagelist = res;

      this.groupageFilteredOptions.next(this.groupagelist.slice());
        // });


        
     


     this.departmentFilterCtrl.valueChanges
     .pipe(takeUntil(this.onDestroy))
     .subscribe(() => {
       this.filterdepartment();
     });
   
 
     this.httpService.get<any>(this.MaintainRankService.getdepartment).subscribe((res: any) => {

      this.departmentlist = res;

      this.departmentFilteredOptions.next(this.departmentlist.slice());
    });



   }
   update() {

    const dtlArray = this.docForm.get('maintainRankBeanDtls') as FormArray;
    dtlArray.controls.forEach(control => {
      control.get('code').enable();
    });
    if(this.docForm.valid){
      this.MaintainRankService.updateRank(this.docForm.value, this.router, this.notificationService);
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
      this.MaintainRankService.saveRank(this.docForm.value, this.router, this.notificationService);
    }else{
      this.matError.markFormGroupTouched(this.docForm);
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill the required details",
        "top",
        "right");
    }


   }


   addRow(){
    let rankdetailDtlArray=this.docForm.controls.maintainRankBeanDtls as FormArray;
    let arraylen=rankdetailDtlArray.length;
    var len = this.docForm.controls["maintainRankBeanDtls"].value.length;

    let newUsergroup:FormGroup = this.fb.group({
      select: [""],
      code: [""],
      description: [""],
      groupage: [""],
      oAndt: [""],
      department: [""],
      sno: 1 + len,
      remarks:[""],
    })
    rankdetailDtlArray.insert(arraylen,newUsergroup);
  }

   removeRow(){
    let count = 0;
    const deleteRow = this.docForm.controls.maintainRankBeanDtls as FormArray;
    let i = 0;
    
    while (i < deleteRow.length) {
      if (deleteRow.at(i).value.select) {
        deleteRow.removeAt(i);
        count++;
      } else {
        i++;
      }
    }

    if(count == 0){
      this.showNotification(
        "snackbar-danger",
        "Please select atleast one row",
        "top",
        "right"
      );
    }

  }
   cancel(){
     this.router.navigate(['/crew/maintain/maintain-rank/list-maintain-rank']);
   }
  filtergroupage(){
    if (!this.groupagelist) {
      return;
    }
    // get the search keyword
    let search = this.groupageFilterCtrl.value;
    if (!search) {
      this.groupageFilteredOptions.next(this.groupagelist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.groupageFilteredOptions.next(
      this.groupagelist.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filterdepartment(){
    if (!this.departmentlist) {
      return;
    }
    // get the search keyword
    let search = this.departmentFilterCtrl.value;
    if (!search) {
      this.departmentFilteredOptions.next(this.departmentlist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.departmentFilteredOptions.next(
      this.departmentlist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
  fetchDetails(id: any): void {
    this.httpService.get<any>(this.MaintainRankService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      let dtlArray = this.docForm.controls.maintainRankBeanDtls as FormArray;
      dtlArray.clear();
      data.list.forEach((element, index) => {
        let arraylen = dtlArray.length;
        let newUsergroup: FormGroup = this.fb.group({
          select:[""],
          code: [element.code],
          description:[element.description + ""],
          groupage: [element.groupage],
          department:[element.department],
          oAndt: [element.oAndt.toString()],
          sno:[element.sno],
          remarks:[element.remarks]
        })
        dtlArray.insert(arraylen, newUsergroup);
        newUsergroup.get('code').disable();
      });
      }, error: (err) => console.log(err)
     });
  
  }
  


  getmastrcurr(){
    
    
  }
  
  
  getmastrcurr1(currid) {
  var value;
  var value1;
  this.currencyList.forEach(element => {
  if (element.id === currid) {
    value = element.text;
    value1 = element.id;
  }
  });
  return value;
  }

  onKey(value) {
    if (value == "") {
      this.currencyList = this.currtmpList;
    } else {
      this.currencyList = this.currtmpList;
      this.currencyList = this.search(value);
    }
  }
  
  search(value: string) {
    let filter = value.toLowerCase();
    return this.currencyList.filter(option =>
      option.item.toLowerCase().startsWith(filter)
    );
  }
  
  reset(){
    if(!this.edit){
      this.docForm = this.fb.group({
        countryCode: [""],
        countryName: [""],
        currency: [""],
        clientType:[""],
        isActive:["true"],
      });
    }else{
      this.fetchDetails(this.docForm.value.countryCode);
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  validateCountry(event){
   
  }

}

