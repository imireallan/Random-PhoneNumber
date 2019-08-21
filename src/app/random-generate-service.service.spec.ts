import { TestBed } from '@angular/core/testing';

import { RandomGenerateServiceService } from './random-generate-service.service';

describe('RandomGenerateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomGenerateServiceService = TestBed.get(RandomGenerateServiceService);
    expect(service).toBeTruthy();
  });
});
