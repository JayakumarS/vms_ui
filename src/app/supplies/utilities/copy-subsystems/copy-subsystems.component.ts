import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copy-subsystems',
  templateUrl: './copy-subsystems.component.html',
  styleUrls: ['./copy-subsystems.component.sass']
})
export class CopySubsystemsComponent implements OnInit {
  docForm:FormGroup;
  fromcodelist:any[];

  constructor(
    private formbuilder: FormBuilder,
    private router:Router
  ) {
    this.docForm=this.formbuilder.group({
      fromcode:[""],
      fromsubcode:[""],
      tosubcode:[""],
      jobs:[""],
      spares:[""]


    })
   }

  ngOnInit(): void {
    this.fromcodelist = [{ id: 1, text: "54BNKDAV" }, { id: 2, text: "CALOFIER" }];
  }
  copy(){

  }
  cancel(){
    this.router.navigate(['/supplies/utilities']);

  }


}
