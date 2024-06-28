import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiValueComponent } from './multi-value.component';

describe('MultiValueComponent', () => {
  let component: MultiValueComponent;
  let fixture: ComponentFixture<MultiValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
