import { TestBed } from '@angular/core/testing';

import { PAndIService } from './p-and-i.service';

describe('PAndIService', () => {
  let service: PAndIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PAndIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
