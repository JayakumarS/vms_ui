import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalsComponent } from './add-medicals.component';

describe('AddMedicalsComponent', () => {
  let component: AddMedicalsComponent;
  let fixture: ComponentFixture<AddMedicalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMedicalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMedicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
