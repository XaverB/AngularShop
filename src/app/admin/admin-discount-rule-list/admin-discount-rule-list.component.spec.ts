import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountRuleListComponent } from './admin-discount-rule-list.component';

describe('AdminDiscountRuleListComponent', () => {
  let component: AdminDiscountRuleListComponent;
  let fixture: ComponentFixture<AdminDiscountRuleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscountRuleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountRuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
