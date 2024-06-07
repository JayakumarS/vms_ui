import { TestBed } from '@angular/core/testing';

import { VessalParticularsService } from './vessal-particulars.service';

describe('VessalParticularsService', () => {
  let service: VessalParticularsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VessalParticularsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
