import { TestBed, inject } from '@angular/core/testing';

import { GetCurrentLocationService } from './get-current-location.service';

describe('GetCurrentLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCurrentLocationService]
    });
  });

  it('should be created', inject([GetCurrentLocationService], (service: GetCurrentLocationService) => {
    expect(service).toBeTruthy();
  }));
});
