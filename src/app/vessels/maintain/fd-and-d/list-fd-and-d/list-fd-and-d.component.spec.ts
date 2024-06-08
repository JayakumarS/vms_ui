import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFdAndDComponent } from './list-fd-and-d.component';

describe('ListFdAndDComponent', () => {
  let component: ListFdAndDComponent;
  let fixture: ComponentFixture<ListFdAndDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFdAndDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFdAndDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
