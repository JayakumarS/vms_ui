import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrefixesComponent } from './view-prefixes.component';

describe('ViewPrefixesComponent', () => {
  let component: ViewPrefixesComponent;
  let fixture: ComponentFixture<ViewPrefixesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPrefixesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPrefixesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
