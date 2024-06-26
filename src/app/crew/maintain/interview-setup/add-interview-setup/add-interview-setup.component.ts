import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { InterviewSetupService } from '../interview-setup.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatErrorService } from 'src/app/core/service/mat-error.service';

@Component({
  selector: 'app-add-interview-setup',
  templateUrl: './add-interview-setup.component.html',
  styleUrls: ['./add-interview-setup.component.sass']
})
export class AddInterviewSetupComponent implements OnInit {
  edit: boolean = false;
  rankList: any[] = [];
  docForm: FormGroup;
  requestId: any;
  decryptRequestId: any;

  
  config1 = {
    tabSpaces: 10,
    extraPlugins: 'smiley,justify,indentblock,colordialog,font,exportpdf,pagebreak',
    font_names: 'कृति देवी/Kruti;Andale Mono;Arial; Arial Black; Arial Narrow; Comic Sans MS; Courier New; Georgia; Helvetica; Impact; Tahoma; Terminal; Times New Roman; Verdana;',
    removeButtons: 'Paste,PasteText,PasteFromWord',
    removePlugins: 'elementspath',
  };

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private notificationService: NotificationService,
    public interviewSetupService: InterviewSetupService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public EncrDecr: EncrDecrService,
    private serverUrl: serverLocations,
    private encryptionService: EncryptionService,
    public snackBar: MatSnackBar,
    public matError: MatErrorService
  ) {
    this.docForm = this.fb.group({
      rank: [""],
      interviewsetupid:[""],  
      interviewSetupBeanDtls: this.fb.array([
        this.fb.group({
          sort : 1,
          select:[""],
          description:[""]
         
        })
      ]),
       });
  }

  ngOnInit() {
  
    this.route.params.subscribe(params => {
      if (params.id !== undefined && params.id !== 0) {
        this.decryptRequestId = params.id;
        this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId);
        this.edit = true;
        this.fetchDetails(this.decryptRequestId);
      }
    });
     this.getRankList();
  }

  getRankList(){
    this.httpService.get(this.interviewSetupService.rankListUrl).subscribe({next: (res: any) => {
        this.rankList = res.lInterviewSetupBean;
      }, error: (err) => console.log(err)
    });
  }



  get rowDtls() {
    return this.docForm.get('interviewSetupBeanDtls') as FormArray;
  }

  getControl(index: number,name:any) {
    return this.rowDtls.at(index).get([name]);
  }

 addRow(){
  let interviewSetupBeanDtlsArray=this.docForm.controls.interviewSetupBeanDtls as FormArray;
  let arraylen=interviewSetupBeanDtlsArray.length;
  var len = this.docForm.controls["interviewSetupBeanDtls"].value.length;

  let newUsergroup:FormGroup = this.fb.group({
    sort : 1 + len,
    select: [""],
    description:[""]
  
    
  })
  interviewSetupBeanDtlsArray.insert(arraylen,newUsergroup);
}

removeRow(){
  let count = 0;
  const deleteRow = this.docForm.controls.interviewSetupBeanDtls as FormArray;
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

fetchDetails(id){
  this.httpService.get<any>(this.interviewSetupService.editUrl+"?id="+id).subscribe({next: (data: any) => {
    let dtlArray = this.docForm.controls.interviewSetupBeanDtls as FormArray;
    dtlArray.clear();
    data.list.forEach((element, index) => {
      let arraylen = dtlArray.length;
      let newUsergroup: FormGroup = this.fb.group({
        select:[""],
        description:[element.description + ""]
      
      })
      dtlArray.insert(arraylen, newUsergroup);
      newUsergroup.get('code').disable();
    });
    }, error: (err) => console.log(err)
   });
}

update() {
  const dtlArray = this.docForm.get('interviewSetupBeanDtls') as FormArray;
  dtlArray.controls.forEach(control => {
    control.get('code').enable();
  });
  if(this.docForm.valid){
    this.interviewSetupService.updateInterviewSetup(this.docForm.value, this.router, this.notificationService);
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
    this.interviewSetupService.saveInterviewSetup(this.docForm.value, this.router, this.notificationService);
  }else{
    this.matError.markFormGroupTouched(this.docForm);
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right");
  }
}














  // fetchDetails(id: any) {

  //   this.httpService.get(this.interviewSetupService.editUrl + "?id=" + id).subscribe((res: any) => {
  //     console.log(res);

  //         this.docForm.patchValue({
  //       'rank': res.interviewSetupBean.rank,
  //       'description': res.interviewSetupBean.description,
  //       'interviewsetupid': res.interviewSetupBean.interviewsetupid
  //     });
  //   });
  // }

  // save(){
  //   if(this.docForm.valid){
  //     this.interviewSetupService.saveInterviewSetup(this.docForm.value, this.router, this.notificationService);
  //   }else{
  //     this.showNotification(
  //       "snackbar-danger",
  //       "Please fill the required details",
  //       "top",
  //       "right"
  //     );
  //   }
  // }

  // update(){
  //   if(this.docForm.valid){
  //     this.interviewSetupService.updateInterviewSetup(this.docForm.value, this.router, this.notificationService);
  //   }else{
  //     this.showNotification(
  //       "snackbar-danger",
  //       "Please fill the required details",
  //       "top",
  //       "right"
  //     );
  //   }
  // }


  cancel() {
    this.router.navigate(['/crew/maintain/interview-setup/list-interview']);
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
