import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-departments-pop-up',
  templateUrl: './departments-pop-up.component.html',
  styleUrls: ['./departments-pop-up.component.sass']
})
export class DepartmentsPopUpComponent  implements OnInit{
  docForm: FormGroup;
  dialog: any;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DepartmentsPopUpComponent>,
  ) { 
    this.docForm = this.fb.group({
      itemsToOrderCommends:[""]
    });
  }

  ngOnInit(): void {

    this.docForm = this.fb.group({
      itemsToOrderCommends:[""]
    });
  }

  itemsToOrderCommendsCall(){
    this.dialogRef.close({ data: this.docForm.value.itemsToOrderCommends });
  }


  cancel(){
    this.dialogRef.close({ data: 'CANCEL' });

  }

  onClick(): void {
    
  }
}
