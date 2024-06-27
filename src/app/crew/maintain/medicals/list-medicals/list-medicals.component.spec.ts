import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicalsComponent } from './list-medicals.component';

describe('ListMedicalsComponent', () => {
  let component: ListMedicalsComponent;
  let fixture: ComponentFixture<ListMedicalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMedicalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMedicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
