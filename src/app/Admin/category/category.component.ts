import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  constructor(public categoryService :CategoryService) {}


  CategoryList = [{categoryName: "test",CategoryDes : "test description"},{categoryName: "test 1",CategoryDes : "test description"}]

  ngOnInit() {}

  onSaveCategory(form:NgForm) {

this.categoryService.createCategory(form.value.CategoryName,form.value.CategoryDescription)

  }
}
