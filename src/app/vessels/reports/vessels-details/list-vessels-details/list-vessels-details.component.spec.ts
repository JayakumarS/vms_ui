import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselsDetailsComponent } from './list-vessels-details.component';

describe('ListVesselsDetailsComponent', () => {
  let component: ListVesselsDetailsComponent;
  let fixture: ComponentFixture<ListVesselsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
