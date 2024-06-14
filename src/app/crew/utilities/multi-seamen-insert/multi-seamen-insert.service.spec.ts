import { TestBed } from '@angular/core/testing';

import { MultiSeamenInsertService } from './multi-seamen-insert.service';

describe('MultiSeamenInsertService', () => {
  let service: MultiSeamenInsertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiSeamenInsertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
