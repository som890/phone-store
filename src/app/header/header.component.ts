import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewProductComponent } from '../add-new-product/add-new-product.component';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private userAuthService: UserAuthService, 
              private router: Router, 
              public userService: UserService,
              private dialog: MatDialog) {}

  productDetails: Product[] = [];
  //showCart = false;
  displayedColumns: string[] = ['Image','Name'];
  opened = false;
  @ViewChild('cartContainer')
  cartContainer!: ElementRef;
  isInsideCart = false;


  ngOnInit(): void { }

  product: Product = {
    productId:0,
    productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productImages:[]
  }
  
  openNewProductDialog() {
    this.dialog.open(AddNewProductComponent ,{
      width: '880px',
      data: {product : this.product}
    })
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }
  
  @HostListener('mouseenter', ['$event'])
  onCartEnter(event: MouseEvent) {
    this.isInsideCart = true;
    this.showCart();
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }
  public isUser() {
    this.userAuthService.isUser();
  }
  
  @HostListener('mouseleave', ['$event'])
  onCartLeave(event: MouseEvent) {
    if (!this.isInsideCart) {
      this.hideCart();
    }
  }

  @HostListener('mouseenter', ['$event'])
  onContainerEnter(event: MouseEvent) {
    this.isInsideCart = true;
  }

  @HostListener('mouseleave', ['$event'])
  onContainerLeave(event: MouseEvent) {
    this.isInsideCart = false;
    this.hideCart();
  }

  private showCart() {
    this.cartContainer.nativeElement.style.display = 'block';
  }

  private hideCart() {
    this.cartContainer.nativeElement.style.display = 'none';
  }

}
