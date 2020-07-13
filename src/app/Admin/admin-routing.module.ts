import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: 'Category', component: CategoryComponent },
  { path: 'SubCategory', component: SubCategoryComponent },
  { path: 'Product', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class AdminRoutingModule { }
