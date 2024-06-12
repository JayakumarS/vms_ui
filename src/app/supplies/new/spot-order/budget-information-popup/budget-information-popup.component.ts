import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-information-popup',
  templateUrl: './budget-information-popup.component.html',
  styleUrls: ['./budget-information-popup.component.sass']
})
export class BudgetInformationPopupComponent implements OnInit {
  
  activeQuarter:any;
  currentDate:any;
  constructor() { }

  ngOnInit(): void {
    let date = new Date();
    this.currentDate = this.formatDate(date);
    this.setActiveQuarterBasedOnCurrentMonth();
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  setActiveQuarterBasedOnCurrentMonth(): void {
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth >= 1 && currentMonth <= 3) {
      this.activeQuarter = '1st Q';
    } else if (currentMonth >= 4 && currentMonth <= 6) {
      this.activeQuarter = '2nd Q';
    } else if (currentMonth >= 7 && currentMonth <= 9) {
      this.activeQuarter = '3rd Q';
    } else {
      this.activeQuarter = '4th Q';
    }
  }

  cancel(){

  }

}
