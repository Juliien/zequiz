import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {CategoryService} from '../../ressources/category.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  categories: CategoryModel[];
  isMobile = false;
  item: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 765;
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }
}
