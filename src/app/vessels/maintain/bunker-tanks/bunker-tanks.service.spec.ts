import { TestBed } from '@angular/core/testing';

import { BunkerTanksService } from './bunker-tanks.service';

describe('BunkerTanksService', () => {
  let service: BunkerTanksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BunkerTanksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
