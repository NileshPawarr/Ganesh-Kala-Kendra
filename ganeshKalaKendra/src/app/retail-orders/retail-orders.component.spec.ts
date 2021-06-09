import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailOrdersComponent } from './retail-orders.component';

describe('RetailOrdersComponent', () => {
  let component: RetailOrdersComponent;
  let fixture: ComponentFixture<RetailOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
