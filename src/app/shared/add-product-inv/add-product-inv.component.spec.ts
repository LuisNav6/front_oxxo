import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductInvComponent } from './add-product-inv.component';

describe('AddProductInvComponent', () => {
  let component: AddProductInvComponent;
  let fixture: ComponentFixture<AddProductInvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductInvComponent]
    });
    fixture = TestBed.createComponent(AddProductInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
