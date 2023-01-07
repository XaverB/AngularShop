import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOverviewListItemComponent } from './cart-overview-list-item.component';

describe('CartOverviewListItemComponent', () => {
  let component: CartOverviewListItemComponent;
  let fixture: ComponentFixture<CartOverviewListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartOverviewListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartOverviewListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
