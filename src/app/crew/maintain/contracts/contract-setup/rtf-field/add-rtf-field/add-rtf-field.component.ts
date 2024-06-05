

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { RTFField } from '../rtf-fields.model';
import { RtfFieldsService } from '../rtf-fields.service';
@Component({
  selector: 'app-add-rtf-field',
  templateUrl: './add-rtf-field.component.html',
  styleUrls: ['./add-rtf-field.component.sass']
})
export class AddRTFFieldComponent implements OnInit {

  
  public contentsFilterCtrl: FormControl = new FormControl();
  contentsFilteredOptions: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  @ViewChild('contents', { static: true }) contents: MatSelect;
 
 
  protected onDestroy = new Subject<void>();


  docForm: FormGroup;
  RTFField: RTFField;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  isChecked: boolean = false;

  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];

  contentslist:any;
  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public RtfFieldsService: RtfFieldsService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 


    this.docForm = this.fb.group({
  


      rtfDetails: this.fb.array([
        this.fb.group({
          rtfField:[""],
          description:[""],

        })
      ]),


      rtfDetailsrow: this.fb.array([
        this.fb.group({
          contents:[""],

        })
      ]),
    });


  }
  
   ngOnInit() {
    

     this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });

     this.contentslist = [
      { id: "Cash For Crew Handling", text: "Cash For Crew Handling" },
      { id: "Cash For Deck Repair", text: "Cash For Deck Repair" },
      {  id: "Cash For Deck Spare", text: "Cash For Deck Spare"},
      { id: "Cash For Deck Stores", text: "OCash For Deck Stores" },
    
    ];
    
    this.contentsFilteredOptions.next(this.contentslist.slice());

// listen for origin List  search field value changes
this.contentsFilterCtrl.valueChanges
  .pipe(takeUntil(this.onDestroy))
  .subscribe(() => {
    this.filteritemcontentslist();
  });


}

filteritemcontentslist(){
    if (!this.contentslist) {
      return;
    }
    // get the search keyword
    let search = this.contentsFilterCtrl.value;
    if (!search) {
      this.contentsFilteredOptions.next(this.contentslist.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.contentsFilteredOptions.next(
      this.contentslist.filter(title => title.text.toLowerCase().includes(search))
    );
   }
   addRow(){
    let rtfDetailsDtlArray=this.docForm.controls.rtfDetails as FormArray;
    let arraylen=rtfDetailsDtlArray.length;

    let newUsergroup:FormGroup = this.fb.group({

      rtfField:[""],
      description:[""],

    })
    rtfDetailsDtlArray.insert(arraylen,newUsergroup);
  }  
  addRow1(){
    let rtfDetailsrowArray=this.docForm.controls.rtfDetailsrow as FormArray;
    let arraylen=rtfDetailsrowArray.length;

    let newUsergroup:FormGroup = this.fb.group({

      contents:[""],

    })
    rtfDetailsrowArray.insert(arraylen,newUsergroup);
  }

   removeRow(index){

    var value;
    let dataarray1 = this.docForm.controls.rtfDetails as FormArray;
    dataarray1.removeAt(index);

  }
  removeRow1(index){

    var value;
    let dataarray1 = this.docForm.controls.rtfDetailsrow as FormArray;
    dataarray1.removeAt(index);

  }
  onSubmit(){

  }
  fetchDetails(countryCode: any): void {
   
  }
  
  update() {


  }

  onCancel(){
    this.router.navigate(['/crew/maintain/contracts/contract-setup/RFT-Fields/list-rft-field']);

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
        rtfDetails: this.fb.array([
          this.fb.group({
            rtfField:[""],
            description:[""],
  
          })
        ]),
  
  
        rtfDetailsrow: this.fb.array([
          this.fb.group({
            contents:[""],
  
          })
        ]),
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

