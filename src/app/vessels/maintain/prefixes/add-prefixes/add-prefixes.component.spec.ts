import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrefixesComponent } from './add-prefixes.component';

describe('AddPrefixesComponent', () => {
  let component: AddPrefixesComponent;
  let fixture: ComponentFixture<AddPrefixesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrefixesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrefixesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
