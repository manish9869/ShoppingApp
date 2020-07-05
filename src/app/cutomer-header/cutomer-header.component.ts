import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cutomer-header',
  templateUrl: './cutomer-header.component.html',
  styleUrls: ['./cutomer-header.component.css']
})
export class CutomerHeaderComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
