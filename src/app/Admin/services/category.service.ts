import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { debugOutputAstAsTypeScript } from "@angular/compiler";
import { CategoryData } from "../category-data.model";
import { environment } from "src/environments/environment";

const BACKEND_URL = environment.apiUrl + "/category";

@Injectable({ providedIn: "root" })
export class CategoryService {
  constructor(public http: HttpClient, public router: Router) {}

  createCategory(categoryName: string, categoryDescrition: string) {
    const categoryData: CategoryData = {
      CateoryName: categoryName,
      CategoryDescription: categoryDescrition,
    };

    this.http.post(BACKEND_URL + "/addcategory", categoryData).subscribe(
      (result) => {},
      (error) => {}
    );
  }
}
