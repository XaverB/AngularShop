import { TestBed } from '@angular/core/testing';

import { DiscountActionStoreService } from './discount-action-store.service';

describe('DiscountActionStoreService', () => {
  let service: DiscountActionStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountActionStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
