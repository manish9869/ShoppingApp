import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserSignupData } from './signup-data.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  createUser(email: string, password: string, mobile: string, username: string) {

    const UserSignupData: UserSignupData = { email: email, password: password, mobile: mobile, name: username };


    this.http.post(BACKEND_URL + '/signup', UserSignupData).subscribe(result => {

    }, error => {

    });

  }

}
