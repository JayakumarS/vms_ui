import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { LinkTicketTypesLedgerCardsService } from '../link-ticket-types-ledger-cards.service';
import { LinkTicketTypesLedgerCards } from '../link-ticket-types-ledger-cards.model';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-list-link-ticket-types-ledger-cards',
  templateUrl: './list-link-ticket-types-ledger-cards.component.html',
  styleUrls: ['./list-link-ticket-types-ledger-cards.component.sass']
})
export class ListLinkTicketTypesLedgerCardsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "ticketTypes",
    "ledgerCards",
     "actions"
   ];
 
 
   
  dataSource: ExampleDataSource | null;
  exampleDatabase: LinkTicketTypesLedgerCardsService | null;
  selection = new SelectionModel<LinkTicketTypesLedgerCards>(true, []);
  linkTicketTypesLedgerCards: LinkTicketTypesLedgerCards | null;
  subs: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public linkTicketTypesLedgerCardsService: LinkTicketTypesLedgerCardsService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router
  ) {
    super();
  }
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
 
  ngOnInit(): void {
    this.loadData();
  }
 
  editCall(id){
 
  }
 
  deleteItem(id){
 
  }
 
  public loadData() {
    this.exampleDatabase = new LinkTicketTypesLedgerCardsService(this.httpClient,this.serverUrl,this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
 }
 
 export class ExampleDataSource extends DataSource<LinkTicketTypesLedgerCards> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: LinkTicketTypesLedgerCards[] = [];
  renderedData: LinkTicketTypesLedgerCards[] = [];
  constructor(
    public exampleDatabase: LinkTicketTypesLedgerCardsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
 
  connect(): Observable<LinkTicketTypesLedgerCards[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
   
    this.exampleDatabase.getList();
    return merge(...displayDataChanges).pipe(map(() => {
        this.filteredData = this.exampleDatabase.data.slice().filter((linkTicketTypesLedgerCards: LinkTicketTypesLedgerCards) => {
            const searchStr = (
              linkTicketTypesLedgerCards.ticketTypes +
              linkTicketTypesLedgerCards.ledgerCards 
             
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
 
        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
 
  sortData(data: LinkTicketTypesLedgerCards[]): LinkTicketTypesLedgerCards[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "ticketTypes":
          [propertyA, propertyB] = [a.ticketTypes, b.ticketTypes];
          break;
        case "ledgerCards":
          [propertyA, propertyB] = [a.ledgerCards, b.ledgerCards];
          break;
         
       
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
 }
 