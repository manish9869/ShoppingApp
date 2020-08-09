import { CategoryService } from './../../../Admin/services/category/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'main-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {

  NavMenuCollection;
  private categorysSub: Subscription;
  constructor(public categoryService: CategoryService) { }

  ngOnInit() {

    this.BindNavMenu();
  }

  BindNavMenu() {
    this.categoryService.getActiveCatProductList();

    this.categorysSub = this.categoryService
      .getCategoryProductUpdateListener()
      .subscribe((result) => {
        console.log(result);
        this.NavMenuCollection = result.categoryData;
      });


  }

  ngOnDestroy() {
    this.categorysSub.unsubscribe();
  }


}
