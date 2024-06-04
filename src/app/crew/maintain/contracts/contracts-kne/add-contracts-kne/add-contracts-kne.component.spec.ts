import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractsKNEComponent } from './add-contracts-kne.component';

describe('AddContractsKNEComponent', () => {
  let component: AddContractsKNEComponent;
  let fixture: ComponentFixture<AddContractsKNEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContractsKNEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContractsKNEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
