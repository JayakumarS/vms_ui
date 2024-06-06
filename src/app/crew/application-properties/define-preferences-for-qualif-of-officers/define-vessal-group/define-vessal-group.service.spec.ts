import { TestBed } from '@angular/core/testing';

import { DefineVessalGroupService } from './define-vessal-group.service';

describe('DefineVessalGroupService', () => {
  let service: DefineVessalGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineVessalGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
