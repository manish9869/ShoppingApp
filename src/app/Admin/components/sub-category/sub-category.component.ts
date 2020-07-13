
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit, OnDestroy {
  selectedDropdownvalue;

  CategoryList: any = [];

  private categorysSub: Subscription;
  SubCategoryList;
  form: FormGroup;
  constructor(public categoryService: CategoryService) { }

  ngOnInit() {

    this.form = new FormGroup({
      SubCategoryName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      SubCategoryDescription: new FormControl(null, {
        validators: [Validators.required]
      }),
      CategpryDdl: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.categoryService.getCourseListdb();
    this.categorysSub = this.categoryService.getCategoryUpdateListener()
      .subscribe(result => {
        this.CategoryList = result.categoryData;
      });
  }
  get CategpryDropdownControl() {
    return this.form.controls;
  }
  changeCategorydata() {
    console.log(this.selectedDropdownvalue);

  }

  onSaveSubCategory() {

  }

  courseSelectedValue() {

  }

  onEdit(id: string) {

  }

  onDelete(id: string) {

  }
  ngOnDestroy() {
    this.categorysSub.unsubscribe();
  }
}
