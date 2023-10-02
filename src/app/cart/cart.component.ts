import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteCartItemDialogComponent } from '../confirm-delete-cart-item-dialog/confirm-delete-cart-item-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../_model/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['Image','Name','description', 'Price', 'Discounted Price', 'Actions'];
  cartDeatils: any[] = [];

  
  ngOnInit(): void {
    this.getCartDetails();
    console.log(this.cartDeatils.map(element => 
                                      element.product.productImages.map( (image: { url: any; }) => image.url)));
  }

  constructor(private productService: ProductService, 
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar, 
              private toastr: ToastrService) { }

  public getCartDetails() {
 
    this.productService.getCartDetails().subscribe(
      (response: any) => {
        console.log(response);
        this.cartDeatils = response;
      }, (error) => {
        console.log(error)
      }
    )
  }

  checkOut() {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckOut: false, id: 0
    }]);
  }

  delete(cartId: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteCartItemDialogComponent, {
      width: '250px', // Điều chỉnh kích thước dialog theo ý muốn
      data: { message: 'Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.productService.deleteCartItem(cartId).subscribe(
          (response) => {
            console.log(response);
            this.getCartDetails();
             // Hiển thị thông báo thành công
            this.toastr.success('Bạn đã xóa sản phẩm khỏi giỏ hàng', 'Xóa thành công');

          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
  formatCurrency(amount: any) {
    // Sử dụng hàm toLocaleString() để định dạng số và thêm ký hiệu tiền tệ "đ"
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

}
