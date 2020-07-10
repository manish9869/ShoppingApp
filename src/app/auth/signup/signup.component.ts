import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authservice: AuthService) { }

  ngOnInit() {
  }

  onSignupClick(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.authservice.createUser(
      form.value.email,
      form.value.password,
      form.value.mobile,
      form.value.username);



  }

}
