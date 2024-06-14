import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copy-vesselbudgets',
  templateUrl: './copy-vesselbudgets.component.html',
  styleUrls: ['./copy-vesselbudgets.component.sass']
})
export class CopyVesselbudgetsComponent implements OnInit {
  docForm:FormGroup;
  fromvessellist:any[];
  tovessellist:any[];

  constructor(
    private router:Router,
    private formbuilder:FormBuilder
  ) {
    this.docForm=this.formbuilder.group({
      fromvessel:[""],
      fromyear1:[""],
      toyear1:[""],
      tovessel:[""],
      fromyear2:[""],
      toyear2:[""]

    })
   }

  ngOnInit(): void {
    this.fromvessellist=[{id:1,text:"ABU SAMRAH"},{id:2,text:"AL DANAH"},{id:3,text:"AL NAHDA"}];
    this.tovessellist=[{id:1,text:"ABU SAMRAH"},{id:2,text:"AL DANAH"},{id:3,text:"AL NAHDA"}];
  }
  copy(){

  }
  cancel(){
    this.router.navigate(['/supplies/utilities']);

  }

}
