import { TestBed } from '@angular/core/testing';

import { DiscountRuleStoreService } from './discount-rule-store.service';

describe('DiscountRuleStoreService', () => {
  let service: DiscountRuleStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountRuleStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
