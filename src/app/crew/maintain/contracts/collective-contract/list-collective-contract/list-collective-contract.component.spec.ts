import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCollectiveContractComponent } from './list-collective-contract.component';

describe('ListCollectiveContractComponent', () => {
  let component: ListCollectiveContractComponent;
  let fixture: ComponentFixture<ListCollectiveContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCollectiveContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCollectiveContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
