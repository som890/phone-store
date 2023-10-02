import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProccesingService } from '../_service/image-proccesing.service';
import { map } from 'rxjs/operators';
import { Product } from '../_model/product.model';
import { Router } from '@angular/router';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { AddNewProductComponent } from '../add-new-product/add-new-product.component';


@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Name', 'description', 'Product Discounted Price', 'Product Acutal Price', 'Actions'];

  pageNumber: number = 0;
  showTable = false;
  showMoreProductButton = false;
  hasLoadedProducts: boolean = false;

  constructor(private productService:ProductService, public imagesDialog: MatDialog, 
              private imageProcessingService:ImageProccesingService,
              private router: Router, private dialog: MatDialog ){ }

  ngOnInit(): void {

    if (!this.hasLoadedProducts) {
      this.getAllProducts();
      this.hasLoadedProducts = true;
    }
  }
  searchByKeyWord(searchkeyword: any){
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }
  
  public getAllProducts(searchKeyWord: string = "") {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKeyWord).pipe(
      map((x:Product[], i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))
    )
    .subscribe(
    (resp: Product[]) => {
      console.log(resp);
       resp.forEach(product => this.productDetails.push(product));
      console.log(("msg" + this.productDetails));
      this.showTable = true;
      //this.productDetails = resp;
      if(resp.length == 12) {
        this.showMoreProductButton = true;
      }else {
        this.showMoreProductButton = false;
      }
    }, (error:HttpErrorResponse)=>{
      console.log(error);
    }
    );
  }

  openDeleteConfirmationDialog(productId: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: { message: 'Bạn có chắc chắn muốn xóa sản phẩm này?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Gọi deleteProduct và sau khi xóa thành công, cập nhật danh sách
        this.productService.deleteProduct(productId).subscribe(
          (resp) => {
            this.productDetails = this.productDetails.filter(product => product.productId !== productId);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      }
    });
  }
  

  showImages(product:Product){
    console.log(product);
    
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height:'500px',
      width:'800px'
    });

  }
  updateProductDetails(productId: number) {
    //this.router.navigate(['/addNewProduct',{productId: productId}]); 
    this.dialog.open(AddNewProductComponent, {
        width: '900px',
        data: { product: productId}
    }
    );

  }
  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }
  formatCurrency(amount: any) {
    // Sử dụng hàm toLocaleString() để định dạng số và thêm ký hiệu tiền tệ "đ"
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
  
}