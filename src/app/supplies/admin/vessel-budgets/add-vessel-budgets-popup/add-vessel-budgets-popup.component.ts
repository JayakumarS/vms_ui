import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-vessel-budgets-popup',
  templateUrl: './add-vessel-budgets-popup.component.html',
  styleUrls: ['./add-vessel-budgets-popup.component.sass']
})
export class AddVesselBudgetsPopupComponent implements OnInit {

  list:any=[];
  select:boolean = false;
  rList:any=[];
  tempList:any=[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public values: any,
    public dialogRef: MatDialogRef<AddVesselBudgetsPopupComponent>
  ) {}

  ngOnInit(): void {
    this.tempList = this.values;
    this.list = [
      {id:1,text:"Commerical Dept",subList:[{code:"CM20",desc:"Bunker",select:false},{code:"CM40",desc:"Commerical Bunker",select:false}]},
      {id:2,text:"Berth Charges",subList:[{code:"5470",desc:"Berth Charges",select:false},{code:"5480",desc:"Berth Cost",select:false}]}
    ]

    if(this.tempList.length > 0){
      const tempCodes = new Set<string>();
      this.tempList.forEach(item => {
        item.subList.forEach(subItem => {
          tempCodes.add(subItem.code);
        });
      });

      this.list.forEach(item => {
        item.subList = item.subList.filter(subItem => !tempCodes.has(subItem.code));
      });

      this.list = this.list.filter(item => item.subList.length > 0);
    }
  }

  selectAll() {
    if(!this.select){
      this.list.forEach(group => {
        group.subList.forEach(item => {
          item.select = true;
        });
      });
      this.select = true;
      this.rList = this.list;
    }else{
      this.list.forEach(group => {
        group.subList.forEach(item => {
          item.select = false;
        });
      });
      this.select = false;
      this.rList = [];
    }
  }

  singleSelect(value,i,j){
    if(value){
      this.list[i].subList[j].select = true;
    }else{
      this.list[i].subList[j].select = false;
    }
  }

  setDtls(){
    let dtls = [];
    for (let i = 0; i < this.list.length; i++) {
      const group = this.list[i];
      for (let j = 0; j < group.subList.length; j++) {
        const item = group.subList[j];
        if (item.select) {
          dtls.push(group);
          break;
        }
      }
    }
    this.dialogRef.close({ data: dtls });
  }

  cancel(){
    this.dialogRef.close({ data: 'CANCEL' });
  }

}
