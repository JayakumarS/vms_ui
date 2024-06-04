import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-collective-contract',
  templateUrl: './add-collective-contract.component.html',
  styleUrls: ['./add-collective-contract.component.sass']
})
export class AddCollectiveContractComponent implements OnInit {
  docForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    public router: Router
  ) { 
    // this.docForm = this.fb.group({
    //   firstDetailRow: this.fb.array([
    //     this.fb.group({
    //       nationality: [""],
    //       item: [""],
    //       uomId: [""],
    //       available: [""],
    //       batchno: [""],
    //       weight: [""],
    //       rate: [""],
    //       qty: [""],
    //       price: [""],
    //       vatTax: [""],
    //       itemName: [""]
    //     })
    //   ])
    // });
  }

  ngOnInit(): void {
  }

}
