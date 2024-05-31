import { TestBed } from '@angular/core/testing';

import { UserrightsnewService } from './userrightsnew.service';

describe('UserrightsnewService', () => {
  let service: UserrightsnewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserrightsnewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
