import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  selectedLevel;
  CategoryList: any = [
    { categoryId: '1', CategoryName: 'test' },
    { categoryId: '2', CategoryName: 'test 2' },
    { categoryId: '3', CategoryName: 'test 3' }
  ];

  SubCategoryList;


  form: FormGroup;


  constructor() { }

  ngOnInit() {

    this.form = new FormGroup({
      SubCategoryName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      SubCategoryDescription: new FormControl(null, { validators: [Validators.required] }),
      CategpryDdl: new FormControl('', Validators.required)
    });
  }
  get CategpryDropdownControl() {
    return this.form.controls;
  }
  changeCategorydata(datachange) {
    console.log(this.selectedLevel);
  }

  onSaveSubCategory() {

  }

  courseSelectedValue() {

  }

  onEdit(id: string) {

  }

  onDelete(id: string) {

  }

}
