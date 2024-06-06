import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCrewPromotionComponent } from './list-crew-promotion.component';

describe('ListCrewPromotionComponent', () => {
  let component: ListCrewPromotionComponent;
  let fixture: ComponentFixture<ListCrewPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCrewPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCrewPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
