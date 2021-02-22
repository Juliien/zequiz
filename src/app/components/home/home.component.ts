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
  isMobile = false;
  homeList: string[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 765;
    this.homeList = ['New quizzes', 'Popular quizzes', 'Top rated quizzes', 'Random quizzes'];
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }
}
