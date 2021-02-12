import {Component, Input} from '@angular/core';
import {QuizModel} from '../model/quiz.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @Input() quiz: any;
  start = false;
  index: number;
  score: number;
  result = false;
  answer = false;
  listQuestions: QuizModel[] = [];
  q: string;

  constructor() { }

  startQuiz() {
    for (const questions of this.quiz) {
      this.listQuestions = questions.results;
    }
    this.index = 0;
    this.score = 0;
    this.start = true;
  }

  parseQuestion(res: string) {
    return res.replace(/&apos;/g, '\'')
      .replace(/&quot;/g, '"')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&amp;/g, '&')
      .replace(/&deg;/g, '°')
      .replace(/&#039;/g, '\'');
  }

  nextQuestion() {
    this.index += 1;
    this.answer = false;
  }

  validate(res: string) {
    const correctAnswer = this.listQuestions[this.index].correct_answer.toUpperCase();
    if (res.toUpperCase() === correctAnswer) {
      this.score++;
    }
    this.answer = true;
  }

  displayResult() {
    this.result = true;
  }

  restart() {
    window.location.reload();
  }
}
