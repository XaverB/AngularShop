import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountOverviewComponent } from './admin-discount-overview.component';

describe('AdminDiscountOverviewComponent', () => {
  let component: AdminDiscountOverviewComponent;
  let fixture: ComponentFixture<AdminDiscountOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscountOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
