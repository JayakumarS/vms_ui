import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatErrorService } from 'src/app/core/service/mat-error.service';
import { ReligionService } from '../religion.service';

@Component({
  selector: 'app-add-religion',
  templateUrl: './add-religion.component.html',
  styleUrls: ['./add-religion.component.sass']
})
export class AddReligionComponent implements OnInit {

  
  docForm: FormGroup;
  edit:boolean=false;
  

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router,
    private httpService: HttpServiceService,
    private religionService : ReligionService,
    private notificationService: NotificationService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public matError : MatErrorService
  ) { 
    this.docForm = this.fb.group({
      religionId: [""],
      code: [""],
      name: [""],
      active: [true]
    });
    }


  ngOnInit() {
    this.httpService.get<any>(this.religionService.getSequenceCode).subscribe((res: any) => {

      
      this.docForm.patchValue({
        'code':res.code
      })
    })

    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.code !== undefined) {
        this.docForm.patchValue({
          'code':queryParams.code
        })
        this.docForm.value.code = queryParams.code;
      }
    });
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

      this.httpService.get(this.religionService.editUrl + "?id=" + id).subscribe((res: any) => {
        console.log(res);
        if (res.list[0].active == 'Y') {
          this.docForm.patchValue({ 'active': true })
        }
        else {
          this.docForm.patchValue({ 'active': false })
        }
  
        this.docForm.patchValue({
  
  
          'code': res.list[0].code,
          'name': res.list[0].name,
          'religionId': res.list[0].religionId
          
          // 'active': res.departmentBean.active
  
        });
      });
    }

    save(){
      if(this.docForm.valid){
        this.religionService.saveReligion(this.docForm.value, this.router, this.notificationService);
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
        this.religionService.updateReligion(this.docForm.value, this.router, this.notificationService);
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
    this.router.navigate(['/crew/maintain/religion/list-religion']);
  }

 
}
