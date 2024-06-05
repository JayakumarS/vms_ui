import { TestBed } from '@angular/core/testing';

import { FamiliarizationItemsService } from './familiarization-items.service';

describe('FamiliarizationItemsService', () => {
  let service: FamiliarizationItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamiliarizationItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
