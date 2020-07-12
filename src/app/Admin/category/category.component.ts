import { CategoryData } from './../category-data.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(public categoryService: CategoryService, public toastr: ToastrService) { }
  private mode = 'create';
  CategoryList: CategoryData[];
  //CategoryList: CategoryData[] = [{ _id: 'test', CateoryName: 'test', CategoryDescription: 'test ' }];

  private categorysSub: Subscription;

  ngOnInit() {

    this.resetForm();

    this.getCategoryList();

  }



  getCategoryList() {
    this.categoryService.getCourseListdb();
    this.categorysSub = this.categoryService
      .getCategoryUpdateListener()
      .subscribe(result => {
        this.CategoryList = result.categoryData;
      });
  }

  onSaveCategory(form?: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.categoryService
        .createCategory(form.value.CategoryName, form.value.CategoryDescription).subscribe(
          (result) => {
            this.resetForm(form);

            this.getCategoryList();

            this.toastr.success('New Record Inserted');
          },
          (error) => {

          }
        );


    } else {

    }


  }

  onDelete(id: string, form: NgForm) {

  }

  onEdit(categoryData: CategoryData) {


  }

  resetForm(form?: NgForm) {

    if (form != null)

      form.reset();

    this.getCategoryList();


  }



}
