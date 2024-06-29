import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPandiComponent } from './list-pandi.component';

describe('ListPandiComponent', () => {
  let component: ListPandiComponent;
  let fixture: ComponentFixture<ListPandiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPandiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
