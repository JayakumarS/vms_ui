import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIdentifiersLibraryComponent } from './add-identifiers-library.component';

describe('AddIdentifiersLibraryComponent', () => {
  let component: AddIdentifiersLibraryComponent;
  let fixture: ComponentFixture<AddIdentifiersLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIdentifiersLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIdentifiersLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
