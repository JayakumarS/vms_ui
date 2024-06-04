import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractsNEEComponent } from './add-contracts-nee.component';

describe('AddContractsNEEComponent', () => {
  let component: AddContractsNEEComponent;
  let fixture: ComponentFixture<AddContractsNEEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContractsNEEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContractsNEEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
