import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCrewFamiliarizationComponent } from './list-crew-familiarization.component';

describe('ListCrewFamiliarizationComponent', () => {
  let component: ListCrewFamiliarizationComponent;
  let fixture: ComponentFixture<ListCrewFamiliarizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCrewFamiliarizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCrewFamiliarizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
