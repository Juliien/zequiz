import { TestBed } from '@angular/core/testing';

import { ScienceService } from './science.service';

describe('ScienceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScienceService = TestBed.get(ScienceService);
    expect(service).toBeTruthy();
  });
});
