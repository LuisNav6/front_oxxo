import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductInvComponent } from './update-product-inv.component';

describe('UpdateProductInvComponent', () => {
  let component: UpdateProductInvComponent;
  let fixture: ComponentFixture<UpdateProductInvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductInvComponent]
    });
    fixture = TestBed.createComponent(UpdateProductInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
