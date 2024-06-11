import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBunkerTanksComponent } from './list-bunker-tanks.component';

describe('ListBunkerTanksComponent', () => {
  let component: ListBunkerTanksComponent;
  let fixture: ComponentFixture<ListBunkerTanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBunkerTanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBunkerTanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
