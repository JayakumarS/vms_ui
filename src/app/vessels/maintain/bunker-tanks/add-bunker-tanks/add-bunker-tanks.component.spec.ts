import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBunkerTanksComponent } from './add-bunker-tanks.component';

describe('AddBunkerTanksComponent', () => {
  let component: AddBunkerTanksComponent;
  let fixture: ComponentFixture<AddBunkerTanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBunkerTanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBunkerTanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
