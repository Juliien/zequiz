import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {CategoryService} from '../../ressources/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: CategoryModel[];
  viewsList: CategoryModel[];
  isMobile = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 765;
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    this.categoryService.getViews().subscribe(categories => this.viewsList = categories);
  }
}
