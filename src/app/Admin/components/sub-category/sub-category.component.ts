
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { SubCategoryService } from '../../services/sub-category/subcategory.service';
import { SubCategoryData } from '../../services/sub-category/sub-category-data.model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit, OnDestroy {
  selectedDropdownvalue;

  CategoryList: any = [];
  SubCategory: SubCategoryData;

  private subCategoryid: string;
  private CategoryId: string;
  private mode = 'create';
  private categorysSub: Subscription;
  private subcategorysSub: Subscription;
  SubCategoryList;
  form: FormGroup;
  constructor(public categoryService: CategoryService, public subCategoryService: SubCategoryService, public toastr: ToastrService) { }

  ngOnInit() {

    this.resetForm();
    this.getSubCategoryList();


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


    this.categoryService.getCategoryListdb();
    this.categorysSub = this.categoryService.getCategoryUpdateListener()
      .subscribe(result => {
        this.CategoryList = result.categoryData;
      });


  }
  get CategpryDropdownControl() {
    return this.form.controls;
  }



  getSubCategoryList() {
    this.subCategoryService.getSubCategoryListdb();

    this.subcategorysSub = this.subCategoryService
      .getSubCategoryUpdateListener()
      .subscribe(result => {


        this.SubCategoryList = result.subcategoryData;
        console.log(this.SubCategoryList);
      });
  }



  resetForm() {

    if (this.form != null) {
      this.form.reset();
      this.getSubCategoryList();
      this.selectedDropdownvalue = null;
    }
  }


  onSaveSubCategory() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.subCategoryService
        .createSubCategory(this.CategoryId, this.form.value.SubCategoryName, this.form.value.SubCategoryDescription).subscribe(
          (result) => {
            this.resetForm();

            this.getSubCategoryList();
            this.selectedDropdownvalue = null;
            this.toastr.success('New Record Inserted');
          },
          (error) => {

          }
        );
    } else {

      this.subCategoryService.updateSubCategoryDb(this.subCategoryid, this.CategoryId, this.form.value.SubCategoryName, this.form.value.SubCategoryDescription)
        .subscribe(result => {
          this.resetForm();

          this.getSubCategoryList();
          this.mode = 'create';
          this.selectedDropdownvalue = null;
          this.toastr.info('Record updated succesfully');
        });
    }


  }

  courseSelectedValue() {

    this.CategoryId = this.selectedDropdownvalue;
  }

  onEdit(SubCategoryid: string) {

    this.mode = 'edit';
    this.subCategoryid = SubCategoryid;


    this.subCategoryService
      .getSingleSubCategorydb(SubCategoryid).subscribe(
        (result) => {
          console.log(result);
          this.SubCategory = {
            _id: result.subcategoryData._id,
            categoryId: result.subcategoryData.categoryId,
            subcategoryName: result.subcategoryData.subcategoryName,
            subcategoryDescription: result.subcategoryData.subcategoryDescription,
            IsActive: true,
            EnteredBy: null,
            WhenEntered: null,
            ModifiedBy: null,
            WhenModified: null
          };
          console.log(this.SubCategory);

          this.form.setValue({
            CategpryDdl: this.SubCategory.categoryId,
            SubCategoryName: this.SubCategory.subcategoryName,
            SubCategoryDescription: this.SubCategory.subcategoryDescription
          });

          this.CategoryId = this.SubCategory.categoryId;


        },
        (error) => {

        }
      );
  }

  onDelete(SubCategoryid: string) {

    this.subCategoryService.deleteSubCategory(SubCategoryid)
      .subscribe(result => {
        this.resetForm();
        this.getSubCategoryList();
        this.selectedDropdownvalue = null;
        this.toastr.error('Record Deleted succesfully');
      });

  }
  ngOnDestroy() {
    this.categorysSub.unsubscribe();
    this.subcategorysSub.unsubscribe();
  }
}
