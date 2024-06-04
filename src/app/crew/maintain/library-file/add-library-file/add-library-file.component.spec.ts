import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLibraryFileComponent } from './add-library-file.component';

describe('AddLibraryFileComponent', () => {
  let component: AddLibraryFileComponent;
  let fixture: ComponentFixture<AddLibraryFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLibraryFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLibraryFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
