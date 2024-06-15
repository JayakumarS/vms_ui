import { TestBed } from '@angular/core/testing';

import { MultiSeamenSignOffService } from './multi-seamen-sign-off.service';

describe('MultiSeamenSignOffService', () => {
  let service: MultiSeamenSignOffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiSeamenSignOffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
