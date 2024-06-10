import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplycycleControlpanelComponent } from './add-supplycycle-controlpanel.component';

describe('AddSupplycycleControlpanelComponent', () => {
  let component: AddSupplycycleControlpanelComponent;
  let fixture: ComponentFixture<AddSupplycycleControlpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSupplycycleControlpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSupplycycleControlpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
