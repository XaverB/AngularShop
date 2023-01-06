import { TestBed } from '@angular/core/testing';

import { AddAppKeyInterceptorInterceptor } from './add-app-key-interceptor.interceptor';

describe('AddAppKeyInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddAppKeyInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddAppKeyInterceptorInterceptor = TestBed.inject(AddAppKeyInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
