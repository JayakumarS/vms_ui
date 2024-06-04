import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContractsKNEComponent } from './list-contracts-kne.component';

describe('ListContractsKNEComponent', () => {
  let component: ListContractsKNEComponent;
  let fixture: ComponentFixture<ListContractsKNEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContractsKNEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContractsKNEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
