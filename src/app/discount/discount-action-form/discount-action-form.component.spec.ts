import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountActionFormComponent } from './discount-action-form.component';

describe('DiscountActionFormComponent', () => {
  let component: DiscountActionFormComponent;
  let fixture: ComponentFixture<DiscountActionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountActionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
