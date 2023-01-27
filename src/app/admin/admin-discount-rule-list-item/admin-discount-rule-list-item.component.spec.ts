import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountRuleListItemComponent } from './admin-discount-rule-list-item.component';

describe('AdminDiscountRuleListItemComponent', () => {
  let component: AdminDiscountRuleListItemComponent;
  let fixture: ComponentFixture<AdminDiscountRuleListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscountRuleListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountRuleListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
