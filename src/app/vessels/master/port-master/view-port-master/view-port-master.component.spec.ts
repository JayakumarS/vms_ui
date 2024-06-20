import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPortMasterComponent } from './view-port-master.component';

describe('ViewPortMasterComponent', () => {
  let component: ViewPortMasterComponent;
  let fixture: ComponentFixture<ViewPortMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPortMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPortMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
