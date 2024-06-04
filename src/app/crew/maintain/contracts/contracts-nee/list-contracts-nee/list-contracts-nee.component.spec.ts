import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContractsNEEComponent } from './list-contracts-nee.component';

describe('ListContractsNEEComponent', () => {
  let component: ListContractsNEEComponent;
  let fixture: ComponentFixture<ListContractsNEEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContractsNEEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContractsNEEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
