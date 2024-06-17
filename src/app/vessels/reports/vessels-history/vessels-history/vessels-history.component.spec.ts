import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselsHistoryComponent } from './vessels-history.component';

describe('VesselsHistoryComponent', () => {
  let component: VesselsHistoryComponent;
  let fixture: ComponentFixture<VesselsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VesselsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VesselsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
