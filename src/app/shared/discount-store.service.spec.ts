import { TestBed } from '@angular/core/testing';

import { DiscountStoreService } from './discount-store.service';

describe('DiscountStoreService', () => {
  let service: DiscountStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
