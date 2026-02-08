import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateId } from '../../shared/genericFunction';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})


export class SignupComponent {
  signupForm!: FormGroup;
  erreureMsg = "";
  path!: string;
  file : any;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.path = this.router.url;
    console.log("here is actual path /", this.path);
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    })
  }

  signUp() {
    let user = this.signupForm.value;
    user.role = (this.path == "/signup") ? "client " : "admin";
    console.log("here is user object", user);

    this.userService.signup(user,this.file).subscribe(
      (res) => {
        console.log("here is response after adedd ", res);
        if (res.msg == "2") {
          this.erreureMsg = "user already Existe";
        } else if (res.msg == "3") {
          this.erreureMsg = "user not saved";
        } else {
          this.router.navigate(['signin']);
        }
      }
    );

  }

  onImageSelected(evt: Event) {
    const inputElement = evt.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
       this.file = inputElement.files[0];
     

    }
  }

}
