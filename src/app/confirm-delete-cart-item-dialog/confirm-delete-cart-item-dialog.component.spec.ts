import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteCartItemDialogComponent } from './confirm-delete-cart-item-dialog.component';

describe('ConfirmDeleteCartItemDialogComponent', () => {
  let component: ConfirmDeleteCartItemDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteCartItemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteCartItemDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmDeleteCartItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
