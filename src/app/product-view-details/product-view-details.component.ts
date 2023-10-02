import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{

  product!: Product;
  selectedProductIndex = 0;
  durationInSeconds = 5;
  
  constructor(private activedRoute: ActivatedRoute, private router: Router,
              private productService: ProductService,
              private snackBar: MatSnackBar, 
              private toastr: ToastrService){}
  
  ngOnInit(): void {
    this.product = this.activedRoute.snapshot.data['product'];
    console.log(this.product);
  }
  changeIndex(index: number) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId: any) {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckOut: true, id: productId 
    }]);
  }

  addToCart(productId: any) {
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
       // Hiển thị thông báo thành công
       this.toastr.success('Bạn đã thêm sản phẩm vào giỏ hàng thành công', 'Thành công');
      }, (error) => {
        console.log(error);
      }
    )
       
  }
  formatCurrency(amount: any) {
    // Sử dụng hàm toLocaleString() để định dạng số và thêm ký hiệu tiền tệ "đ"
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

}
