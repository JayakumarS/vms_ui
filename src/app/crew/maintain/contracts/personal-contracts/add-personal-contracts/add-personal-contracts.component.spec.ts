import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonalContractsComponent } from './add-personal-contracts.component';

describe('AddPersonalContractsComponent', () => {
  let component: AddPersonalContractsComponent;
  let fixture: ComponentFixture<AddPersonalContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonalContractsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonalContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
