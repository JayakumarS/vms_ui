import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedicalsComponent } from './delete-medicals.component';

describe('DeleteMedicalsComponent', () => {
  let component: DeleteMedicalsComponent;
  let fixture: ComponentFixture<DeleteMedicalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMedicalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMedicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
