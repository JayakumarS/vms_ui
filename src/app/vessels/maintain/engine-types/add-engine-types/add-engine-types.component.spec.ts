import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEngineTypesComponent } from './add-engine-types.component';

describe('AddEngineTypesComponent', () => {
  let component: AddEngineTypesComponent;
  let fixture: ComponentFixture<AddEngineTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEngineTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEngineTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
