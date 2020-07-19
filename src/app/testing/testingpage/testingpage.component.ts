import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-testingpage',
  templateUrl: './testingpage.component.html',
  styleUrls: ['./testingpage.component.css']
})
export class TestingpageComponent implements OnInit {




  constructor() { }

  ngOnInit() {
  }
  files: File[] = [];

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }


  drop(event: CdkDragDrop<{ name: string, poster: string }[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
    console.log(this.files);

  }
}
