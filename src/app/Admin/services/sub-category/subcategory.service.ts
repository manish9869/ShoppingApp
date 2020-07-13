import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({ providedIn: 'root' })
export class SubCategoryService {
  constructor(public http: HttpClient, public router: Router) { }




}
