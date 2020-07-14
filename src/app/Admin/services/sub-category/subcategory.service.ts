import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCategoryData } from './sub-category-data.model';
import { environment } from 'src/environments/environment';


const BACKEND_URL = environment.apiUrl + '/category';

@Injectable({ providedIn: 'root' })
export class SubCategoryService {
  constructor(public http: HttpClient, public router: Router) { }

  createSubCategory(subCategoryName: string, categoryDescrition: string) {
    const categoryData: SubCategoryData = {
      _id: null,
      categoryId:null,
      subCategoryName: subCategoryName,
      subCategoryDescription: categoryDescrition,
      IsActive:true,
      EnteredBy: null,
      WhenEntered: new Date(),
      ModifiedBy: null,
      WhenModified: null,
    };
    return this.http.post(BACKEND_URL + '/addSubcategory', categoryData);
  }


}
