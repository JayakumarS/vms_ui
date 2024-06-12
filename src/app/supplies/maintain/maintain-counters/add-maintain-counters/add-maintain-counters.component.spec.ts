import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaintainCountersComponent } from './add-maintain-counters.component';

describe('AddMaintainCountersComponent', () => {
  let component: AddMaintainCountersComponent;
  let fixture: ComponentFixture<AddMaintainCountersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaintainCountersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMaintainCountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
