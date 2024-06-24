import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { BloodGroupService } from '../blood-group.service';
import { MatErrorService } from 'src/app/core/service/mat-error.service';


@Component({
  selector: 'app-add-blood-group',
  templateUrl: './add-blood-group.component.html',
  styleUrls: ['./add-blood-group.component.sass']
})
export class AddBloodGroupComponent implements OnInit {


  docForm: FormGroup;
  edit: boolean = false;
  
  constructor( private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    private httpService: HttpServiceService,
    private bloodGroupService : BloodGroupService,
    private notificationService: NotificationService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public matError : MatErrorService
  
  ) { 
    this.docForm = this.fb.group({
      bloodGroupCode: [""],
      name: [""],
      active: [true]
    });
    }

   
    
    ngOnInit() {
      
      this.route.params.subscribe(params => {
        if (params.id != undefined && params.id != 0) {
          // this.decryptRequestId = params.id;
          // this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
          this.edit = true;
          this.fetchDetails(params.id);
        }
      });
     }
 
   

    fetchDetails(id: any) {

      this.httpService.get(this.bloodGroupService.editUrl + "?id=" + id).subscribe((res: any) => {
        console.log(res);
        if (res.bloodGroupBean.active == 'Y') {
          this.docForm.patchValue({ 'active': true })
        }
        else {
          this.docForm.patchValue({ 'active': false })
        }
  
        this.docForm.patchValue({
  
  
          'bloodGroupCode': res.bloodGroupBean.bloodGroupCode,
          'name': res.bloodGroupBean.name,
        
  
        });
      });
    }

    save(){
      if(this.docForm.valid){
        this.bloodGroupService.saveBloodGroup(this.docForm.value, this.router, this.notificationService);
      }else{
        this.showNotification(
          "snackbar-danger",
          "Please fill the required details",
          "top",
          "right"
        );
      }
    }
  
    update(){
      if(this.docForm.valid){
        this.bloodGroupService.updateBloodGroup(this.docForm.value, this.router, this.notificationService);
      }else{
        this.showNotification(
          "snackbar-danger",
          "Please fill the required details",
          "top",
          "right"
        );
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

  



  cancel(){
    this.router.navigate(['/crew/maintain/blood-group/list-blood-group']);
  }

 
}
