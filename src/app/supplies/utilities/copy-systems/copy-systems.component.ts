import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copy-systems',
  templateUrl: './copy-systems.component.html',
  styleUrls: ['./copy-systems.component.sass']
})
export class CopySystemsComponent implements OnInit {
  docForm:FormGroup;
  fromcodelist :any[];

  constructor(
    private formbuilder:FormBuilder,
    private router:Router
  ) {
    this.docForm=this.formbuilder.group({
      fromcode:[""],
      tocode:[""],
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
    this.router.navigate(['/supplies/utilities'])

  }

}
