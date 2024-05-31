import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';

@Component({
  selector: 'app-user-message-pop-up',
  templateUrl: './user-message-pop-up.component.html',
  styleUrls: ['./user-message-pop-up.component.sass']
})
export class UserMessagePopUpComponent implements OnInit {
  userName: any;
  password: any;

  constructor(
    public dialogRef: MatDialogRef<UserMessagePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public EncrDecr: EncrDecrService,private serverUrl:serverLocations
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.userName=this.data.userNameForPopUp;
    // this.password = this.EncrDecr.get(this.serverUrl.secretKey, this.data.passwordForPopUp)
    this.password=this.data.passwordForPopUp; 
    console.log(this.password);
   }
  onNoClick(){
    this.dialogRef.close();
  }

}
