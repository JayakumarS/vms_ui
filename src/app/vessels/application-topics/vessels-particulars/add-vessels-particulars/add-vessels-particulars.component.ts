import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { vesswlsParticulars } from '../vessal-particulars.model';
import { VessalParticularsService } from '../vessal-particulars.service';
@Component({
  selector: 'app-add-vessels-particulars',
  templateUrl: './add-vessels-particulars.component.html',
  styleUrls: ['./add-vessels-particulars.component.sass']
})
export class AddVesselsParticularsComponent implements OnInit {

  docForm: FormGroup;
  vesswlsParticulars: vesswlsParticulars;
  currencyList=[];
  edit:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  requestId: any;
  decryptRequestId: any;
  currtmpList: any[];

  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public VessalParticularsService: VessalParticularsService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 

    this.docForm = this.fb.group({
      code: [""],
      name: [""],
      shortname: [""],
      prefix:[""],
      initials:[""],
      sorting: [""],
      xname1: [""],
      type: [""],
      fleet:[""],
      xname2:[""],
      vesseltype: [""],
      pandi: [""],
      vesseltype2: [""],
      hullandmachinery:[""],
      virtual:[""],
      vesselgroup: [""],
      fdandd: [""],
      wagescale: [""],
      classigication:[""],
      isActive:[""],
      reason: [""],
      vesselClass: [""],
      fleetvessel: [""],
      dateinfleettype:[""],
      valiedUntil:[""],
      leadvesselid: [""],
      flag: [""],
      greek: [""],
      registryport:[""],
      registryno:[""],
      builtdate: [""],
      placeBuild: [""],
      yardbuild: [""],
      imono:[""],
      hullno:[""],
      callsign:[""],
      natnumber:[""],
      mmis:[""],
      classno:[""],
      iceclass:[""],
      shipowner:[""],
      shipownerplatform:[""],
      operator:[""],
      useOperator:[""],
      safteyno:[""],
      officialManager:[""],
      shipmanager:[""],
      crewmanager:[""],
      superintendent:[""],
      groupmanager:[""],
    });

  }
  
   ngOnInit() {
    
     // Currency list dropdown
    this.httpService.get<any>(this.VessalParticularsService.currencyListUrl).subscribe(
       (data) => {
         this.currencyList = data.currencyList;
         this.currtmpList=data.currencyList;
       },
       (error: HttpErrorResponse) => {
        //  console.log(error.name + " " + error.message);
       }
     );

     this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
   }

  onSubmit(){

  }
  fetchDetails(countryCode: any): void {
    
  }
  
  update() {

  }

  onCancel(){
    this.router.navigate(['/vessels/application-topics/Vessels-particulars/list-vessel-particulars']);
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
        code: [""],
        name: [""],
        shortname: [""],
        prefix:[""],
        initials:[""],
        sorting: [""],
        xname1: [""],
        type: [""],
        fleet:[""],
        xname2:[""],
        vesseltype: [""],
        pandi: [""],
        vesseltype2: [""],
        hullandmachinery:[""],
        virtual:[""],
        vesselgroup: [""],
        fdandd: [""],
        wagescale: [""],
        classigication:[""],
        isActive:[""],
        reason: [""],
        vesselClass: [""],
        fleetvessel: [""],
        dateinfleettype:[""],
        valiedUntil:[""],
        leadvesselid: [""],
        flag: [""],
        greek: [""],
        registryport:[""],
        registryno:[""],
        builtdate: [""],
        placeBuild: [""],
        yardbuild: [""],
        imono:[""],
        hullno:[""],
        callsign:[""],
        natnumber:[""],
        mmis:[""],
        classno:[""],
        iceclass:[""],
        shipowner:[""],
        shipownerplatform:[""],
        operator:[""],
        useOperator:[""],
        safteyno:[""],
        officialManager:[""],
        shipmanager:[""],
        crewmanager:[""],
        superintendent:[""],
        groupmanager:[""],
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

