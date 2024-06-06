import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFleetsComponent } from './list-fleets.component';

describe('ListFleetsComponent', () => {
  let component: ListFleetsComponent;
  let fixture: ComponentFixture<ListFleetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFleetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFleetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
