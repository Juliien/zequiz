import { Component, OnInit } from '@angular/core';
import {ScienceService} from '../../ressource/science.service';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.css']
})
export class ScienceComponent {
  quiz: Array<object> = [];
  game = false;

  constructor(private scienceService: ScienceService) {}

  scienceEasyQuiz() {
    this.scienceService.scienceEasy().subscribe(data => {
      this.quiz.push(data);
      this.game = true;
    });
  }
  scienceAnyQuiz() {
    this.scienceService.scienceAny().subscribe(data => {
      this.quiz.push(data);
      this.game = true;
    });
  }
  scienceMediumQuiz() {
    this.scienceService.scienceMedium().subscribe(data => {
      this.quiz.push(data);
      this.game = true;
    });
  }
}
