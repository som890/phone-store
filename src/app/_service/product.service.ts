import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderComponent } from '../my-order/my-order.component';
import { Observable } from 'rxjs';
import { MyOrderDetails } from '../_model/my-order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public addProduct(product: FormData) {
    return this.http.post<Product>('http://localhost:9090/addNewProduct', product)
  }

  public getAllProducts(pageNumber: number, searchKey: string = ""){
    return this.http.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+ pageNumber+"&searchKey="+ searchKey);
    
    }
  public deleteProduct(productId: number) {
    return this.http.delete("http://localhost:9090/deleteProductsDetails/" + productId)
  }
  public getProductDetailsById(productId: number) {
    return this.http.get<Product>("http://localhost:9090/getProductDetailsById/"+ productId)
    }
    public getProductDetails(isSingleProductCheckOut: any, productId: any) {
      return this.http.get<Product[]>("http://localhost:9090/getProductDetails/"+ isSingleProductCheckOut + "/" + productId);
    }
    public placeOrder(orderDetails: OrderDetails, isCartCheckout:boolean) {
     return this.http.post("http://localhost:9090/placeOrder/" + isCartCheckout, orderDetails);
    }
    public addToCart(productId: any) {
      return this.http.get("http://localhost:9090/addToCart/"+ productId)
    }
    public getCartDetails() {
      return this.http.get("http://localhost:9090/getCartDetails");
    }
    public deleteCartItem(cardId:number) {
      return this.http.delete("http://localhost:9090/deleteCartItem/"+ cardId)
    }
    public getOrderDetails(): Observable<MyOrderDetails[]> {
      return this.http.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
    }
    public getAllOrderDetailsForAdmin(status: string): Observable<MyOrderDetails[]> {
      return this.http.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails/"+ status);
    }
    public markOrderAsDelivered(orderId: number) {
      return this.http.get("http://localhost:9090/markOrderAsDelevered/" + orderId)
    }
}
