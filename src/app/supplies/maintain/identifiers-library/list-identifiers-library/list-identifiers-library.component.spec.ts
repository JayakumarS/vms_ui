import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIdentifiersLibraryComponent } from './list-identifiers-library.component';

describe('ListIdentifiersLibraryComponent', () => {
  let component: ListIdentifiersLibraryComponent;
  let fixture: ComponentFixture<ListIdentifiersLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIdentifiersLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIdentifiersLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
