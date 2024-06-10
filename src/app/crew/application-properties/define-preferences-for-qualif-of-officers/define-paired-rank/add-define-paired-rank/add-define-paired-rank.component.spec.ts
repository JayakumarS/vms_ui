import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefinePairedRankComponent } from './add-define-paired-rank.component';

describe('AddDefinePairedRankComponent', () => {
  let component: AddDefinePairedRankComponent;
  let fixture: ComponentFixture<AddDefinePairedRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefinePairedRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDefinePairedRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
