import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVesselsParticularsComponent } from './add-vessels-particulars.component';

describe('AddVesselsParticularsComponent', () => {
  let component: AddVesselsParticularsComponent;
  let fixture: ComponentFixture<AddVesselsParticularsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVesselsParticularsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVesselsParticularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
