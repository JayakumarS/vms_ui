import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { FleetManagersService } from '../fleet-managers.service';
@Component({
  selector: 'app-add-fleet-managers',
  templateUrl: './add-fleet-managers.component.html',
  styleUrls: ['./add-fleet-managers.component.sass']
})
export class AddFleetManagersComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  docForm: FormGroup;
  fleetlist :  any =[];
  crewName :  any =[];
  opmanagerlist:any=[];
  techmanagerlist:any=[];
  edit:boolean=false;
  requestId: any;
  decryptRequestId: any;

  constructor(
    private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public FleetManagersService: FleetManagersService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar,
    public matError : MatErrorService
  ) { 
    super();
    this.docForm=this.fb.group({
     
          code:[""],
          fleet:[""],
          opmanager:[""],
          techmanager:[""],
          fleetManagersid:[""],

    })
  }

  ngOnInit(): void {
  
    this.getfleetlist();

    this.getCrewName();

      this.httpService.get<any>(this.FleetManagersService.getSequenceCode).subscribe((res: any) => {

      
        this.docForm.patchValue({
          'code':res.code
        })
      })
        


    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
        this.edit=true;
        this.fetchDetails(this.decryptRequestId) ;
      }
     });
    


    


  }

  getfleetlist(){
    this.httpService.get(this.FleetManagersService.getFleetUrl).subscribe({next: (res: any) => {
      this.fleetlist = res.lCommonUtilityBean;
    }, error: (err) => console.log(err)
   });
  }

  getCrewName(){
    this.httpService.get(this.FleetManagersService.getCrewName).subscribe({next: (res: any) => {
      this.crewName = res.lCommonUtilityBean;
    }, error: (err) => console.log(err)
   });
  }

  
  update(){

    if(this.docForm.valid){
      this.FleetManagersService.update(this.docForm.value, this.router, this.notificationService);
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
      this.FleetManagersService.save(this.docForm.value, this.router, this.notificationService);
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
this.httpService.get<any>(this.FleetManagersService.editUrl+"?id="+id).subscribe({next: (data: any) => {
      this.docForm.patchValue({
        'code': data.list[0].code,
        'fleet': data.list[0].fleet.toString(),
        'opmanager': data.list[0].opmanager,
        'techmanager': data.list[0].techmanager,
        'fleetManagersid': data.list[0].fleetManagersid

      });

    }
  });
  }
  cancel(){
    this.router.navigate(['/vessels/maintain/fleet-managers/list-fleet-managers']);
    
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
