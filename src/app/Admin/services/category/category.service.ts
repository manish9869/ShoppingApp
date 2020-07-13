
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Subject } from 'rxjs';
import { CategoryData } from './category-data.model';

const BACKEND_URL = environment.apiUrl + '/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(public http: HttpClient, public router: Router) { }


  private categoryData: CategoryData[] = [];
  private categoryDataUpdated = new Subject<{ categoryData: CategoryData[]; }>();


  createCategory(categoryName: string, categoryDescrition: string) {
    const categoryData: CategoryData = {
      _id: null,
      categoryName: categoryName,
      categoryDescription: categoryDescrition,
    };
    return this.http.post(BACKEND_URL + '/addcategory', categoryData);
  }

  getCategoryUpdateListener() {
    return this.categoryDataUpdated.asObservable();
  }

  getCourseListdb() {
    this.http
      .get<{ message: string; categoryData: any; }>(
        BACKEND_URL
      )
      .subscribe(transformedPostData => {
        this.categoryData = transformedPostData.categoryData;
        this.categoryDataUpdated.next({
          categoryData: [...this.categoryData]
        });
      });
  }

  getSingleCourseListdb(id: string) {
    return this.http
      .get<{ message: string; categoryData: CategoryData; }>(
        BACKEND_URL + '/' + id
      );
  }

  updateCourseDb(categoryid: string, categoryName: string, categoryDescrition: string) {
    const CategoryData: CategoryData = {
      _id: categoryid,
      categoryName: categoryName,
      categoryDescription: categoryDescrition
    }
    return this.http.put(BACKEND_URL + '/' + categoryid, CategoryData);
  }

  deleteCategory(categoryid: string) {
    return this.http.delete(BACKEND_URL + '/' + categoryid);
  }


}
