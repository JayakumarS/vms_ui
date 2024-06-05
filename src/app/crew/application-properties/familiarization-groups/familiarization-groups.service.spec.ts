import { TestBed } from '@angular/core/testing';

import { FamiliarizationGroupsService } from './familiarization-groups.service';

describe('FamiliarizationGroupsService', () => {
  let service: FamiliarizationGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamiliarizationGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
