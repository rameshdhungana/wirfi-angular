import { TestBed, inject } from '@angular/core/testing';

import { FranchiseTypeService } from './franchise-type.service';

describe('FranchiseTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FranchiseTypeService]
    });
  });

  it('should be created', inject([FranchiseTypeService], (service: FranchiseTypeService) => {
    expect(service).toBeTruthy();
  }));
});
