import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CrewPromotionService } from '../crew-promotion.service';

@Component({
  selector: 'app-add-crew-promotion',
  templateUrl: './add-crew-promotion.component.html',
  styleUrls: ['./add-crew-promotion.component.sass']
})
export class AddCrewPromotionComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  promotinglist:any=[];
  currentranklist:any=[];
  vesseltypelist:any=[];
  nationalitylist:any=[];
  ranktypelist: any=[];

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpService: HttpServiceService,
    private crewservice: CrewPromotionService
  ) { 
    super();
    this.docForm=this.formbuilder.group({
          currank:["",Validators.required],
          prorank:["",Validators.required],
          nationality:["",Validators.required],
          vesseltype:["",Validators.required],
          promoyrs:["",Validators.required],
          remarks:[""]
    })
  }

  ngOnInit(): void {

    //get Rank List
    this.httpService.get<any>(this.crewservice.getranklist).subscribe(
      (data) => {
        this.ranktypelist = data.lCommonUtilityBean;
      }, 
    );

    //get Country List
    this.httpService.get<any>(this.crewservice.getnationalitylist).subscribe(
      (data) => {
        this.nationalitylist = data.lCommonUtilityBean;
      }, 
    );

    //get vesseltype List
    this.httpService.get<any>(this.crewservice.getvesseltypelist).subscribe(
      (data) => {
        this.vesseltypelist = data.lCommonUtilityBean;
      }, 
    );

    //this.currentranklist = [
      //{id:1,text:"First Officer"},
      //{id:2,text:"Second Officer"}];

    //this.promotinglist=[
      //{ id:1,text:"Second Officer"},
      //{id:2,text:"Third Officer"},
      //{id:2,text:"Chief Officer"}];
    
      //this.nationalitylist=[
      //{ id:1,text:"India"},
      //{id:2,text:"Dubai"},
      //{id:2,text:"Singapore"}]

      //this.vesseltypelist=[
        //{id:1,text:"All types"},
        //{id:2,text:"Bulk Carrier"}];
  }

  keyPressNumber(event: any) {
    const pattern = /[0-9()+\-\.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  save(){

  }
  cancel(){
    this.router.navigate(['/crew/application-properties/crew-promotion/list-crew-promotion']);
    
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
