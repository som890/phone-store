import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  hidePassword = true;

  constructor(private userService: UserService, 
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {}

  public register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['/login'])
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    )
    // Hiển thị thông báo thành công
    this.toastr.success('Bạn đã đăng ký tài khoản thành công', 'Thành công');
  }
  public togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

}
