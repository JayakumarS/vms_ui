import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrefixesComponent } from './list-prefixes.component';

describe('ListPrefixesComponent', () => {
  let component: ListPrefixesComponent;
  let fixture: ComponentFixture<ListPrefixesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPrefixesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPrefixesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
