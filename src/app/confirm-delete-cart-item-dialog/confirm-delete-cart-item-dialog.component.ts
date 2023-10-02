import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-cart-item-dialog',
  templateUrl: './confirm-delete-cart-item-dialog.component.html',
  styleUrls: ['./confirm-delete-cart-item-dialog.component.css']
})
export class ConfirmDeleteCartItemDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<ConfirmDeleteCartItemDialogComponent>
  ) {}

  // Xử lý khi người dùng xác nhận xóa
  onConfirmClick(): void {
    this.dialogRef.close(true); // Đóng dialog và trả về true để xác nhận xóa
  }

  // Xử lý khi người dùng hủy bỏ
  onCancelClick(): void {
    this.dialogRef.close(false); // Đóng dialog và trả về false để hủy bỏ
  }
}
