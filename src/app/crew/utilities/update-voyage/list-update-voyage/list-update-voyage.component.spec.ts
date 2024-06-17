import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUpdateVoyageComponent } from './list-update-voyage.component';

describe('ListUpdateVoyageComponent', () => {
  let component: ListUpdateVoyageComponent;
  let fixture: ComponentFixture<ListUpdateVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUpdateVoyageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUpdateVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
