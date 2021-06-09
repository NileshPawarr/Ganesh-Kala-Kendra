import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesaleOrdersComponent } from './wholesale-orders.component';

describe('OrdersComponent', () => {
  let component: WholesaleOrdersComponent;
  let fixture: ComponentFixture<WholesaleOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholesaleOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesaleOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
