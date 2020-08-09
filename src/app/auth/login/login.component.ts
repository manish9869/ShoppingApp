import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  isloggedin: boolean = false;
  ngOnInit() {
    this.isloggedin = this.authService.isLoggedIn();
    if (this.authService.isLoggedIn()) {
      console.log(this.isloggedin);
      this.router.navigate(["admin/Category"]);
    }
  }

  onLoginClick(form: NgForm) {
    this.authService.login(form.value.email, form.value.password);
  }
}
