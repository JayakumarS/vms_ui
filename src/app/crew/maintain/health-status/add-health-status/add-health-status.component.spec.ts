import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHealthStatusComponent } from './add-health-status.component';

describe('AddHealthStatusComponent', () => {
  let component: AddHealthStatusComponent;
  let fixture: ComponentFixture<AddHealthStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHealthStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHealthStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
