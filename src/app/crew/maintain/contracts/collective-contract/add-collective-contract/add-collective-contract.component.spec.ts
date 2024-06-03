import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectiveContractComponent } from './add-collective-contract.component';

describe('AddCollectiveContractComponent', () => {
  let component: AddCollectiveContractComponent;
  let fixture: ComponentFixture<AddCollectiveContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollectiveContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCollectiveContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
