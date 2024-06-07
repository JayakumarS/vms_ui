import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselsParticularsComponent } from './list-vessels-particulars.component';

describe('ListVesselsParticularsComponent', () => {
  let component: ListVesselsParticularsComponent;
  let fixture: ComponentFixture<ListVesselsParticularsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselsParticularsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselsParticularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
