import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryService } from "../../services/category/category.service";
import { SubCategoryService } from "../../services/sub-category/subcategory.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs/internal/Subscription";
import { ProductService } from "../../services/product/product.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ProductData } from "../../services/product/product-data.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { MatSlideToggleChange } from "@angular/material";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  public http: HttpClient;
  productData: ProductData;
  ViewState = true;
  ProductList;
  ProductCount: string = "0";
  selectedCategoryDropdownvalue;
  selectedSubCategoryDropdownvalue;
  selectedFlvDropdownvalue;
  CategoryList: any = [];
  SubCategoryList: any = [];
  FlavourList: any = [];
  form: FormGroup;
  private categorysSub: Subscription;
  private subCategorysSub: Subscription;
  private ProductSub: Subscription;
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
      "None",
    ];
    this.getProductList();
  }

  files: File[] = [];

  onNewProduct(event) {
    this.ViewState = false;
  }

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
  getProductList() {
    this.productServices.getProductListdb();

    this.ProductSub = this.productServices
      .getProductUpdateListener()
      .subscribe((result) => {
        this.ProductList = result.productData;
        //console.log(this.ProductList);
        this.ProductCount = this.ProductList.length;
      });
    //
  }

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
            this.resetForm();

            //this.getSubCategoryList();
            //this.selectedDropdownvalue = null;
            this.toastr.success("New Record Inserted");
          },
          (error) => {
            this.toastr.success("Erro");
          }
        );
    } else {
      //Updation part is here
      this.productServices
        .updateProductsData(
          this.ProductId,
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
            this.toastr.success("Error");
          }
        );
    }
  }

  CategorySelectedValue() {
    this.CategoryId = this.selectedCategoryDropdownvalue;
    this.subCategoryService.getSubCategoryListByCategorydb(this.CategoryId);
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

  onDelete(productid: string) {
    this.productServices.deleteProduct(productid).subscribe((result) => {
      this.resetForm();
      this.getProductList();
      //this.selectedDropdownvalue = null;
      this.toastr.error("Record Deleted succesfully");
    });
  }
  onEdit(productid: string) {
    this.ViewState = false;
    this.mode = "edit";
    this.ProductId = productid;

    this.productServices.getSingleProductdb(productid).subscribe(
      (result) => {
        console.log(result);
        this.productData = {
          _id: result.productData._id,
          categoryId: result.productData.categoryId,
          subcategoryId: result.productData.subcategoryId,
          productName: result.productData.productName,
          productDescription: result.productData.productDescription,
          keywords: result.productData.keywords,
          productMRPrice: result.productData.productMRPrice,
          productSellingPrice: result.productData.productSellingPrice,
          Flavor: result.productData.Flavor,
          Weight: result.productData.Weight,
          ISCODAvailable: result.productData.ISCODAvailable,
          image: result.productData.image,
          IsActive: true,
          EnteredBy: null,
          WhenEntered: null,
          ModifiedBy: null,
          WhenModified: null,
        };
        console.log(this.productData);
        console.log(this.form);
        this.form.setValue({
          CategpryDdl: this.productData.categoryId,
          SubCategpryDdl: this.productData.subcategoryId,
          ProductName: this.productData.productName,
          ProductMRP: this.productData.productMRPrice,
          SellingPrice: this.productData.productSellingPrice,
          ProductFlvDdl: this.productData.Flavor,
          ProductWeight: this.productData.Weight,
          ProductDescription: this.productData.productDescription,
          Keywords: this.productData.keywords,
        });

        this.CategoryId = this.productData.categoryId;

        //this.files = this.productData.Images;

        this.subCategoryService.getSubCategoryListByCategorydb(this.CategoryId);
        this.subCategorysSub = this.subCategoryService
          .getSubCategoryUpdateListener()
          .subscribe((result) => {
            console.log(result.subcategoryData);
            this.SubCategoryList = result.subcategoryData;
          });

        this.subCategoryid = this.productData.subcategoryId;
        console.log(this.productData.image);
        this.flavor = this.productData.Flavor;
        this.productServices.getImage(productid).subscribe((res) => {
          res.productImages.forEach((element) => {
            //this.files.push(new File(element, "img.png"));
          });

          console.log("Filke list: " + res.productImages);
        });
      },
      (error) => {}
    );
  }

  onChange($event: MatSlideToggleChange, productid: string) {
    this.productServices
      .UpdateProductStatus(productid, $event.checked)
      .subscribe(
        (result) => {
          this.resetForm();

          this.getProductList();

          this.toastr.success("Status updated successfully.");
        },
        (error) => {}
      );
  }

  onBack() {
    this.ViewState = true;
  }
}
