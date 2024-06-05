import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonalContractsComponent } from './list-personal-contracts.component';

describe('ListPersonalContractsComponent', () => {
  let component: ListPersonalContractsComponent;
  let fixture: ComponentFixture<ListPersonalContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPersonalContractsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPersonalContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
