import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPandiComponent } from './add-pandi.component';

describe('AddPandiComponent', () => {
  let component: AddPandiComponent;
  let fixture: ComponentFixture<AddPandiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPandiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
