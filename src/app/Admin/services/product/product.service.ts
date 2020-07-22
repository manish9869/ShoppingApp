import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ProductData } from "src/app/Admin/services/product/product-data.model";

const BACKEND_URL = environment.apiUrl + "/product";

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(public http: HttpClient, public router: Router) {}

  saveProductsData(
    CategoryID: string,
    SubCategoryID: string,
    ProductName: string,
    ProductDescription: string,
    Keywords: string,
    MRPrice: string,
    SellingPrice: string,
    flavor: string,
    weight: string,
    images: File[]
  ) {
    // const productData1: ProductData = {
    //   _id: null,
    //   categoryId: CategoryID,
    //   subcategoryId: SubCategoryID,
    //   productName: ProductName,
    //   productDescription: ProductDescription,
    //   keywords: Keywords,
    //   productMRPrice: MRPrice,
    //   productSellingPrice: SellingPrice,
    //   Flavor: flavor,
    //   Weight: weight,
    //   ISCODAvailable: true,
    //   Images:images
    //   IsActive: true,
    //   EnteredBy: "string",
    //   WhenEntered: new Date(),
    //   ModifiedBy: "string",
    //   WhenModified: null,
    // };
    const postData = new FormData();
    postData.append("categoryId", CategoryID);
    postData.append("subcategoryId", SubCategoryID);
    postData.append("productName", ProductName);
    postData.append("productDescription", ProductDescription);
    postData.append("keywords", Keywords);
    postData.append("productMRPrice", MRPrice);
    postData.append("productSellingPrice", SellingPrice);
    postData.append("Flavor", flavor);
    postData.append("ISCODAvailable", "true");
    postData.append("Weight", weight);
    postData.append("IsActive", "true");
    postData.append("EnteredBy", "");
    postData.append("WhenEntered", new Date().toString());
    postData.append("ModifiedBy", "");
    postData.append("WhenModified", "");

    for (let i = 0; i < images.length; i++) {
      postData.append("image", images[i], images[i].name);
    }

    console.log(postData);
    return this.http.post(BACKEND_URL + "/addproducts", postData);
  }
}
