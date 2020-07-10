import { FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "./../angular-material.module";
import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { CategoryComponent } from "./category/category.component";
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    ProductComponent
  ],
  imports: [

 CommonModule,
    AngularMaterialModule,
  FormsModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}