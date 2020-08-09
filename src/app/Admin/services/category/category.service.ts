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
  private categoryDataUpdated = new Subject<{ categoryData: CategoryData[] }>();

  private categpryProductNav = new Subject<{ categoryData: any[] }>();

  createCategory(categoryName: string, categoryDescrition: string, image: File) {


    const Data = new FormData();
    Data.append('categoryName', categoryName);
    Data.append('categoryDescription', categoryDescrition);
    Data.append('IsActive', 'true');
    Data.append('EnteredBy', '');
    Data.append('WhenEntered', new Date().toString());
    Data.append('ModifiedBy', '');
    Data.append('WhenModified', '');
    Data.append('image', image, image.name);


    console.log(Data);
    // const categoryData: CategoryData = {
    //   _id: null,
    //   categoryName: categoryName,
    //   categoryDescription: categoryDescrition,
    //   IsActive: true,
    //   EnteredBy: null,
    //   WhenEntered: new Date(),
    //   ModifiedBy: null,
    //   WhenModified: null,

    // };
    return this.http.post(BACKEND_URL + '/addcategory', Data);
  }

  getCategoryUpdateListener() {
    return this.categoryDataUpdated.asObservable();
  }

  getCategoryListdb() {
    this.http
      .get<{ message: string; categoryData: any }>(BACKEND_URL)
      .subscribe((transformedPostData) => {
        this.categoryData = transformedPostData.categoryData;
        this.categoryDataUpdated.next({
          categoryData: [...this.categoryData],
        });
      });
  }

  getActiveCategoryListdb() {
    this.http
      .get<{ message: string; categoryData: any }>(
        BACKEND_URL + '/getActiveCategories'
      )
      .subscribe((transformedPostData) => {
        this.categoryData = transformedPostData.categoryData;
        this.categoryDataUpdated.next({
          categoryData: [...this.categoryData],
        });
      });
  }

  getSingleCourseListdb(id: string) {
    return this.http.get<{ message: string; categoryData: CategoryData }>(
      BACKEND_URL + '/' + id
    );
  }

  updateCategoryDb(
    categoryid: string,
    categoryName: string,
    categoryDescrition: string, image: File
  ) {

    let Data: CategoryData | FormData;

    if (typeof image === 'object') {

      Data = new FormData();

      Data.append('_id', categoryid);
      Data.append('categoryName', categoryName);
      Data.append('categoryDescription', categoryDescrition);
      Data.append('IsActive', 'true');
      Data.append('EnteredBy', '');
      Data.append('WhenEntered', null);
      Data.append('ModifiedBy', '');
      Data.append('WhenModified', new Date().toString());
      Data.append('image', image, image.name);


    } else {


      Data = {
        _id: categoryid,
        categoryName: categoryName,
        categoryDescription: categoryDescrition,
        IsActive: true,
        image: image,
        EnteredBy: null,
        WhenEntered: null,
        ModifiedBy: null,
        WhenModified: new Date(),
      };
    }


    return this.http.put(BACKEND_URL + '/' + categoryid, Data);
  }

  deleteCategory(categoryid: string) {
    return this.http.delete(BACKEND_URL + '/' + categoryid);
  }

  UpdateCategoryStatus(categoryid: string, status: boolean) {
    const categoryData: CategoryData = {
      _id: categoryid,
      categoryName: null,
      categoryDescription: null,
      IsActive: status,
      EnteredBy: null,
      image: null,
      WhenEntered: null,
      ModifiedBy: null,
      WhenModified: new Date(),
    };
    return this.http.post(
      BACKEND_URL + '/updateStatus' + '/' + categoryid,
      categoryData
    );
  }



  getActiveCatProductList() {
    this.http
      .get<{ message: string; categoryData: any }>(
        BACKEND_URL + '/getCategpryProduct'
      )
      .subscribe((result) => {
        this.categoryData = result.categoryData;
        this.categpryProductNav.next({
          categoryData: [...this.categoryData],
        });
      });
  }


  getCategoryProductUpdateListener() {
    return this.categpryProductNav.asObservable();
  }


}
