import { TestBed } from '@angular/core/testing';

import { UpdateVoyageService } from './update-voyage.service';

describe('UpdateVoyageService', () => {
  let service: UpdateVoyageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateVoyageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
