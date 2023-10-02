import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  message: any;
  constructor(private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService) { }

  ngOnInit(): void {
    this.forUser();
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }
  public isUser() {
    this.userAuthService.isUser();
  }

  forUser() {
    this.userService.forUser().subscribe(
      (data) => {
        console.log(data);
        this.message = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}