import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public innerWidth: number;
  categories = [
    {name: 'General Knowledge', url: '/general'},
    {name: 'Science & Nature', url: '/science'},
    ];

  constructor() { }
  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }
}
