import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFreightTypeComponent } from './list-freight-type.component';

describe('ListFreightTypeComponent', () => {
  let component: ListFreightTypeComponent;
  let fixture: ComponentFixture<ListFreightTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFreightTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFreightTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
