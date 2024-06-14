import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandedGoodsControlPanelComponent } from './landed-goods-control-panel.component';

describe('LandedGoodsControlPanelComponent', () => {
  let component: LandedGoodsControlPanelComponent;
  let fixture: ComponentFixture<LandedGoodsControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandedGoodsControlPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandedGoodsControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
