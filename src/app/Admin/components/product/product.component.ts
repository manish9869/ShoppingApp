import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryService } from "../../services/category/category.service";
import { SubCategoryService } from "../../services/sub-category/subcategory.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs/internal/Subscription";
import { ProductService } from "../../services/product/product.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

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
  private categorysSub: Subscription;
  private subCategorysSub: Subscription;
  private subCategoryid: string;
  private CategoryId: string;
  private ProductId: string;
  private mode = "create";
  private flavor: string;

  constructor(
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public productServices: ProductService,
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

    this.categoryService.getActiveCategoryListdb();
    this.categorysSub = this.categoryService
      .getCategoryUpdateListener()
      .subscribe((result) => {
        this.CategoryList = result.categoryData;
      });

    this.FlavourList = [
      "Chocolate Cakes",
      "Blackforest Cakes",
      "Truffle Cakes",
      "Butterscotch Cakes",
      "Vanilla Cakes",
      "Red Velvet Cakes",
      "Pineapple Cakes",
      "Fruit Cakes",
      "Coffee Cakes",
      "Strawberry Cakes",
      "Cheese Cakes",
      "CakesExotic Cakes",
    ];
  }

  files: File[] = [];

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  drop(event: CdkDragDrop<{ name: string; poster: string }[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
    console.log(this.files);
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
    console.log(this.form.invalid);
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      console.log("executing");

      this.productServices
        .saveProductsData(
          this.CategoryId,
          this.subCategoryid,
          this.form.value.ProductName,
          this.form.value.ProductDescription,
          this.form.value.Keywords,
          this.form.value.ProductMRP,
          this.form.value.SellingPrice,
          this.flavor,
          this.form.value.ProductWeight,
          this.files
        )
        .subscribe(
          (result) => {
            //this.resetForm();

            //this.getSubCategoryList();
            //this.selectedDropdownvalue = null;
            this.toastr.success("New Record Inserted");
          },
          (error) => {
            this.toastr.success("Erro");
          }
        );
    } else {
    }
  }

  CategorySelectedValue() {
    this.CategoryId = this.selectedCategoryDropdownvalue;
    this.subCategoryService.getSubCategoryListdb();
    this.subCategorysSub = this.subCategoryService
      .getSubCategoryUpdateListener()
      .subscribe((result) => {
        console.log(result.subcategoryData);
        this.SubCategoryList = result.subcategoryData;
      });
  }

  SubCategorySelectedValue() {
    this.subCategoryid = this.selectedSubCategoryDropdownvalue;
  }

  FlavourSelectedValue() {
    this.flavor = this.selectedFlvDropdownvalue;
  }

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
