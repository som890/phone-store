import { Product } from "./product.model";

export interface MyOrderDetails {
    orderId: number,
    orderFullName: string,
    orderFullAddress: string,
    orderContactNumber: string,
    orderAlternateContactNumber: string,
    orderAmount: number,
    orderStatus: string,
    product: Product,
    user: any

}