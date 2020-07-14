
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { SubCategoryService } from '../../services/sub-category/subcategory.service';
import { SubCategoryData } from '../../services/sub-category/sub-category-data.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit, OnDestroy {
  selectedDropdownvalue;

  CategoryList: any = [];
  private SubCategoryId: string;
  private mode = 'create';
  private categorysSub: Subscription;
  SubCategoryList;
  form: FormGroup;
  constructor(public categoryService: SubCategoryService,public toastr: ToastrService) { }

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

    // this.categoryService.getCourseListdb();
    // this.categorysSub = this.categoryService.getCategoryUpdateListener()
    //   .subscribe(result => {
    //     this.CategoryList = result.categoryData;
    //   });
  }
  get CategpryDropdownControl() {
    return this.form.controls;
  }
  changeCategorydata() {
    console.log(this.selectedDropdownvalue);

  }

  onSaveSubCategory() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.categoryService
        .createSubCategory(this.form.value.CategoryName, this.form.value.CategoryDescription).subscribe(
          (result) => {
            //this.resetForm();

            //this.getCategoryList();

            this.toastr.success('New Record Inserted');
          },
          (error) => {

          }
        );
    } else {

      // this.categoryService.updateCourseDb(this.SubCategoryId, this.form.value.CategoryName, this.form.value.CategoryDescription)
      //   .subscribe(result => {
      //     //this.resetForm();

      //     //this.getCategoryList();
      //     this.toastr.info('Record updated succesfully');
      //   });
    }
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
