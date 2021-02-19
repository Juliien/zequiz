import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import categories from '../../ressources/categories.json';
import {CategoryService} from '../../ressources/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: CategoryModel[];
  innerWidth: number;
  isMobile = false;
  text: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 765;
    this.categories = categories;
    this.categoryService.getCategories().subscribe(data => this.text = data.message);
  }
}
