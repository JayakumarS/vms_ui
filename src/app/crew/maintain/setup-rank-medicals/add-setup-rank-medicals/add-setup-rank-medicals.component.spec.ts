import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetupRankMedicalsComponent } from './add-setup-rank-medicals.component';

describe('AddSetupRankMedicalsComponent', () => {
  let component: AddSetupRankMedicalsComponent;
  let fixture: ComponentFixture<AddSetupRankMedicalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSetupRankMedicalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSetupRankMedicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
