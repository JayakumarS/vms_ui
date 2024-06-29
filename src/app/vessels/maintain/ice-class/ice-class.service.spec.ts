import { TestBed } from '@angular/core/testing';

import { IceClassService } from './ice-class.service';

describe('IceClassService', () => {
  let service: IceClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IceClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
