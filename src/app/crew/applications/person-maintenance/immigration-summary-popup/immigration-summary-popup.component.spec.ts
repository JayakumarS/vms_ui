import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationSummaryPopupComponent } from './immigration-summary-popup.component';

describe('ImmigrationSummaryPopupComponent', () => {
  let component: ImmigrationSummaryPopupComponent;
  let fixture: ComponentFixture<ImmigrationSummaryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmigrationSummaryPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmigrationSummaryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
