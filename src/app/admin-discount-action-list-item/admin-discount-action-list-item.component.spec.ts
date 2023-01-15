import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountActionListItemComponent } from './admin-discount-action-list-item.component';

describe('AdminDiscountActionListItemComponent', () => {
  let component: AdminDiscountActionListItemComponent;
  let fixture: ComponentFixture<AdminDiscountActionListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscountActionListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountActionListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
