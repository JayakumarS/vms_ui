import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamiliarizationItemsComponent } from './add-familiarization-items.component';

describe('AddFamiliarizationItemsComponent', () => {
  let component: AddFamiliarizationItemsComponent;
  let fixture: ComponentFixture<AddFamiliarizationItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFamiliarizationItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFamiliarizationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
