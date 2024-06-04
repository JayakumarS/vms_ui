import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { LibraryFileService } from '../library-file.service';
import { ExampleDataSource } from 'src/app/admin/user-log/user-log-list/user-log-list.component';
import { NotificationService } from 'src/app/core/service/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-library-file',
  templateUrl: './list-library-file.component.html',
  styleUrls: ['./list-library-file.component.sass']
})
export class ListLibraryFileComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  dataSource: ExampleDataSource | null;
  exampleDatabase: LibraryFileService | null;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  id: any;
  docForm:  FormGroup;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    private router:Router,    public notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder, 
  ) {
    super();
    {
    this.docForm = this.fb.group({
      identifier:[""],
       
      });
    }
  }
  
  
  ngOnInit(): void {

    
  }


  reset()
{
  this.docForm.reset();
  this.docForm = this.fb.group({
    identifier:[""],
    });
}
search(){}
refresh(){

}

}
