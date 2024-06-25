import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { PortMasterService } from '../port-master.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PortMaster } from '../port-master.model';

@Component({
  selector: 'app-add-port-master',
  templateUrl: './add-port-master.component.html',
  styleUrls: ['./add-port-master.component.sass']
})
export class AddPortMasterComponent implements OnInit {
  docForm : FormGroup;
  edit:boolean=false;
  requestId: any;
  portMaster: PortMaster;


  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    public portMasterService: PortMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    private encryptionService:EncryptionService,
    public snackBar: MatSnackBar) { 

    this.docForm = this.fb.group({
      portCode: ["", [Validators.required]],
      portName: ["", [Validators.required]],
      portType: ["Port"],
      isActive:[true],
      portId : [""]
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ 
      this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId) ;

      }
     }); 
  }

  save(){
    if(this.docForm.valid){
      this.portMaster = this.docForm.value;
      // console.log(this.countryMaster);
      this.portMasterService.addPort(this.portMaster,this.router,this.notificationService);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }
  fetchDetails(portCode: any): void {
    this.httpService.get(this.portMasterService.editPortMaster + "?id="+portCode).subscribe((res: any) => {

      this.docForm.patchValue({
        'portCode': res.list[0].portCode,
        'portName': res.list[0].portName,
        'portType': res.list[0].portType,
        'isActive': res.list[0].isActive,
      })
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );

  }
  
  update() {
    this.docForm.value.portId = this.requestId;
    this.portMaster = this.docForm.value;
    this.portMasterService.portUpdate(this.portMaster,this.router,this.notificationService);

  }

  cancel(){
    this.router.navigate(['/vessels/master/port-Master/list-port-master']);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
