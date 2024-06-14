import { Component,ElementRef, OnInit,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { debounce } from 'lodash';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject, Observable, ReplaySubject, Subject, debounceTime, distinctUntilChanged, fromEvent, map, merge, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSort } from '@angular/material/sort';
import { landedgoods } from '../landedgoods-controlpanel.model';
import { LandedgoodsControlpanelService } from '../landedgoods-controlpanel.service';

@Component({
  selector: 'app-landed-goods-control-panel',
  templateUrl: './landed-goods-control-panel.component.html',
  styleUrls: ['./landed-goods-control-panel.component.sass']
})
export class LandedGoodsControlPanelComponent extends UnsubscribeOnDestroyAdapter implements OnInit  {

  docForm: FormGroup;
  landedgoods:landedgoods;
  isReset: boolean = false;
  requestId: number;
  edit:boolean=false;
 
  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private landedgoodsControlpanelService:LandedgoodsControlpanelService ,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private encryptionService: EncryptionService,
    private serverUrl: serverLocations,
    public notificationService: NotificationService,
    private cmnService: CommonService, private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private authService: AuthService, 
    private EncrDecr: EncrDecrService,

  ) { 
    super();
    
   }

  ngOnInit(): void {
    this.docForm = this.fb.group({
      
     
        landgoodstab: this.fb.array([
          this.fb.group({
            type :[""],
            code : [""],
            date:[""],
            deliver : [""],
            info:[""],
            items:[""],
            scapitems:[""],
            itemstatus:[""],
            comminfo:[""],
            attachinfo:[""],
            port:[""],
            infogate:[""],
            show:[""],
            vessel:[""],
            department:[""],
            document:[""],
            // vesseltable: this.fb.array([
            //   this.fb.group({
      
            //     vessel:[""],
            //     department:[""],
            //     document:[""],
                
            //   })
            // ]),
          })
        ]), 
        
      
    });
    const dataarray1 = this.docForm.controls.landgoodstab as FormArray;

    dataarray1.removeAt(0);
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
      }
     });



     // Sample data to populate the table
    const sampleData = [
      { show:true,type: 'Vessel Landing To Agent', code: '64-FOT235017', date: '09/11/2023', port: 'FUJAIRAH', deliver: 'AGENT - OWNERS', info: '', items: '1', scapitems: '', itemstatus: '', comminfo: '', attachinfo: '', infogate: '',vessel: 'ABU SAMRAH', department: 'FUEL TESTING', document: '67574536536535363/Sat 09/Oct2023' },
      { show:true,type: 'Vessel Landing To Agent', code: '64-FOT235019', date: '09/12/2023', port: 'GIBRALTAR', deliver: 'AGENT - OWNERS', info: '', items: '1', scapitems: '', itemstatus: '', comminfo: '', attachinfo: '', infogate: '',vessel: 'ABU SAMRAH', department: 'FUEL TESTING', document: '453434434467258/Thu 09/Nov2023' },
      { show:true,type: 'Vessel Landing To Agent', code: '64-FOT235022', date: '07/11/2023', port: 'GIBRALTAR', deliver: 'AGENT - SIMATECH JEA', info: '', items: '1', scapitems: '', itemstatus: '', comminfo: '', attachinfo: '', infogate: '',vessel: 'ABU SAMRAH', department: 'FUEL TESTING', document: '69857453879879897/Tue 15/Dec2023' },
      { show:true,type: 'Vessel Landing To Agent', code: '64-FOT235013', date: '12/08/2023', port: 'MALTA', deliver: 'AGENT - CHARTERERS', info: '', items: '1', scapitems: '', itemstatus: '', comminfo: '', attachinfo: '', infogate: '',vessel: 'ABU SAMRAH', department: 'FUEL TESTING', document: '56435089767578/Fri 21/oct2024' },

    ];

    sampleData.forEach(data => this.addLandingGood(data));
  

  }
  





get landgoodstab() {

return this.docForm.get('landgoodstab') as FormArray;
}

addLandingGood(data: any) {
const group = this.fb.group({
  type: [data.type],
  code: [data.code],
  date: [data.date],
  port: [data.port],
  deliver: [data.deliver],
  info: [data.info],
  items: [data.items],
  scapitems: [data.scapitems],
  itemstatus: [data.itemstatus],
  comminfo: [data.comminfo],
  attachinfo: [data.attachinfo],
  infogate: [data.infogate],
  show:[data.show],
  vessel: [data.vessel],
  department: [data.department],
  document: [data.document],
});
this.landgoodstab.push(group);

}



  Landing(){
    this.router.navigate(['/supplies/new/landing-properties/add-landing-properties/0']);
  }
  refresh(){
 
  }
  search(){

  }
  
  excel(){

  }

  removeRow(){
    let i = 0;
    var value;
    let dataarray1 = this.docForm.controls.landgoodstab as FormArray;
    dataarray1.removeAt(i);

  }
}
