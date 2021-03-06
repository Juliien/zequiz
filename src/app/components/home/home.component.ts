import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {CategoryService} from '../../ressources/category.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  viewsList: CategoryModel[];
  newsList: CategoryModel[];
  isMobile = false;

  constructor(private categoryService: CategoryService,
              private meta: Meta,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('ZeQuiz - Quiz Platform');
    this.meta.addTag({
      name: 'quiz',
      content: 'ZeQuiz is an english quizzes platform'
    });
    this.meta.updateTag(
      {
        name: 'description',
        content: 'Discover a series of fun quizzes about animals, geography, history, sciences etc...'
    });
    this.isMobile = window.innerWidth <= 765;
    this.categoryService.getViews().subscribe(categories => this.viewsList = categories);
    this.categoryService.getNewCategories().subscribe(categories => this.newsList = categories);
  }
}
