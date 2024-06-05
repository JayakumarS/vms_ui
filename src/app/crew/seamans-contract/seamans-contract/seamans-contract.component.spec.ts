import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeamansContractComponent } from './seamans-contract.component';

describe('SeamansContractComponent', () => {
  let component: SeamansContractComponent;
  let fixture: ComponentFixture<SeamansContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeamansContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeamansContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
