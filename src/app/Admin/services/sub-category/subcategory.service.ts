import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCategoryData } from './sub-category-data.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/subcategory';

@Injectable({ providedIn: 'root' })
export class SubCategoryService {

  private subcategoryData: SubCategoryData[] = [];
  private subcategoryDataUpdated = new Subject<{ subcategoryData: SubCategoryData[]; }>();

  constructor(public http: HttpClient, public router: Router) { }

  createSubCategory(categoryId: string, SubCategoryName: string, SubcategoryDescrition: string) {
    const categoryData: SubCategoryData = {
      _id: null,
      categoryId: categoryId,
      subcategoryName: SubCategoryName,
      subcategoryDescription: SubcategoryDescrition,
      IsActive: true,
      EnteredBy: null,
      WhenEntered: new Date(),
      ModifiedBy: null,
      WhenModified: null,
    };
    return this.http.post(BACKEND_URL + '/addsubcategory', categoryData);
  }

  getSubCategoryListdb() {

    this.http
      .get<{ message: string; subcategoryData: any; }>(
        BACKEND_URL
      )
      .subscribe(result => {
        this.subcategoryData = result.subcategoryData;
        this.subcategoryDataUpdated.next({
          subcategoryData: [...this.subcategoryData]
        });
      });
  }

  getSingleSubCategorydb(id: string) {
    return this.http
      .get<{ message: string; subcategoryData: SubCategoryData; }>(
        BACKEND_URL + '/' + id
      );
  }

  getSubCategoryUpdateListener() {
    return this.subcategoryDataUpdated.asObservable();
  }



  updateSubCategoryDb(subCategpryId: string, categoryid: string, SubCategoryName: string, SubCategoryDescription: string) {
    const subCategoryData: SubCategoryData = {
      _id: subCategpryId,
      categoryId: categoryid,
      subcategoryName: SubCategoryName,
      subcategoryDescription: SubCategoryDescription,
      IsActive: true,
      EnteredBy: null,
      WhenEntered: new Date(),
      ModifiedBy: null,
      WhenModified: null,
    };
    console.log(subCategoryData);
    return this.http.put(BACKEND_URL + '/' + subCategpryId, subCategoryData);
  }

  deleteSubCategory(Subcategoryid: string) {
    return this.http.delete(BACKEND_URL + '/' + Subcategoryid);
  }

}
