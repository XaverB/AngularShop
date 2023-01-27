import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountListItemComponent } from './admin-discount-list-item.component';

describe('AdminDiscountListItemComponent', () => {
  let component: AdminDiscountListItemComponent;
  let fixture: ComponentFixture<AdminDiscountListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscountListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
