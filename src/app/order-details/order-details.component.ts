import { Component, OnInit } from '@angular/core';
import { MyOrderDetails } from '../_model/my-order.model';
import { ProductService } from '../_service/product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  displayedColumns: string[] = ['Id','Image', 'Product Name', 'Name', 'Address', 'Contact number', 'Status', 'Action'];
  dataSource: any[] = [];
  status: string = 'All';

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }
  constructor(private productService: ProductService,
              private toastr: ToastrService) {}

  public getAllOrderDetailsForAdmin(statusParamamter: string) {
    this.productService.getAllOrderDetailsForAdmin(statusParamamter).subscribe(
      (resp) => {
        this.dataSource = resp;
        console.log(resp);
      }, (error) => {
        console.log(error);
      }
    )
  }
  markOrderAsDelivered(orderId: number) {
    console.log(orderId);
    this.productService.markOrderAsDelivered(orderId).subscribe(
      (resp) => {
        console.log(resp);
        this.getAllOrderDetailsForAdmin(this.status);
      }, error => {
        console.log(error);
      }
    )
      // Hiển thị thông báo thành công
      this.toastr.success('Kích hoạt trạng thái thành công', 'Thành công');
  }
}
