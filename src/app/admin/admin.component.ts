import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_service/user-auth.service';
import { Product } from '../_model/product.model';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  constructor(private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private dialog: MatDialog) { }

  ngOnInit(): void { }

  product: Product = {
    productId: 0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }
}
