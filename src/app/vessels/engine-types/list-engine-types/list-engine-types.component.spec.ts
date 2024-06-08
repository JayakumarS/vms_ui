import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEngineTypesComponent } from './list-engine-types.component';

describe('ListEngineTypesComponent', () => {
  let component: ListEngineTypesComponent;
  let fixture: ComponentFixture<ListEngineTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEngineTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEngineTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
