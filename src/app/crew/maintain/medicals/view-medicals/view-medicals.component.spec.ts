import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicalsComponent } from './view-medicals.component';

describe('ViewMedicalsComponent', () => {
  let component: ViewMedicalsComponent;
  let fixture: ComponentFixture<ViewMedicalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMedicalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMedicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
