import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../ressources/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Array<object> = [];
  game = false;
  name: string;
  num: string;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
    this.num =  sessionStorage.getItem('num');
  }

  getQuizAny() {
    this.quizService.quizSelect(this.num).subscribe(data => {
      this.quiz.push(data);
      this.game = true;
    });
  }
}
