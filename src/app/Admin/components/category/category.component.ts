import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgModule } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryData } from "../../services/category/category-data.model";
import { CategoryService } from "../../services/category/category.service";
import { MatSlideToggleChange } from "@angular/material";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit, OnDestroy {
  constructor(
    public categoryService: CategoryService,
    public toastr: ToastrService
  ) {}
  //color = "accent";
  //checked = false;
  private mode = "create";
  Category: CategoryData;
  CategoryList: CategoryData[];
  private CategoryId: string;
  private categorysSub: Subscription;
  form: FormGroup;
  ngOnInit() {
    this.resetForm();

    this.getCategoryList();

    this.form = new FormGroup({
      CategoryName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      CategoryDescription: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onChange($event: MatSlideToggleChange, Categoryid: string) {
    //console.log($event.checked);
    this.categoryService
      .UpdateCategoryStatus(Categoryid, $event.checked)
      .subscribe(
        (result) => {
          this.resetForm();

          this.getCategoryList();

          this.toastr.success("Status updated successfully.");
        },
        (error) => {}
      );
  }

  getCategoryList() {
    this.categoryService.getCourseListdb();

    this.categorysSub = this.categoryService
      .getCategoryUpdateListener()
      .subscribe((result) => {
        this.CategoryList = result.categoryData;
      });
  }

  onSaveCategory() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === "create") {
      this.categoryService
        .createCategory(
          this.form.value.CategoryName,
          this.form.value.CategoryDescription
        )
        .subscribe(
          (result) => {
            this.resetForm();

            this.getCategoryList();

            this.toastr.success("New Record Inserted");
          },
          (error) => {}
        );
    } else {
      this.categoryService
        .updateCourseDb(
          this.CategoryId,
          this.form.value.CategoryName,
          this.form.value.CategoryDescription
        )
        .subscribe((result) => {
          this.resetForm();

          this.getCategoryList();
          this.toastr.info("Record updated succesfully");
        });
    }
  }

  onDelete(Categoryid: string) {
    this.categoryService.deleteCategory(Categoryid).subscribe((result) => {
      this.resetForm();
      this.getCategoryList();
      this.toastr.error("Record Deleted succesfully");
    });
  }

  onEdit(Categoryid: string) {
    this.mode = "edit";
    this.CategoryId = Categoryid;

    this.categoryService.getSingleCourseListdb(Categoryid).subscribe(
      (result) => {
        this.Category = {
          _id: result.categoryData._id,
          categoryName: result.categoryData.categoryName,
          categoryDescription: result.categoryData.categoryDescription,
          IsActive: true,
          EnteredBy: null,
          WhenEntered: null,
          ModifiedBy: null,
          WhenModified: null,
        };
        this.form.setValue({
          CategoryName: this.Category.categoryName,
          CategoryDescription: this.Category.categoryDescription,
        });
      },
      (error) => {}
    );
  }

  resetForm() {
    if (this.form != null) this.form.reset();
    this.getCategoryList();
  }

  ngOnDestroy() {
    this.categorysSub.unsubscribe();
  }
}
