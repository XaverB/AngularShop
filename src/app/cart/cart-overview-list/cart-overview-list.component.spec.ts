import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOverviewListComponent } from './cart-overview-list.component';

describe('CartOverviewListComponent', () => {
  let component: CartOverviewListComponent;
  let fixture: ComponentFixture<CartOverviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartOverviewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartOverviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
