import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductPopupComponent } from './new-product-popup.component';

describe('NewProductPopupComponent', () => {
  let component: NewProductPopupComponent;
  let fixture: ComponentFixture<NewProductPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
