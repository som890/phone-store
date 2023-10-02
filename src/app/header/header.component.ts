import { Component, HostListener, OnInit } from '@angular/core';
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

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }
  public isUser() {
    this.userAuthService.isUser();
  }
  
  @HostListener('mouseenter', ['$event'])
  onCartMouseEnter(event: any) {
    event.target.classList.add('is-active');
  }

  @HostListener('mouseleave', ['$event'])
  onCartMouseLeave(event: any) {
    event.target.classList.remove('is-active');
  }

}
