import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrewPromotionComponent } from './add-crew-promotion.component';

describe('AddCrewPromotionComponent', () => {
  let component: AddCrewPromotionComponent;
  let fixture: ComponentFixture<AddCrewPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCrewPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCrewPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
