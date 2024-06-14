import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { UtilitiesService } from 'src/app/supplies/utilities/utilities.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass']
})
export class AddItemComponent implements OnInit {
  docForm: FormGroup;
  systemList : any = [];
  subsystemList : any = [];
  unitList : any = [];
  uploadFileList:any=[];
  excel:any;
  tempForm:any=[];
  files:any=[];
  
  public systemFilterCtrl: FormControl = new FormControl();
  systemFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('systemFilter', { static: true }) systemFilter: MatSelect;
  protected onDestroy = new Subject<void>();

  public unitFilterCtrl: FormControl = new FormControl();
  unitFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('unitFilter', { static: true }) unitFilter: MatSelect;

  public subsystemFilterCtrl: FormControl = new FormControl();
  subsystemFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('subsystemFilter', { static: true }) subsystemFilter: MatSelect;

  constructor( private fb: FormBuilder,
    public utilitiesService: UtilitiesService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router) { }

  ngOnInit(): void {
    this.docForm = this.fb.group({
      system: [""],
      subsystem: [""],
      refCode: [""],
      drawNo: [""],
      shortDesc: [""],
      unit: [""],
      positionNo: [""],
      longDesc: [""],
      qtyMin: [""],
      qtyMax: [""],
      refCost: [""],
      factor: [""],
      itemCategory: [""],
      files: [[]],
    });

    this.systemList = [{id:1,text:"ACCUMULATOR BATTERIES"},{id:2,text:"AIR COND-PLANT"},{id:3,text:"CARRIER"},{id:4,text:"ALARM MONITORING SYSTEM"}];
    this.systemFilteredOptions.next(this.systemList.slice());

    this.systemFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterSystem();
      });
      this.subsystemList = [{id:1,text:"SPARE-ACCUMULATOR BATTERIES"},{id:2,text:"Spare-AIR COND-PLANT"},{id:3,text:"Spare-CARRIER"},{id:4,text:"Spare-ALARM MONITORING SYSTEM"}];
      this.subsystemFilteredOptions.next(this.subsystemList.slice());
  
      this.subsystemFilterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterSubsystem();
        });

      this.unitList = [{id:1,text:"AMPOULE"},{id:2,text:"AMPOULE-1 ML"},{id:3,text:"AMPOULE-2 ML"},{id:4,text:"BAG"}];
      this.unitFilteredOptions.next(this.unitList.slice());
  
      this.unitFilterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterUnit();
        });
  }

  filterUnit(){
    if (!this.unitList) {
      return;
    }
    let search = this.unitFilterCtrl.value;
    if (!search) {
      this.unitFilteredOptions.next(this.unitList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.unitFilteredOptions.next(
      this.unitList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filterSystem(){
    if (!this.systemList) {
      return;
    }
    let search = this.systemFilterCtrl.value;
    if (!search) {
      this.systemFilteredOptions.next(this.systemList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.systemFilteredOptions.next(
      this.systemList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

   filterSubsystem(){
    if (!this.subsystemList) {
      return;
    }
    let search = this.subsystemFilterCtrl.value;
    if (!search) {
      this.subsystemFilteredOptions.next(this.subsystemList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.subsystemFilteredOptions.next(
      this.subsystemList.filter(title => title.text.toLowerCase().includes(search))
    );
   }

  save(){
    
  }
  
  info(){
    this.router.navigate(['/supplies/utilities/user-log']);
  }

  cancel(){
    this.router.navigate(['/supplies/utilities/user-log']);
  }

  uploadFile(event) {
    for(let i=0; i < event.target.files.length; i++){
      var excelfile = event.target.files[i];
      this.excel = event.target.files[i];
      this.uploadFileList.push(this.excel);
      var fileExtension = excelfile.name;
      var frmData: FormData = new FormData();
      frmData.append("file", excelfile);
      frmData.append("fileName", fileExtension);
    }
  }

  addFile() {
      let obj = [];
      if(this.uploadFileList.length > 0){
        for(let i=0;i < this.uploadFileList.length;i++){
          this.excel = this.uploadFileList[i];
          if (this.checkUndefined(this.excel)) {
            this.showNotification(
              "snackbar-danger",
              "Please select the file",
              "top",
              "right"
            ); 
          }else {
             obj = this.docForm.value.files.filter((file: any) => {return file.name === this.excel.name});
    
             if (obj != undefined && obj.length > 0) {
              this.showNotification(
                "snackbar-danger",
                this.excel.name + " file already added",
                "top",
                "right"
              );
            } else {
              this.docForm.value.files.push(this.excel);
              this.uploadFileList = [];
            }
          }
        }
      }else{
        this.showNotification(
          "snackbar-danger",
          "Please upload atleast one file",
          "top",
          "right"
        );
      }
  }

  deleteFile(i){
    this.docForm.value.files.splice(i, 1);
  }

  checkUndefined(value) {
    var invalid = false;
    if (value == undefined || value == 'undefined' || value == null || value == 'null' || value == '') {
       invalid = true;
    }
    return invalid;
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