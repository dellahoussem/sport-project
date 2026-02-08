import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMsg!: string;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

 

  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required]],
    })
  }


  login() {
    console.log("here is user object", this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        console.log("here is response after login", res);
        if (res.msg != "3") {
          this.errorMsg = "please check your email/pwd";
        } else {
          sessionStorage.setItem("token", res.user);
          const decoded:any = jwtDecode(res.user);
          console.log("here is response after decodage", decoded);
          if (decoded.role == "admin") {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate([""]);
        }
         
        }
      }
    );
  }


}
