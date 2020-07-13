
import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    ProductComponent
  ],
  imports: [

    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
})
export class AdminModule { }
