import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerPopupComponent } from './new-customer-popup.component';

describe('NewCustomerPopupComponent', () => {
  let component: NewCustomerPopupComponent;
  let fixture: ComponentFixture<NewCustomerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCustomerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
