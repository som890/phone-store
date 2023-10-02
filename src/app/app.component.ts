import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './_service/user-auth.service';
import { Product } from '../app/_model/product.model';
import { Router } from '@angular/router';
import { UserService } from './_service/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private userAuthService: UserAuthService, 
    private router: Router, 
    public userService: UserService) {}

  ngOnInit(): void { }
  
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
}
