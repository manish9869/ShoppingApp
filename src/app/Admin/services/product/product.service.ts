import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + '/product';

@Injectable({ providedIn: 'root' })
export class ProductService {


  constructor(public http: HttpClient, public router: Router) { }


}
