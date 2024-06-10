import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefinePairedRankComponent } from './list-define-paired-rank.component';

describe('ListDefinePairedRankComponent', () => {
  let component: ListDefinePairedRankComponent;
  let fixture: ComponentFixture<ListDefinePairedRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDefinePairedRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDefinePairedRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
