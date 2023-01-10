import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountListItemComponent } from './discount-list-item.component';

describe('DiscountListItemComponent', () => {
  let component: DiscountListItemComponent;
  let fixture: ComponentFixture<DiscountListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
