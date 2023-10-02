import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit{

  productDetails: Product[] = [];
  isSingleProductCheckOut: any = '';

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }
  constructor(private activatedRoute: ActivatedRoute, 
              private productService: ProductService, 
              private router: Router,
              private toastr: ToastrService){}
  ngOnInit(): void {
   this.productDetails =  this.activatedRoute.snapshot.data['productDetails'];

   this.isSingleProductCheckOut = this.activatedRoute.snapshot.paramMap.get('isSingleProductCheckOut');

   this.productDetails.forEach(
    x => this.orderDetails.orderProductQuantityList.push(
      {productId: x.productId, quantity: 1}
    )
   );
   console.log(this.productDetails);
   console.log(this.orderDetails);
  }

  placeForm(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckOut).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        this.router.navigate(['/orderConfirm'])
      }, (err) => {
        console.log(err);
      }
    )
     // Hiển thị thông báo thành công
     this.toastr.success('Bạn đã đặt hàng thành công! Vui lòng chờ 2-3 ngày', 'Đăt thành công');
  }
  getQuantityForProduct(productId: number | undefined) {
    const filteredQuantity = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
      return filteredQuantity[0].quantity;
  }

  getCalculatedTotal(productId: any, productDiscountedPrice: any) {
    const filteredQuantity = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filteredQuantity[0].quantity * productDiscountedPrice;
  }


  onQuantityChanged(quantity: any, productId: any) {
    const orderProduct = this.orderDetails.orderProductQuantityList.find(
      (orderProduct) => orderProduct.productId === productId
    );
  
    if (orderProduct) {
      orderProduct.quantity = quantity;
    } else {
      // Xử lý trường hợp không tìm thấy sản phẩm với productId tương ứng.
      // Có thể thông báo lỗi hoặc thực hiện xử lý tùy thuộc vào yêu cầu của bạn.
    }
  }
  

  getCalculatedGrandTotal() {

    let grandTotal = 0; 
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
         let price: any = 0;
         price = this.productDetails.filter(product=>product.productId === productQuantity.productId)[0].productDiscountedPrice
         grandTotal = grandTotal + price*productQuantity.quantity;
      }
    );

    return grandTotal;

  }
  formatCurrency(amount: any) {
    // Sử dụng hàm toLocaleString() để định dạng số và thêm ký hiệu tiền tệ "đ"
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

}
