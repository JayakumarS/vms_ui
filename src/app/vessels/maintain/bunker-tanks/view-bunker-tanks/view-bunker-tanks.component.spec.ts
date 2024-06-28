import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBunkerTanksComponent } from './view-bunker-tanks.component';

describe('ViewBunkerTanksComponent', () => {
  let component: ViewBunkerTanksComponent;
  let fixture: ComponentFixture<ViewBunkerTanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBunkerTanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBunkerTanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
