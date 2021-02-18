import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import categories from '../../ressources/categories.json';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  categories: CategoryModel[];
  isMobile = false;
  item: string;

  constructor() { }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 765;
    this.categories = categories;
  }
}
