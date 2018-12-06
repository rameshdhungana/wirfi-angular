import { TestBed, inject } from '@angular/core/testing';

import { ImpersonateService } from './impersonate.service';

describe('ImpersonateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImpersonateService]
    });
  });

  it('should be created', inject([ImpersonateService], (service: ImpersonateService) => {
    expect(service).toBeTruthy();
  }));
});
