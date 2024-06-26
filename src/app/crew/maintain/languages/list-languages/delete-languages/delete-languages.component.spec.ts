import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLanguagesComponent } from './delete-languages.component';

describe('DeleteLanguagesComponent', () => {
  let component: DeleteLanguagesComponent;
  let fixture: ComponentFixture<DeleteLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLanguagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
