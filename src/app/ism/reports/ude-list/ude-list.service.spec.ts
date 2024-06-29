import { TestBed } from '@angular/core/testing';

import { UdeListService } from './ude-list.service';

describe('UdeListService', () => {
  let service: UdeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UdeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
