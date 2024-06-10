import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommTypesComponent } from './list-comm-types.component';

describe('ListCommTypesComponent', () => {
  let component: ListCommTypesComponent;
  let fixture: ComponentFixture<ListCommTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCommTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCommTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
