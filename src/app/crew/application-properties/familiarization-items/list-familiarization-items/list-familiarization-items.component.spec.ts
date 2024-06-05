import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFamiliarizationItemsComponent } from './list-familiarization-items.component';

describe('ListFamiliarizationItemsComponent', () => {
  let component: ListFamiliarizationItemsComponent;
  let fixture: ComponentFixture<ListFamiliarizationItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFamiliarizationItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFamiliarizationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
