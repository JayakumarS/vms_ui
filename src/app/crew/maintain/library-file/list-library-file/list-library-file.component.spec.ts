import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibraryFileComponent } from './list-library-file.component';

describe('ListLibraryFileComponent', () => {
  let component: ListLibraryFileComponent;
  let fixture: ComponentFixture<ListLibraryFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLibraryFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLibraryFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
