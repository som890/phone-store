import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_service/user.service';
import { UserAuthService } from '../_service/user-auth.service';
import { Route, Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword = true;

  constructor(private userSerive: UserService,
              private userAuthServie: UserAuthService, 
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void { }

  login(loginForm: NgForm) {
    this.userSerive.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthServie.setRoles(response.user.role);
        this.userAuthServie.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role == 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
           // Hiển thị thông báo thành công
          this.toastr.success('Bạn đã đăng nhập thành công', 'Thành công');
      },
      (error) => {
        console.log(error)
      }
    )
 
  }

  register() {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

}
