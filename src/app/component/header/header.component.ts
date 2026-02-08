import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { jwtDecode } from 'jwt-decode';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
user:any={};
constructor(
    private router: Router,
    ) { }

isloggedIn():boolean{
let token = sessionStorage.getItem("token");
if (token) {
this.user=jwtDecode(token);
}
return !!token;

}

logout(){
  sessionStorage.removeItem("token");
this.router.navigate([""]);
}


}
