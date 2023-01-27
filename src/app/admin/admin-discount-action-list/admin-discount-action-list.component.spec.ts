import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountActionListComponent } from './admin-discount-action-list.component';

describe('AdminDiscountActionListComponent', () => {
  let component: AdminDiscountActionListComponent;
  let fixture: ComponentFixture<AdminDiscountActionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscountActionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
