import { TestBed } from '@angular/core/testing';

import { CrewPromotionService } from './crew-promotion.service';

describe('CrewPromotionService', () => {
  let service: CrewPromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrewPromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
