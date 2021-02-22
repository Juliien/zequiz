import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../ressources/quiz.service';
import {CategoryService} from '../../ressources/category.service';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Array<object> = [];
  game = false;
  category: CategoryModel;

  constructor(private quizService: QuizService,
              private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategoryByID(sessionStorage.getItem('categoryId'))
      .subscribe(category => this.category = category);
  }

  startQuiz() {
    this.categoryService.addView(this.category).subscribe();
    this.quizService.quizSelect(this.category.num).subscribe(data => {
      this.quiz.push(data);
      this.game = true;
    });
  }
}
