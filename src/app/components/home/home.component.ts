import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import categories from '../../ressources/categories.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: CategoryModel[];
  innerWidth: number;
  isMobile = false;

  constructor() { }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 765;
    this.categories = categories;
  }
}
