import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountRuleFormComponent } from './discount-rule-form.component';

describe('DiscountRuleFormComponent', () => {
  let component: DiscountRuleFormComponent;
  let fixture: ComponentFixture<DiscountRuleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountRuleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountRuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
