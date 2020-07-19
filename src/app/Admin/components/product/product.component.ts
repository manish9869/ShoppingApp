import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryService } from "../../services/category/category.service";
import { SubCategoryService } from "../../services/sub-category/subcategory.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  private ProductList;
  selectedCategoryDropdownvalue;
  selectedSubCategoryDropdownvalue;
  selectedFlvDropdownvalue;
  CategoryList: any = [];
  SubCategoryList: any = [];
  FlavourList: any = [];
  form: FormGroup;
  private subCategoryid: string;
  private CategoryId: string;
  private ProductId: string;
  private mode = "create";

  constructor(
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      ProductName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      ProductMRP: new FormControl(null, {
        validators: [Validators.required],
      }),
      ProductWeight: new FormControl(null, {
        validators: [Validators.required],
      }),

      SellingPrice: new FormControl(null, {
        validators: [Validators.required],
      }),
      ProductDescription: new FormControl(null, {
        validators: [Validators.required],
      }),
      Keywords: new FormControl(null, {
        validators: [Validators.required],
      }),
      CategpryDdl: new FormControl(null, {
        validators: [Validators.required],
      }),
      SubCategpryDdl: new FormControl(null, {
        validators: [Validators.required],
      }),
      ProductFlvDdl: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  get CategpryDropdownControl() {
    return this.form.controls;
  }

  get SubCategpryDropdownControl() {
    return this.form.controls;
  }

  get FlavourDropdownControl() {
    return this.form.controls;
  }
  getProductList() {}

  onSaveProduct() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === "create") {
    } else {
    }
  }

  CategorySelectedValue() {
    this.CategoryId = this.selectedCategoryDropdownvalue;
  }

  SubCategorySelectedValue() {
    this.subCategoryid = this.selectedSubCategoryDropdownvalue;
  }

  FlavourSelectedValue() {}

  resetForm() {
    if (this.form != null) {
      this.form.reset();
      this.getProductList();
      this.selectedCategoryDropdownvalue = null;
      this.selectedFlvDropdownvalue = null;
      this.selectedSubCategoryDropdownvalue = null;
    }
  }

  onDelete(productid: string) {}
  onEdit(productid: string) {
    this.mode = "edit";
    this.ProductId = productid;
  }
}
